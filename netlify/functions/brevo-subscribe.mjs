/**
 * Inscription au guide « Pourquoi vos disputes recommencent toujours ? »
 * Enregistre le contact dans Brevo et lui envoie immédiatement l'e-mail de
 * livraison du guide. La clé API reste côté serveur.
 *
 * Variables d'environnement Netlify :
 *   BREVO_KEY               (obligatoire en production) — clé v3, Brevo > SMTP & API > Clés API
 *   BREVO_LIST_ID           (optionnel) — identifiant numérique de la liste de destination, 2 par défaut
 *   BREVO_ATTR_PRENOM       (optionnel) — nom de l'attribut prénom, « PRENOM » par défaut
 *   BREVO_EXPEDITEUR_NOM    (optionnel) — « Giovanni's Positive Vibes » par défaut
 *   BREVO_EXPEDITEUR_EMAIL  (optionnel) — doit être un expéditeur validé dans Brevo, « yk@gpvconsulting.com » par défaut
 *
 * Sans BREVO_KEY, la fonction répond en mode test : le parcours
 * complet est jouable, mais aucun contact n'est enregistré et aucun e-mail n'est envoyé.
 */

import { genererCourrielGuide } from './lib/modele-guide.mjs';

const EMAIL_VALIDE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SUJET_COURRIEL = 'Votre guide est prêt à télécharger';

const reponse = (donnees, statut = 200) =>
  new Response(JSON.stringify(donnees), {
    status: statut,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

export default async (req) => {
  if (req.method !== 'POST') {
    return reponse({ ok: false, erreur: 'Méthode non autorisée.' }, 405);
  }

  let corps;
  try {
    corps = await req.json();
  } catch {
    return reponse({ ok: false, erreur: 'Requête illisible.' }, 400);
  }

  const prenom = String(corps.prenom ?? '').trim().slice(0, 80);
  const email = String(corps.email ?? '').trim().toLowerCase().slice(0, 160);
  const consentement = corps.consentement === true;
  const piege = String(corps.site ?? '').trim(); // champ leurre anti-robot

  // Un robot remplit tous les champs, y compris ceux qu'il ne voit pas.
  // On répond « ok » sans rien enregistrer : inutile de le renseigner.
  if (piege) return reponse({ ok: true, enregistre: false });

  if (!prenom) return reponse({ ok: false, champ: 'prenom', erreur: 'Indiquez votre prénom.' }, 400);
  if (!EMAIL_VALIDE.test(email)) {
    return reponse({ ok: false, champ: 'email', erreur: 'Cette adresse e-mail semble incomplète.' }, 400);
  }
  if (!consentement) {
    return reponse({ ok: false, champ: 'consentement', erreur: 'Votre accord est nécessaire pour recevoir le guide.' }, 400);
  }

  const cle = process.env.BREVO_KEY;
  if (!cle) {
    console.log('[brevo] mode test — aucune clé configurée :', email);
    return reponse({
      ok: true,
      enregistre: false,
      mode: 'test',
      message: 'Formulaire validé. La connexion Brevo n’est pas encore configurée.',
    });
  }

  const attributPrenom = process.env.BREVO_ATTR_PRENOM || 'PRENOM';
  const listeId = Number.parseInt(process.env.BREVO_LIST_ID ?? '2', 10);
  const expediteur = {
    name: process.env.BREVO_EXPEDITEUR_NOM || "Giovanni's Positive Vibes",
    email: process.env.BREVO_EXPEDITEUR_EMAIL || 'yk@gpvconsulting.com',
  };

  const envoyerCourrielGuide = async () => {
    try {
      const r = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'api-key': cle, 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          sender: expediteur,
          to: [{ email, name: prenom }],
          replyTo: expediteur,
          subject: SUJET_COURRIEL,
          htmlContent: genererCourrielGuide(prenom),
        }),
      });
      if (!r.ok) {
        console.error('[brevo] échec envoi e-mail guide %s : %s', r.status, await r.text());
      }
    } catch (e) {
      console.error('[brevo] exception envoi e-mail guide :', e);
    }
  };

  const envoyer = (avecAttributs) => {
    const charge = { email, updateEnabled: true };
    if (avecAttributs) charge.attributes = { [attributPrenom]: prenom };
    if (Number.isInteger(listeId)) charge.listIds = [listeId];
    return fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': cle,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(charge),
    });
  };

  try {
    let r = await envoyer(true);

    // Selon la langue du compte, l'attribut peut s'appeler PRENOM ou FIRSTNAME.
    // Si Brevo refuse l'attribut, on réenregistre le contact sans lui plutôt que d'échouer.
    if (r.status === 400) {
      const detail = await r.clone().json().catch(() => ({}));
      if (/attribute/i.test(detail?.message ?? '')) {
        console.warn('[brevo] attribut « %s » refusé, nouvel essai sans attribut', attributPrenom);
        r = await envoyer(false);
      }
    }

    // 201 = contact créé · 204 = contact existant mis à jour
    if (r.ok || r.status === 204) {
      await envoyerCourrielGuide();
      return reponse({ ok: true, enregistre: true });
    }

    // Un contact déjà présent n'est pas une erreur pour l'utilisateur.
    const detail = await r.json().catch(() => ({}));
    if (detail?.code === 'duplicate_parameter') {
      await envoyerCourrielGuide();
      return reponse({ ok: true, enregistre: true, deja: true });
    }

    console.error('[brevo] échec %s : %s', r.status, JSON.stringify(detail));
    return reponse(
      { ok: false, erreur: "L'enregistrement n'a pas abouti. Réessayez dans un instant." },
      502
    );
  } catch (e) {
    console.error('[brevo] exception :', e);
    return reponse(
      { ok: false, erreur: 'Service momentanément indisponible. Réessayez dans un instant.' },
      502
    );
  }
};

export const config = { path: '/api/inscription-guide' };
