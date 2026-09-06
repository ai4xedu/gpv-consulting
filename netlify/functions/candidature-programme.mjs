/**
 * Candidature au programme « Hors Emprise » (cohorte fondatrice, 24 septembre
 * au 10 décembre 2026). Prévient GPV, enregistre le contact dans Brevo et
 * envoie l'accusé de réception au candidat. La clé API reste côté serveur.
 *
 * Variables d'environnement Netlify :
 *   BREVO_KEY                 (obligatoire en production) — clé v3, Brevo > SMTP & API > Clés API
 *   BREVO_LIST_PROGRAMME_ID   (recommandé) — identifiant numérique de la liste dédiée aux candidatures.
 *                             Sans lui, le contact est créé mais rattaché à aucune liste.
 *   GPV_EMAIL_INTERNE         (recommandé) — destinataire de la copie interne,
 *                             « yk@gpvconsulting.com » par défaut.
 *   BREVO_ATTR_PRENOM         (optionnel) — nom de l'attribut prénom, « PRENOM » par défaut
 *   BREVO_EXPEDITEUR_NOM      (optionnel) — « Giovanni's Positive Vibes » par défaut
 *   BREVO_EXPEDITEUR_EMAIL    (optionnel) — doit être un expéditeur validé dans Brevo
 *
 * Sans BREVO_KEY, la fonction répond en mode test : le parcours complet est
 * jouable, mais aucune candidature n'est enregistrée et aucun e-mail n'est envoyé.
 */

import { genererCourrielCandidature, genererCourrielInterne } from './lib/modele-candidature.mjs';

const EMAIL_VALIDE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TEL_VALIDE = /^[+()\d\s.-]{8,20}$/;
const OBJECTIF_MIN = 20;
const SUJET_CANDIDAT = 'Candidature reçue — Hors Emprise, cohorte fondatrice';

/* Réponses attendues des deux menus déroulants. Une valeur inconnue est ignorée
   plutôt que recopiée telle quelle dans Brevo. La comparaison neutralise
   l'apostrophe typographique, que certains navigateurs substituent. */
