/**
 * Crée dans Brevo la campagne « Votre guide est prêt » à destination de la liste des
 * inscrits au guide. Par défaut la campagne est créée en BROUILLON : rien n'est envoyé.
 *
 * Variables d'environnement :
 *   BREVO_KEY               (obligatoire) — même clé v3 que la fonction Netlify
 *   BREVO_LIST_ID           (optionnel) — liste de destination, 2 par défaut
 *   BREVO_EXPEDITEUR_NOM    (optionnel) — « Giovanni's Positive Vibes » par défaut
 *   BREVO_EXPEDITEUR_EMAIL  (optionnel) — expéditeur vérifié dans Brevo
 *
 * Usage :
 *   BREVO_KEY=xxx node courriel/creer-campagne.mjs
 *       → crée le brouillon, affiche l'identifiant de campagne et le nombre de destinataires
 *
 *   BREVO_KEY=xxx node courriel/creer-campagne.mjs --test vous@exemple.com
 *       → crée le brouillon puis vous envoie un exemplaire de contrôle
 *
 *   BREVO_KEY=xxx node courriel/creer-campagne.mjs --campagne 12 --test vous@exemple.com
 *       → réutilise une campagne existante au lieu d'en créer une nouvelle
 *
 *   BREVO_KEY=xxx node courriel/creer-campagne.mjs --campagne 12 --envoyer
 *       → envoie réellement à toute la liste (action irréversible)
 */

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ICI = dirname(fileURLToPath(import.meta.url));
const API = 'https://api.brevo.com/v3';

const SUJET = 'Votre guide est prêt à télécharger';
const NOM_CAMPAGNE = 'Guide — Pourquoi vos disputes recommencent toujours ?';

const cle = process.env.BREVO_KEY;
if (!cle) {
  console.error('✗ BREVO_KEY manquante. Relancez avec : BREVO_KEY=votre_cle node courriel/creer-campagne.mjs');
  process.exit(1);
}

const listeId = Number.parseInt(process.env.BREVO_LIST_ID ?? '2', 10);
const expediteur = {
  name: process.env.BREVO_EXPEDITEUR_NOM || "Giovanni's Positive Vibes",
  email: process.env.BREVO_EXPEDITEUR_EMAIL || 'giovannispositivevibes@gmail.com',
};

const args = process.argv.slice(2);
const valeurArg = (nom) => {
  const i = args.indexOf(nom);
  return i !== -1 ? args[i + 1] : undefined;
};
const emailTest = valeurArg('--test');
const campagneExistante = valeurArg('--campagne');
const envoyerVraiment = args.includes('--envoyer');

const appel = async (chemin, options = {}) => {
  const r = await fetch(`${API}${chemin}`, {
    ...options,
    headers: {
      'api-key': cle,
      'content-type': 'application/json',
      accept: 'application/json',
      ...(options.headers ?? {}),
    },
  });
  const texte = await r.text();
  let donnees = {};
  try { donnees = texte ? JSON.parse(texte) : {}; } catch { donnees = { brut: texte }; }
  if (!r.ok) {
    const err = new Error(donnees?.message || `HTTP ${r.status}`);
    err.statut = r.status;
    err.detail = donnees;
    throw err;
  }
  return donnees;
};

// ── 1. Vérifications préalables ────────────────────────────────────────────────
console.log('→ Vérification du compte Brevo…');

const liste = await appel(`/contacts/lists/${listeId}`).catch((e) => {
  console.error(`✗ Liste ${listeId} introuvable : ${e.message}`);
  process.exit(1);
});
console.log(`  Liste ${listeId} « ${liste.name} » — ${liste.totalSubscribers} inscrit(s), ${liste.totalBlacklisted ?? 0} désinscrit(s).`);

const { senders = [] } = await appel('/senders').catch(() => ({ senders: [] }));
const expediteurConnu = senders.find((s) => s.email?.toLowerCase() === expediteur.email.toLowerCase());
if (expediteurConnu) {
  console.log(`  Expéditeur vérifié : ${expediteur.name} <${expediteur.email}>`);
} else {
  console.warn(`  ⚠ ${expediteur.email} n'apparaît pas dans les expéditeurs vérifiés de ce compte.`);
  if (senders.length) console.warn(`    Disponibles : ${senders.map((s) => s.email).join(', ')}`);
  console.warn("    Brevo refusera l'envoi tant que l'expéditeur n'est pas validé.");
}

// ── 2. Création du brouillon ───────────────────────────────────────────────────
let campagneId = campagneExistante ? Number.parseInt(campagneExistante, 10) : null;

if (!campagneId) {
  const html = await readFile(join(ICI, 'guide-boucles.html'), 'utf8');
  console.log('→ Création du brouillon de campagne…');
  const creation = await appel('/emailCampaigns', {
    method: 'POST',
    body: JSON.stringify({
      name: NOM_CAMPAGNE,
      subject: SUJET,
      type: 'classic',
      sender: expediteur,
      replyTo: expediteur.email,
      htmlContent: html,
      recipients: { listIds: [listeId] },
      inlineImageActivation: false,
    }),
  });
  campagneId = creation.id;
  console.log(`  Brouillon créé — campagne n°${campagneId}`);
  console.log(`  À relire ici : https://app.brevo.com/campaigns/classic/${campagneId}`);
} else {
  console.log(`→ Campagne existante n°${campagneId} réutilisée.`);
}

// ── 3. Exemplaire de contrôle ──────────────────────────────────────────────────
if (emailTest) {
  console.log(`→ Envoi d'un exemplaire de contrôle à ${emailTest}…`);
  await appel(`/emailCampaigns/${campagneId}/sendTest`, {
    method: 'POST',
    body: JSON.stringify({ emailTo: [emailTest] }),
  });
  console.log('  Envoyé. Vérifiez le rendu avant tout envoi à la liste.');
  console.log('  (Le prénom n’est pas personnalisé dans un test : il affiche la valeur par défaut.)');
}

// ── 4. Envoi réel ──────────────────────────────────────────────────────────────
if (envoyerVraiment) {
  console.log(`→ ENVOI à la liste ${listeId} (${liste.totalSubscribers} destinataires)…`);
  await appel(`/emailCampaigns/${campagneId}/sendNow`, { method: 'POST' });
  console.log('  ✓ Campagne envoyée.');
} else {
  console.log('');
  console.log('Rien n’a été envoyé à la liste. Pour envoyer réellement :');
  console.log(`  BREVO_KEY=… node courriel/creer-campagne.mjs --campagne ${campagneId} --envoyer`);
}
