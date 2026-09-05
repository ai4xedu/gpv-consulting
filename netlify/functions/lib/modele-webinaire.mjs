/**
 * Modèle de l'e-mail « Ta place est réservée », envoyé automatiquement à chaque
 * inscription au formulaire de /webinaire. Même construction que
 * lib/modele-guide.mjs : tableaux imbriqués, styles en ligne, largeur 600 px.
 *
 * Le tutoiement est volontaire : le webinaire s'adresse au grand public,
 * pas aux organisations (voir la charte, section « garde-fous contenu »).
 */

const echapperHtml = (texte) =>
  String(texte).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * @param {string} prenom
 * @param {{ lien?: string }} options  lien de connexion, s'il est déjà connu
 */
export function genererCourrielWebinaire(prenom, { lien } = {}) {
  const salutation = prenom && prenom.trim() ? `${echapperHtml(prenom.trim())},` : 'Bonjour,';
  const lienValide = typeof lien === 'string' && /^https:\/\//.test(lien.trim()) ? lien.trim() : '';

  const blocLien = lienValide
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="left">
         <tr>
           <td bgcolor="#16466E" align="center" style="background-color:#16466E; border-radius:999px;">
             <a href="${echapperHtml(lienValide)}" style="display:inline-block; padding:15px 34px; font-family:'Poppins','Segoe UI',Arial,sans-serif; font-size:16px; font-weight:500; color:#FFFFFF; text-decoration:none;">Rejoindre le direct</a>
           </td>
         </tr>
       </table>`
    : `<p style="margin:0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:15px; line-height:1.7; color:#44607C;">
         Le lien de connexion t'arrive dans un e-mail séparé, la veille du direct. Il est privé et non référencé&nbsp;: garde-le pour toi.
       </p>`;

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>Ta place est réservée</title>
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
  Dimanche 13 septembre, 19h00 heure de Casablanca. Une heure pour retrouver de la lucidité.
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
          Inscription confirmée
        </p>
        <h1 class="h1" style="margin:0; font-family:'Poppins','Segoe UI',Arial,sans-serif; font-size:30px; line-height:1.22; font-weight:600; color:#FFFFFF;">
          C'est noté.<br />Ta place est réservée.
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
          Tu es inscrit·e au webinaire <strong style="color:#10314F; font-weight:600;">Hors Emprise</strong>. Tu recevras aussi un rappel sur WhatsApp le jour même.
        </p>
      </td>
    </tr>

    <!-- ══════════ QUAND ══════════ -->
    <tr>
      <td class="marge" style="padding:0 48px 30px 48px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#E9F6FA; border-radius:12px;">
          <tr>
            <td style="padding:22px 24px;">
              <p style="margin:0 0 4px 0; font-family:'Poppins','Segoe UI',Arial,sans-serif; font-size:18px; font-weight:500; color:#10314F;">
                Dimanche 13 septembre, 19h00
              </p>
              <p style="margin:0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:14px; line-height:1.6; color:#44607C;">
                Heure de Casablanca · En direct, chat ouvert · 60 minutes
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ══════════ LIEN / CTA ══════════ -->
    <tr>
      <td class="marge" style="padding:0 48px 32px 48px;">
        ${blocLien}
      </td>
    </tr>

    <!-- ══════════ DEUX CONSEILS ══════════ -->
    <tr>
      <td class="marge" style="padding:0 48px 8px 48px;">
        <p style="margin:0 0 14px 0; font-family:'Poppins','Segoe UI',Arial,sans-serif; font-size:17px; font-weight:500; color:#10314F;">
          Deux choses qui font une vraie différence
        </p>
        <p style="margin:0 0 12px 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:15px; line-height:1.7; color:#44607C;">
          <strong style="color:#10314F; font-weight:600;">1.</strong> Mets un rappel dans ton téléphone maintenant, pendant que tu y penses.
        </p>
        <p style="margin:0 0 26px 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:15px; line-height:1.7; color:#44607C;">
          <strong style="color:#10314F; font-weight:600;">2.</strong> Viens en direct plutôt qu'en replay. Je réponds aux questions du chat pendant la séance — c'est là que ça se joue.
        </p>
      </td>
    </tr>

    <!-- ══════════ CADRE ══════════ -->
    <tr>
      <td class="marge" style="padding:0 48px 34px 48px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td bgcolor="#D3E4EC" height="1" style="height:1px; line-height:1px; font-size:0; background-color:#D3E4EC;">&nbsp;</td></tr>
        </table>
        <p style="margin:20px 0 0 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:13px; line-height:1.7; color:#44607C;">
          Aucun participant n'est filmé, et personne ne voit qui assiste. Si tu ne peux pas être là,
          le replay te sera envoyé et restera accessible 48&nbsp;heures.
        </p>
        <p style="margin:14px 0 0 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:13px; line-height:1.7; color:#44607C;">
          Ce webinaire est un temps de compréhension, pas un dispositif d'urgence. Si tu es en danger
          immédiat, parle d'abord à une personne de confiance, à un professionnel de santé ou aux
          autorités compétentes.
        </p>
        <p style="margin:22px 0 0 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:15px; line-height:1.7; color:#10314F;">
          À dimanche,<br />
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
              +212 7 76 68 63 12 &middot; <a href="mailto:giovannispositivevibes@gmail.com" style="color:#9FD8EA; text-decoration:none;">giovannispositivevibes@gmail.com</a><br />
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
              Tu reçois cet e-mail parce que tu t'es inscrit·e au webinaire sur gpvconsulting.com.<br />
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