const SITUATIONS = [
  "J'ai quitté la relation récemment",
  "J'en suis sorti depuis un moment, ça reste présent",
  'Je suis encore dans la relation',
  "C'est un proche qui est concerné",
  "Je suis professionnel de l'accompagnement",
];
const DISPONIBILITES = [
  'Oui, je peux tenir ce créneau',
  'Oui, sauf une ou deux séances',
  "Je ne sais pas encore, j'en parle à l'entretien",
  'Non, ce créneau ne me convient pas',
];
const normaliser = (texte) => texte.replace(/[‘’]/g, "'");
const reconnaitre = (liste, valeur) =>
  liste.find((v) => normaliser(v) === normaliser(valeur)) ?? '';

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
  const disponibiliteBrute = String(corps.disponibilite ?? '').trim();
  const objectif = String(corps.objectif ?? '').trim().slice(0, 1200);
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
  if (objectif.length < OBJECTIF_MIN) {
    return reponse({ ok: false, champ: 'objectif', erreur: 'Quelques mots de plus : c’est ce qui prépare l’entretien.' }, 400);
  }
  if (!disponibiliteBrute) {
    return reponse({ ok: false, champ: 'disponibilite', erreur: 'Choisis une réponse.' }, 400);
  }
  if (!consentement) {
    return reponse({ ok: false, champ: 'consentement', erreur: 'Ton accord est nécessaire pour que je te recontacte.' }, 400);
  }

  const situation = reconnaitre(SITUATIONS, situationBrute);
  const disponibilite = reconnaitre(DISPONIBILITES, disponibiliteBrute);

  const cle = process.env.BREVO_KEY;
  if (!cle) {
    console.log('[brevo] candidature — mode test, aucune clé configurée :', email);
    return reponse({
      ok: true,
      enregistre: false,
      mode: 'test',
      message: 'Formulaire validé. La connexion Brevo n’est pas encore configurée.',
    });
  }

  const attributPrenom = process.env.BREVO_ATTR_PRENOM || 'PRENOM';
  const listeId = Number.parseInt(process.env.BREVO_LIST_PROGRAMME_ID ?? '', 10);
  const expediteur = {
    name: process.env.BREVO_EXPEDITEUR_NOM || "Giovanni's Positive Vibes",
    email: process.env.BREVO_EXPEDITEUR_EMAIL || 'yk@gpvconsulting.com',
  };
  const destinataireInterne = process.env.GPV_EMAIL_INTERNE || 'yk@gpvconsulting.com';

  const envoyerCourriel = async (charge, etiquette) => {
    try {
      const r = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'api-key': cle, 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(charge),
      });
      if (!r.ok) {
        console.error('[brevo] échec envoi %s %s : %s', etiquette, r.status, await r.text());
        return false;
      }
      return true;
    } catch (e) {
      console.error('[brevo] exception envoi %s :', etiquette, e);
      return false;
    }
  };

  /* La copie interne part la première, et son échec est la seule chose qui fait
     échouer la requête : le texte libre du candidat n'existe nulle part
     ailleurs. Un contact Brevo perdu se rattrape, une candidature non lue non. */
  const interneEnvoye = await envoyerCourriel(
    {
      sender: expediteur,
      to: [{ email: destinataireInterne }],
      replyTo: { email, name: prenom },
      subject: `Candidature Hors Emprise — ${prenom}`,
      htmlContent: genererCourrielInterne({
        prenom, email, whatsapp, objectif, source,
        situation: situation || situationBrute,
        disponibilite: disponibilite || disponibiliteBrute,
      }),
    },
    'copie interne candidature'
  );

  if (!interneEnvoye) {
    return reponse(
      { ok: false, erreur: "L'envoi n'a pas abouti. Réessaie dans un instant, ou écris à yk@gpvconsulting.com." },
      502
    );
  }

  /* Les attributs personnalisés doivent exister dans le compte Brevo, et leur nom
     dépend de la langue du compte (PRENOM ou FIRSTNAME). S'ils manquent, l'API
     renvoie une 400 : on redescend l'échelle un barreau à la fois plutôt que de
     tout perdre d'un coup. L'ordre protège en priorité le numéro WhatsApp, sans
     lequel l'entretien ne peut pas être fixé. */
  const jeuxAttributs = [
    {
      [attributPrenom]: prenom,
      WHATSAPP: whatsapp,
      ...(situation ? { SITUATION: situation } : {}),
      ...(disponibilite ? { DISPONIBILITE: disponibilite } : {}),
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

  let enregistre = false;
  try {
    let r;
    for (const attributs of jeuxAttributs) {
      r = await envoyer(attributs);
      if (r.status !== 400) break;

      const detail = await r.clone().json().catch(() => ({}));
      if (!/attribute/i.test(detail?.message ?? '')) break;
      console.warn('[brevo] candidature — attributs refusés (%s), nouvel essai appauvri', detail.message);
    }

    // 201 = contact créé · 204 = contact existant mis à jour
    if (r.ok || r.status === 204) {
      enregistre = true;
    } else {
      const detail = await r.json().catch(() => ({}));
      // Un contact déjà présent n'est pas une erreur : il a déjà vu le webinaire.
      if (detail?.code === 'duplicate_parameter') enregistre = true;
      else console.error('[brevo] candidature — échec contact %s : %s', r.status, JSON.stringify(detail));
    }
  } catch (e) {
    console.error('[brevo] candidature — exception contact :', e);
  }

  /* L'accusé de réception part quoi qu'il arrive côté contact : la candidature
     est déjà entre les mains de GPV, le candidat doit le savoir. */
  await envoyerCourriel(
    {
      sender: expediteur,
      to: [{ email, name: prenom }],
      replyTo: expediteur,
      subject: SUJET_CANDIDAT,
      htmlContent: genererCourrielCandidature(prenom),
    },
    'accusé de réception candidature'
  );

  return reponse({ ok: true, enregistre });
};

export const config = { path: '/api/candidature-programme' };
