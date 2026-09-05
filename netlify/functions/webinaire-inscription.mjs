/**
 * Inscription au webinaire « Hors Emprise » (dimanche 13 septembre).
 * Enregistre le contact dans Brevo et lui envoie immédiatement l'e-mail de
 * confirmation. La clé API reste côté serveur.
 *
 * Variables d'environnement Netlify :
 *   BREVO_KEY                 (obligatoire en production) — clé v3, Brevo > SMTP & API > Clés API
 *   BREVO_LIST_WEBINAIRE_ID   (recommandé) — identifiant numérique de la liste dédiée au webinaire.
 *                             Sans lui, le contact est créé mais rattaché à aucune liste.
 *   BREVO_ATTR_PRENOM         (optionnel) — nom de l'attribut prénom, « PRENOM » par défaut
 *   BREVO_EXPEDITEUR_NOM      (optionnel) — « Giovanni's Positive Vibes » par défaut
 *   BREVO_EXPEDITEUR_EMAIL    (optionnel) — doit être un expéditeur validé dans Brevo
 *   WEBINAIRE_LIEN            (optionnel) — URL https du direct, quelle que soit la plateforme
 *                             (YouTube, Zoom, Meet, StreamYard…). Si elle est renseignée,
 *                             l'e-mail de confirmation contient le bouton « Rejoindre le direct » ;
 *                             sinon il annonce que le lien arrivera la veille — c'est le
 *                             fonctionnement prévu tant que la plateforme n'est pas arrêtée.
 *
 * Sans BREVO_KEY, la fonction répond en mode test : le parcours complet est
 * jouable, mais aucun contact n'est enregistré et aucun e-mail n'est envoyé.
 */

import { genererCourrielWebinaire } from './lib/modele-webinaire.mjs';

const EMAIL_VALIDE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TEL_VALIDE = /^[+()\d\s.-]{8,20}$/;
const SUJET_COURRIEL = 'Ta place est réservée — Hors Emprise, dimanche 13 septembre';

/* Réponses attendues du menu déroulant. Une valeur inconnue est ignorée
   plutôt que recopiée telle quelle dans Brevo. La comparaison neutralise
   l'apostrophe typographique, que certains navigateurs substituent. */
