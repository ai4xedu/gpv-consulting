/**
 * Modèles d'e-mail du formulaire de candidature de /programme.
 *
 * Deux messages partent à chaque candidature :
 *   - genererCourrielCandidature()  → l'accusé de réception envoyé au candidat.
 *     Même construction que lib/modele-webinaire.mjs : tableaux imbriqués,
 *     styles en ligne, largeur 600 px.
 *   - genererCourrielInterne()      → la copie envoyée à Yassine, qui contient
 *     le texte libre de l'objectif. Ce champ ne tient pas dans un attribut
 *     Brevo : sans cet e-mail, la seule chose que le candidat a pris la peine
 *     d'écrire serait perdue.
 *
 * Le tutoiement de l'accusé de réception est volontaire : le programme
 * s'adresse au grand public, comme le webinaire (voir la charte, section
 * « garde-fous contenu »).
 */

const echapperHtml = (texte) =>
  String(texte).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Un texte libre saisi dans un <textarea> : les retours à la ligne sont
   significatifs, ils doivent survivre au passage en HTML. */
const echapperParagraphe = (texte) =>
  echapperHtml(texte).replace(/\r\n|\r|\n/g, '<br />');

/**
 * Accusé de réception envoyé au candidat.
 * @param {string} prenom
 */
export function genererCourrielCandidature(prenom) {
  const salutation = prenom && prenom.trim() ? `${echapperHtml(prenom.trim())},` : 'Bonjour,';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>Candidature reçue</title>
<!--[if mso]>
<xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
<![endif]-->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600&display=swap" rel="stylesheet" />
<style type="text/css">
  :root { color-scheme: light only; supported-color-schemes: light only; }
  body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
  table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
  img { -ms-interpolation-mode:bicubic; border:0; outline:none; text-decoration:none; display:block; }
  body { margin:0 !important; padding:0 !important; width:100% !important; }
  a { color:#16466E; }
  .lien-clair a { color:#9FD8EA !important; }

  @media only screen and (max-width:620px) {
    .conteneur { width:100% !important; }
    .marge     { padding-left:24px !important; padding-right:24px !important; }
    .h1        { font-size:26px !important; line-height:1.24 !important; }
  }
</style>
</head>

<body style="margin:0; padding:0; background-color:#F4F6F8;">

<!-- Aperçu affiché dans la liste des messages, invisible dans le corps -->
<div style="display:none; font-size:1px; color:#F4F6F8; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
  Je lis ta candidature moi-même et je te réponds sous 48 heures, y compris si la réponse est « pas maintenant ».
  &#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F4F6F8;">
<tr>
<td align="center" style="padding:28px 12px;">

  <table role="presentation" width="600" class="conteneur" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background-color:#FFFFFF; border-radius:20px; overflow:hidden;">

    <!-- ══════════ FILET SIGNATURE ══════════ -->
    <tr>
      <td bgcolor="#1F8FC4" height="4" style="height:4px; line-height:4px; font-size:0; background-color:#1F8FC4;">&nbsp;</td>
    </tr>

    <!-- ══════════ EN-TÊTE ══════════ -->
    <tr>
      <td bgcolor="#10314F" class="marge" style="padding:34px 48px 32px 48px; background-color:#10314F;">
        <p style="margin:0 0 18px 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:11px; font-weight:500; letter-spacing:.12em; text-transform:uppercase; color:#35C1D6;">
          Candidature reçue
        </p>
        <h1 class="h1" style="margin:0; font-family:'Poppins','Segoe UI',Arial,sans-serif; font-size:30px; line-height:1.22; font-weight:600; color:#FFFFFF;">
          C'est bien arrivé.<br />Je la lis moi-même.
        </h1>
      </td>
    </tr>

    <!-- ══════════ CORPS ══════════ -->
    <tr>
      <td class="marge" style="padding:36px 48px 8px 48px;">
        <p style="margin:0 0 18px 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:16px; line-height:1.7; color:#10314F;">
          ${salutation}
        </p>
        <p style="margin:0 0 26px 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:16px; line-height:1.7; color:#44607C;">
          Ta candidature à la cohorte fondatrice de <strong style="color:#10314F; font-weight:600;">Hors Emprise</strong> est enregistrée. Elle n'est pas traitée par un formulaire automatique&nbsp;: je la lis, et je te réponds.
        </p>
      </td>
    </tr>

    <!-- ══════════ DÉLAI ══════════ -->
    <tr>
      <td class="marge" style="padding:0 48px 30px 48px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#E9F6FA; border-radius:12px;">
          <tr>
            <td style="padding:22px 24px;">
              <p style="margin:0 0 4px 0; font-family:'Poppins','Segoe UI',Arial,sans-serif; font-size:18px; font-weight:500; color:#10314F;">
                Réponse sous 48 heures
              </p>
              <p style="margin:0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:14px; line-height:1.6; color:#44607C;">
                Puis, si le parcours te correspond, un entretien de vingt minutes
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ══════════ LA SUITE ══════════ -->
    <tr>
      <td class="marge" style="padding:0 48px 8px 48px;">
        <p style="margin:0 0 14px 0; font-family:'Poppins','Segoe UI',Arial,sans-serif; font-size:17px; font-weight:500; color:#10314F;">
          Ce qui se passe maintenant
        </p>
        <p style="margin:0 0 12px 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:15px; line-height:1.7; color:#44607C;">
          <strong style="color:#10314F; font-weight:600;">1.</strong> Je réponds à toutes les candidatures, y compris quand la réponse est «&nbsp;pas maintenant&nbsp;». Dans ce cas je t'oriente vers ce qui convient mieux à ta situation.
        </p>
        <p style="margin:0 0 26px 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:15px; line-height:1.7; color:#44607C;">
          <strong style="color:#10314F; font-weight:600;">2.</strong> Si le parcours te correspond, on fixe un entretien de vingt minutes. Il vérifie l'adéquation et la sécurité. Aucun paiement n'est demandé avant.
        </p>
      </td>
    </tr>

    <!-- ══════════ WEBINAIRE ══════════ -->
    <tr>
      <td class="marge" style="padding:0 48px 32px 48px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="left">
          <tr>
            <td bgcolor="#16466E" align="center" style="background-color:#16466E; border-radius:999px;">
              <a href="https://gpvconsulting.com/webinaire/" style="display:inline-block; padding:15px 34px; font-family:'Poppins','Segoe UI',Arial,sans-serif; font-size:16px; font-weight:500; color:#FFFFFF; text-decoration:none;">Réserver ma place au webinaire</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ══════════ CADRE ══════════ -->
    <tr>
      <td class="marge" style="padding:0 48px 34px 48px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td bgcolor="#D3E4EC" height="1" style="height:1px; line-height:1px; font-size:0; background-color:#D3E4EC;">&nbsp;</td></tr>
        </table>
        <p style="margin:20px 0 0 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:13px; line-height:1.7; color:#44607C;">
          Ce que tu as écrit sert à préparer l'entretien, et à rien d'autre. Aucune revente, aucun partage à un tiers.
        </p>
        <p style="margin:14px 0 0 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:13px; line-height:1.7; color:#44607C;">
          Hors Emprise est un accompagnement, pas un dispositif d'urgence. Si tu es en danger immédiat, la ligne
          <strong style="color:#10314F; font-weight:600;">8350</strong> assure au Maroc écoute et orientation 24&nbsp;h/24 pour les femmes
          victimes de violence. Ailleurs, contacte les services d'urgence de ton pays.
        </p>
        <p style="margin:22px 0 0 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:15px; line-height:1.7; color:#10314F;">
          À très vite,<br />
          <strong style="font-weight:600;">Yassine Kettani</strong>
        </p>
      </td>
    </tr>

    <!-- ══════════ PIED ══════════ -->
    <tr>
      <td bgcolor="#10314F" class="marge" style="padding:36px 48px 34px 48px; background-color:#10314F;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" style="padding:0 0 22px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="#FFFFFF" align="center" style="background-color:#FFFFFF; border-radius:14px; padding:14px 22px;">
                    <img src="https://gpvconsulting.com/guide/img/logo-courriel.png" width="126" alt="Giovanni's Positive Vibes" style="width:126px; max-width:126px; height:auto; display:block;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" class="lien-clair" style="font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:13px; line-height:1.8; color:#B9CEDE; padding:0 0 18px 0;">
              +212 7 76 68 63 12 &middot; <a href="mailto:yk@gpvconsulting.com" style="color:#9FD8EA; text-decoration:none;">yk@gpvconsulting.com</a><br />
              Casablanca — et à distance &middot; <a href="https://instagram.com/wearegiovanni" style="color:#9FD8EA; text-decoration:none;">@wearegiovanni</a>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 0 14px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td bgcolor="#1F8FC4" height="1" style="height:1px; line-height:1px; font-size:0; background-color:#1F8FC4;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" class="lien-clair" style="font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:11px; line-height:1.7; color:#8FA9BE;">
              Tu reçois cet e-mail parce que tu as déposé une candidature sur gpvconsulting.com.<br />
              <a href="{{ unsubscribe }}" style="color:#9FD8EA; text-decoration:underline;">Se désinscrire</a>
              &middot; © 2026 Giovanni's Positive Vibes
            </td>
          </tr>
        </table>
      </td>
    </tr>

  </table>

  <table role="presentation" width="600" class="conteneur" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px;">
    <tr><td height="28" style="height:28px; line-height:28px; font-size:0;">&nbsp;</td></tr>
  </table>

</td>
</tr>
</table>

</body>
</html>
`;
}

/**
 * Copie interne, envoyée à l'adresse GPV. Volontairement dépouillée : elle est
 * lue sur un téléphone, entre deux rendez-vous, et doit tenir en un écran.
 *
 * @param {{prenom:string, email:string, whatsapp:string, situation:string,
 *          objectif:string, disponibilite:string, source:string}} c
 */
export function genererCourrielInterne(c) {
  const ligne = (etiquette, valeur) => valeur
    ? `<tr>
         <td style="padding:10px 0; border-bottom:1px solid #D3E4EC; font-family:'Inter',Arial,sans-serif; font-size:13px; color:#44607C; white-space:nowrap; vertical-align:top;">${echapperHtml(etiquette)}</td>
         <td style="padding:10px 0 10px 18px; border-bottom:1px solid #D3E4EC; font-family:'Inter',Arial,sans-serif; font-size:14px; color:#10314F; vertical-align:top;">${echapperHtml(valeur)}</td>
       </tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8" /><title>Candidature Hors Emprise</title></head>
<body style="margin:0; padding:24px; background-color:#F4F6F8; font-family:'Inter',Arial,sans-serif;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:100%; margin:0 auto; background-color:#FFFFFF; border-radius:12px;">
    <tr><td bgcolor="#1F8FC4" height="4" style="height:4px; line-height:4px; font-size:0;">&nbsp;</td></tr>
    <tr>
      <td style="padding:28px 32px 8px 32px;">
        <p style="margin:0 0 6px 0; font-size:11px; font-weight:500; letter-spacing:.12em; text-transform:uppercase; color:#1F8FC4;">Nouvelle candidature</p>
        <h1 style="margin:0 0 22px 0; font-family:'Poppins',Arial,sans-serif; font-size:22px; font-weight:600; color:#10314F;">${echapperHtml(c.prenom || 'Sans prénom')}</h1>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${ligne('E-mail', c.email)}
          ${ligne('WhatsApp', c.whatsapp)}
          ${ligne('Situation', c.situation)}
          ${ligne('Disponibilité', c.disponibilite)}
          ${ligne('Provenance', c.source)}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:26px 32px 32px 32px;">
        <p style="margin:0 0 10px 0; font-family:'Poppins',Arial,sans-serif; font-size:15px; font-weight:500; color:#10314F;">Ce qui doit avoir changé au 10 décembre</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#E9F6FA; border-radius:12px;">
          <tr>
            <td style="padding:18px 20px; font-size:14px; line-height:1.7; color:#10314F;">
              ${echapperParagraphe(c.objectif || '—')}
            </td>
          </tr>
        </table>
        <p style="margin:22px 0 0 0; font-size:13px; line-height:1.7; color:#44607C;">
          Répondre directement à cet e-mail écrit à
          <a href="mailto:${echapperHtml(c.email || '')}" style="color:#16466E;">${echapperHtml(c.email || '')}</a>.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