const SITUATIONS = [
  'Je suis encore dans la relation',
  "Je viens d'en sortir",
  "J'en suis sorti depuis un moment, ça reste présent",
  "C'est un proche qui est concerné",
  "Je suis professionnel de l'accompagnement",
];
const normaliser = (texte) => texte.replace(/[‘’]/g, "'");

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
  const whatsapp = String(corps.whatsapp ?? '').trim().slice(0, 24);
  const situationBrute = String(corps.situation ?? '').trim();
  const consentement = corps.consentement === true;
  const source = String(corps.source ?? '').trim().slice(0, 200);
  const piege = String(corps.site ?? '').trim(); // champ leurre anti-robot

  // Un robot remplit tous les champs, y compris ceux qu'il ne voit pas.
  // On répond « ok » sans rien enregistrer : inutile de le renseigner.
  if (piege) return reponse({ ok: true, enregistre: false });

  if (!prenom) return reponse({ ok: false, champ: 'prenom', erreur: 'Indique ton prénom.' }, 400);
  if (!EMAIL_VALIDE.test(email)) {
    return reponse({ ok: false, champ: 'email', erreur: 'Cette adresse e-mail semble incomplète.' }, 400);
  }
  if (!TEL_VALIDE.test(whatsapp)) {
    return reponse({ ok: false, champ: 'whatsapp', erreur: 'Ce numéro semble incomplet.' }, 400);
  }
  if (!situationBrute) {
    return reponse({ ok: false, champ: 'situation', erreur: 'Choisis une réponse.' }, 400);
  }
  if (!consentement) {
    return reponse({ ok: false, champ: 'consentement', erreur: 'Ton accord est nécessaire pour recevoir le lien.' }, 400);
  }

  const situation = SITUATIONS.find((s) => normaliser(s) === normaliser(situationBrute)) ?? '';

  const cle = process.env.BREVO_KEY;
  if (!cle) {
    console.log('[brevo] webinaire — mode test, aucune clé configurée :', email);
    return reponse({
      ok: true,
      enregistre: false,
      mode: 'test',
      message: 'Formulaire validé. La connexion Brevo n’est pas encore configurée.',
    });
  }

  const attributPrenom = process.env.BREVO_ATTR_PRENOM || 'PRENOM';
  const listeId = Number.parseInt(process.env.BREVO_LIST_WEBINAIRE_ID ?? '', 10);
  const expediteur = {
    name: process.env.BREVO_EXPEDITEUR_NOM || "Giovanni's Positive Vibes",
    email: process.env.BREVO_EXPEDITEUR_EMAIL || 'yk@gpvconsulting.com',
  };

  const envoyerCourrielConfirmation = async () => {
    try {
      const r = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'api-key': cle, 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          sender: expediteur,
          to: [{ email, name: prenom }],
          replyTo: expediteur,
          subject: SUJET_COURRIEL,
          htmlContent: genererCourrielWebinaire(prenom, { lien: process.env.WEBINAIRE_LIEN }),
        }),
      });
      if (!r.ok) {
        console.error('[brevo] échec envoi e-mail webinaire %s : %s', r.status, await r.text());
      }
    } catch (e) {
      console.error('[brevo] exception envoi e-mail webinaire :', e);
    }
  };

  /* Les attributs personnalisés doivent exister dans le compte Brevo, et leur nom
     dépend de la langue du compte (PRENOM ou FIRSTNAME). S'ils manquent, l'API
     renvoie une 400 : on redescend l'échelle un barreau à la fois plutôt que de
     tout perdre d'un coup. L'ordre protège en priorité le numéro WhatsApp, sans
     lequel la promesse de rappel du jour J ne tient pas. */
  const jeuxAttributs = [
    {
      [attributPrenom]: prenom,
      WHATSAPP: whatsapp,
      ...(situation ? { SITUATION: situation } : {}),
      ...(source ? { SOURCE: source } : {}),
    },
    { [attributPrenom]: prenom, WHATSAPP: whatsapp },
    { [attributPrenom]: prenom },
    ...(attributPrenom !== 'FIRSTNAME' ? [{ FIRSTNAME: prenom, WHATSAPP: whatsapp }, { FIRSTNAME: prenom }] : []),
    null,
  ];

  const envoyer = (attributs) => {
    const charge = { email, updateEnabled: true };
    if (attributs) charge.attributes = attributs;
    if (Number.isInteger(listeId)) charge.listIds = [listeId];
    return fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'api-key': cle, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(charge),
    });
  };

  try {
    let r;
    for (const attributs of jeuxAttributs) {
      r = await envoyer(attributs);
      if (r.status !== 400) break;

      const detail = await r.clone().json().catch(() => ({}));
      if (!/attribute/i.test(detail?.message ?? '')) break;
      console.warn('[brevo] webinaire — attributs refusés (%s), nouvel essai appauvri', detail.message);
    }

    // 201 = contact créé · 204 = contact existant mis à jour
    if (r.ok || r.status === 204) {
      await envoyerCourrielConfirmation();
      return reponse({ ok: true, enregistre: true });
    }

    // Un contact déjà présent n'est pas une erreur pour l'utilisateur.
    const detail = await r.json().catch(() => ({}));
    if (detail?.code === 'duplicate_parameter') {
      await envoyerCourrielConfirmation();
      return reponse({ ok: true, enregistre: true, deja: true });
    }

    console.error('[brevo] webinaire — échec %s : %s', r.status, JSON.stringify(detail));
    return reponse(
      { ok: false, erreur: "L'inscription n'a pas abouti. Réessaie dans un instant." },
      502
    );
  } catch (e) {
    console.error('[brevo] webinaire — exception :', e);
    return reponse(
      { ok: false, erreur: 'Service momentanément indisponible. Réessaie dans un instant.' },
      502
    );
  }
};

export const config = { path: '/api/inscription-webinaire' };
