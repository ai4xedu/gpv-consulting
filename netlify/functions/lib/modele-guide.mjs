/**
 * Modèle de l'e-mail « Votre guide est prêt », envoyé automatiquement à chaque
 * inscription au formulaire de /guide. Dupliqué depuis courriel/guide-boucles.html
 * (version utilisée pour la campagne classique envoyée à la liste existante) —
 * si vous modifiez l'un, reportez le changement dans l'autre.
 */

const echapperHtml = (texte) =>
  String(texte).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function genererCourrielGuide(prenom) {
  const salutation = prenom && prenom.trim() ? echapperHtml(prenom.trim()) : 'Bonjour';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>Votre guide est prêt</title>
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
    .conteneur   { width:100% !important; }
    .marge       { padding-left:24px !important; padding-right:24px !important; }
    .h1          { font-size:28px !important; line-height:1.22 !important; }
    .h2          { font-size:22px !important; }
    .livre       { width:216px !important; height:auto !important; }
    .btn a       { display:block !important; width:auto !important; }
    .empile      { display:block !important; width:100% !important; }
    .empile-esp  { height:16px !important; }
    .auteur-img  { margin:0 auto 18px auto !important; }
    .centre-mob  { text-align:center !important; }
  }
</style>
</head>

<body style="margin:0; padding:0; background-color:#F4F6F8;">

<!-- Aperçu affiché dans la liste des messages, invisible dans le corps -->
<div style="display:none; font-size:1px; color:#F4F6F8; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
  Les cinq boucles invisibles qui abîment une relation — et comment reconnaître la vôtre.
  &#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;&#8202;&zwnj;&nbsp;
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F4F6F8;">
<tr>
<td align="center" style="padding:0;">

  <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
  <table role="presentation" class="conteneur" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background-color:#FFFFFF;">

    <!-- ══════════ FILET SIGNATURE ══════════ -->
    <tr>
      <td bgcolor="#1F8FC4" height="5" style="height:5px; line-height:5px; font-size:0; background-color:#1F8FC4; background-image:linear-gradient(120deg,#35C1D6,#1F8FC4 45%,#16466E);">&nbsp;</td>
    </tr>

    <!-- ══════════ LOGO ══════════ -->
    <tr>
      <td align="center" class="marge" style="padding:30px 40px 26px 40px; background-color:#FFFFFF;">
        <img src="https://gpvconsulting.com/guide/img/logo-courriel.png" width="152" alt="Giovanni's Positive Vibes" style="width:152px; max-width:152px; height:auto; display:block;" />
      </td>
    </tr>

    <!-- ══════════ HERO ══════════ -->
    <tr>
      <td bgcolor="#16466E" class="marge" style="padding:44px 48px 0 48px; background-color:#16466E; background-image:linear-gradient(120deg,#35C1D6,#1F8FC4 45%,#16466E);">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" style="padding:0 0 18px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="#FFFFFF" style="background-color:#FFFFFF; border-radius:100px; padding:8px 18px; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:11px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#16466E;">
                    Guide gratuit &middot; 15 pages
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" class="h1" style="font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-size:34px; line-height:1.24; font-weight:600; color:#FFFFFF; padding:0 0 16px 0;">
              Pourquoi vos disputes<br />recommencent toujours&nbsp;?
            </td>
          </tr>
          <tr>
            <td align="center" style="font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:16px; line-height:1.6; color:#EAF6FB; padding:0 0 34px 0;">
              Les sujets changent. Les mots changent.<br />La fin, elle, ne change presque jamais.
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0;">
              <img src="https://gpvconsulting.com/guide/img/livre-3d-courriel.png" width="270" class="livre" alt="Le guide en volume, couverture bleu nuit" style="width:270px; max-width:270px; height:auto; display:block;" />
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ══════════ MESSAGE + TÉLÉCHARGEMENT ══════════ -->
    <tr>
      <td class="marge" style="padding:40px 48px 8px 48px; background-color:#FFFFFF; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:16px; line-height:1.65; color:#10314F;">
        <p style="margin:0 0 18px 0; font-size:17px; font-weight:500;">${salutation},</p>
        <p style="margin:0 0 16px 0;">
          Merci d'avoir demandé ce guide. Il est prêt&nbsp;: vous pouvez le télécharger tout de suite.
        </p>
        <p style="margin:0 0 30px 0;">
          Gardez cet e-mail — le lien reste valable, vous pourrez y revenir quand vous voudrez.
        </p>
      </td>
    </tr>

    <tr>
      <td align="center" class="marge btn" style="padding:0 48px 14px 48px; background-color:#FFFFFF;">
        <!--[if mso]>
        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://gpvconsulting.com/guide/GPV-guide-disputes-boucles.pdf" style="height:52px; v-text-anchor:middle; width:320px;" arcsize="50%" stroke="f" fillcolor="#16466E">
          <w:anchorlock/>
          <center style="color:#FFFFFF; font-family:Arial,sans-serif; font-size:16px; font-weight:bold;">Télécharger le guide (PDF)</center>
        </v:roundrect>
        <![endif]-->
        <!--[if !mso]><!-- -->
        <a href="https://gpvconsulting.com/guide/GPV-guide-disputes-boucles.pdf"
           style="display:inline-block; background-color:#16466E; color:#FFFFFF; font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-size:16px; font-weight:600; line-height:52px; text-align:center; text-decoration:none; border-radius:100px; padding:0 34px; mso-hide:all;">
          Télécharger le guide (PDF)
        </a>
        <!--<![endif]-->
      </td>
    </tr>

    <tr>
      <td align="center" class="marge" style="padding:0 48px 40px 48px; background-color:#FFFFFF; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:13px; line-height:1.6; color:#44607C;">
        PDF &middot; 15 pages &middot; 20 à 30 minutes de lecture
      </td>
    </tr>

    <!-- ══════════ CE QUE CONTIENT LE GUIDE ══════════ -->
    <tr>
      <td bgcolor="#F4F6F8" class="marge" style="padding:44px 48px 20px 48px; background-color:#F4F6F8;">
        <p style="margin:0 0 10px 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:11px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#1F8FC4;">
          Ce que contient le guide
        </p>
        <h2 class="h2" style="margin:0 0 14px 0; font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-size:25px; line-height:1.3; font-weight:600; color:#10314F;">
          Cinq boucles, décrites des deux côtés
        </h2>
        <p style="margin:0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:15px; line-height:1.65; color:#44607C;">
          Une boucle n'a pas de coupable&nbsp;: elle a deux participants, et souvent deux personnes
          qui souffrent pour des raisons différentes.
        </p>
      </td>
    </tr>

    <tr>
      <td bgcolor="#F4F6F8" class="marge" style="padding:6px 48px 8px 48px; background-color:#F4F6F8;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

          <tr>
            <td width="42" valign="top" style="padding:12px 0 12px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr><td width="30" height="30" align="center" valign="middle" bgcolor="#E9F6FA" style="width:30px; height:30px; background-color:#E9F6FA; border-radius:30px; font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-size:13px; font-weight:600; color:#16466E;">1</td></tr>
              </table>
            </td>
            <td valign="top" style="padding:12px 0 12px 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:15px; line-height:1.6; color:#10314F;">
              <strong style="font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-weight:600;">Poursuivre et fuir.</strong>
              <span style="color:#44607C;">L'un cherche le contact pour se rassurer, l'autre la distance pour se calmer.</span>
            </td>
          </tr>

          <tr>
            <td width="42" valign="top" style="padding:12px 0 12px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr><td width="30" height="30" align="center" valign="middle" bgcolor="#E9F6FA" style="width:30px; height:30px; background-color:#E9F6FA; border-radius:30px; font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-size:13px; font-weight:600; color:#16466E;">2</td></tr>
              </table>
            </td>
            <td valign="top" style="padding:12px 0 12px 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:15px; line-height:1.6; color:#10314F;">
              <strong style="font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-weight:600;">Attaquer et contre-attaquer.</strong>
              <span style="color:#44607C;">La conversation devient un tribunal, et plus personne n'y défend un comportement.</span>
            </td>
          </tr>

          <tr>
            <td width="42" valign="top" style="padding:12px 0 12px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr><td width="30" height="30" align="center" valign="middle" bgcolor="#E9F6FA" style="width:30px; height:30px; background-color:#E9F6FA; border-radius:30px; font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-size:13px; font-weight:600; color:#16466E;">3</td></tr>
              </table>
            </td>
            <td valign="top" style="padding:12px 0 12px 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:15px; line-height:1.6; color:#10314F;">
              <strong style="font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-weight:600;">Se justifier et invalider.</strong>
              <span style="color:#44607C;">L'un parle de son ressenti, l'autre défend son intention. Deux conversations parallèles.</span>
            </td>
          </tr>

          <tr>
            <td width="42" valign="top" style="padding:12px 0 12px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr><td width="30" height="30" align="center" valign="middle" bgcolor="#E9F6FA" style="width:30px; height:30px; background-color:#E9F6FA; border-radius:30px; font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-size:13px; font-weight:600; color:#16466E;">4</td></tr>
              </table>
            </td>
            <td valign="top" style="padding:12px 0 12px 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:15px; line-height:1.6; color:#10314F;">
              <strong style="font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-weight:600;">Contrôler et résister.</strong>
              <span style="color:#44607C;">Plus l'un vérifie, plus l'autre se dérobe — et le lien s'abîme en voulant se sécuriser.</span>
            </td>
          </tr>

          <tr>
            <td width="42" valign="top" style="padding:12px 0 12px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr><td width="30" height="30" align="center" valign="middle" bgcolor="#E9F6FA" style="width:30px; height:30px; background-color:#E9F6FA; border-radius:30px; font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-size:13px; font-weight:600; color:#16466E;">5</td></tr>
              </table>
            </td>
            <td valign="top" style="padding:12px 0 12px 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:15px; line-height:1.6; color:#10314F;">
              <strong style="font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-weight:600;">Rompre et se réconcilier sans réparer.</strong>
              <span style="color:#44607C;">Se réconcilier, c'est revenir&nbsp;; réparer, c'est revenir différemment.</span>
            </td>
          </tr>

        </table>
      </td>
    </tr>

    <!-- ══════════ OUTIL CENTRAL ══════════ -->
    <tr>
      <td bgcolor="#F4F6F8" class="marge" style="padding:14px 48px 46px 48px; background-color:#F4F6F8;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#E9F6FA" style="background-color:#E9F6FA; border-radius:16px;">
          <tr>
            <td style="padding:26px 28px 26px 28px;">
              <p style="margin:0 0 8px 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:11px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#1F8FC4;">
                L'outil central
              </p>
              <p style="margin:0 0 10px 0; font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-size:18px; line-height:1.35; font-weight:600; color:#10314F;">
                La carte de votre dernière dispute
              </p>
              <p style="margin:0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:15px; line-height:1.65; color:#44607C;">
                Dix questions guidées pour reconstituer une dispute précise et repérer, noir sur blanc,
                l'endroit exact où la boucle se referme.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ══════════ COMMENT L'UTILISER ══════════ -->
    <tr>
      <td class="marge" style="padding:44px 48px 4px 48px; background-color:#FFFFFF;">
        <p style="margin:0 0 10px 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:11px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#1F8FC4;">
          Pour commencer
        </p>
        <h2 class="h2" style="margin:0 0 22px 0; font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-size:25px; line-height:1.3; font-weight:600; color:#10314F;">
          Trois étapes, dans cet ordre
        </h2>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="46" valign="top" style="padding:0 0 20px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr><td width="32" height="32" align="center" valign="middle" bgcolor="#16466E" style="width:32px; height:32px; background-color:#16466E; border-radius:32px; font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:600; color:#FFFFFF;">1</td></tr>
              </table>
            </td>
            <td valign="top" style="padding:4px 0 20px 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:15px; line-height:1.65; color:#44607C;">
              Faites le test des <strong style="color:#10314F;">12 affirmations</strong>. Cinq minutes, sans réfléchir trop longtemps.
            </td>
          </tr>
          <tr>
            <td width="46" valign="top" style="padding:0 0 20px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr><td width="32" height="32" align="center" valign="middle" bgcolor="#16466E" style="width:32px; height:32px; background-color:#16466E; border-radius:32px; font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:600; color:#FFFFFF;">2</td></tr>
              </table>
            </td>
            <td valign="top" style="padding:4px 0 20px 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:15px; line-height:1.65; color:#44607C;">
              Lisez <strong style="color:#10314F;">la boucle qui vous ressemble</strong>, puis relisez la colonne de l'autre côté.
            </td>
          </tr>
          <tr>
            <td width="46" valign="top" style="padding:0 0 8px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr><td width="32" height="32" align="center" valign="middle" bgcolor="#16466E" style="width:32px; height:32px; background-color:#16466E; border-radius:32px; font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-size:14px; font-weight:600; color:#FFFFFF;">3</td></tr>
              </table>
            </td>
            <td valign="top" style="padding:4px 0 8px 0; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:15px; line-height:1.65; color:#44607C;">
              Remplissez <strong style="color:#10314F;">la carte de votre dernière dispute</strong>. C'est souvent là que les choses deviennent claires.
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ══════════ FILET DE SÉPARATION ══════════ -->
    <tr>
      <td class="marge" style="padding:26px 48px 0 48px; background-color:#FFFFFF;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td bgcolor="#E9F6FA" height="1" style="height:1px; line-height:1px; font-size:0; background-color:#E9F6FA;">&nbsp;</td></tr>
        </table>
      </td>
    </tr>

    <!-- ══════════ AUTEUR ══════════ -->
    <tr>
      <td class="marge" style="padding:34px 48px 40px 48px; background-color:#FFFFFF;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td class="empile" width="96" valign="top" style="padding:0 20px 0 0;">
              <img src="https://gpvconsulting.com/guide/img/yassine-courriel.jpg" width="76" alt="Yassine Kettani" class="auteur-img" style="width:76px; max-width:76px; height:auto; border-radius:76px; display:block;" />
            </td>
            <td class="empile centre-mob" valign="top" style="font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif;">
              <p style="margin:0 0 3px 0; font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-size:16px; font-weight:600; color:#10314F;">
                Yassine Kettani
              </p>
              <p style="margin:0 0 12px 0; font-size:13px; line-height:1.5; color:#1F8FC4;">
                Fondateur de Giovanni's Positive Vibes
              </p>
              <p style="margin:0; font-size:14px; line-height:1.65; color:#44607C;">
                Il accompagne depuis 2023 des particuliers, des couples et des équipes sur leurs
                dynamiques relationnelles, à Casablanca et à distance. Il travaille sur ce qui se joue
                derrière ce qui se dit.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ══════════ RAPPEL TÉLÉCHARGEMENT ══════════ -->
    <tr>
      <td bgcolor="#F4F6F8" align="center" class="marge" style="padding:38px 48px 40px 48px; background-color:#F4F6F8;">
        <p style="margin:0 0 20px 0; font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-size:19px; line-height:1.35; font-weight:600; color:#10314F;">
          Votre guide vous attend
        </p>
        <!--[if mso]>
        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://gpvconsulting.com/guide/GPV-guide-disputes-boucles.pdf" style="height:50px; v-text-anchor:middle; width:300px;" arcsize="50%" stroke="f" fillcolor="#16466E">
          <w:anchorlock/>
          <center style="color:#FFFFFF; font-family:Arial,sans-serif; font-size:15px; font-weight:bold;">Télécharger le guide (PDF)</center>
        </v:roundrect>
        <![endif]-->
        <!--[if !mso]><!-- -->
        <a href="https://gpvconsulting.com/guide/GPV-guide-disputes-boucles.pdf"
           style="display:inline-block; background-color:#16466E; color:#FFFFFF; font-family:'Poppins','Helvetica Neue',Arial,sans-serif; font-size:15px; font-weight:600; line-height:50px; text-align:center; text-decoration:none; border-radius:100px; padding:0 32px; mso-hide:all;">
          Télécharger le guide (PDF)
        </a>
        <!--<![endif]-->
      </td>
    </tr>

    <!-- ══════════ NOTE ══════════ -->
    <tr>
      <td class="marge" style="padding:30px 48px 30px 48px; background-color:#FFFFFF; font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:12px; line-height:1.7; color:#44607C;">
        Ce guide est un outil de réflexion et d'éducation. Il ne remplace pas un suivi médical,
        psychologique ou psychiatrique, ni une intervention spécialisée en cas de violence ou de danger.
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
                <tr><td bgcolor="#1F8FC4" height="1" style="height:1px; line-height:1px; font-size:0; background-color:#1F8FC4; opacity:0.4;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" class="lien-clair" style="font-family:'Inter',-apple-system,'Segoe UI',Arial,sans-serif; font-size:11px; line-height:1.7; color:#8FA9BE;">
              Vous recevez cet e-mail parce que vous avez demandé ce guide sur gpvconsulting.com.<br />
              <a href="{{ unsubscribe }}" style="color:#9FD8EA; text-decoration:underline;">Se désinscrire</a>
              &middot; © 2026 Giovanni's Positive Vibes
            </td>
          </tr>
        </table>
      </td>
    </tr>

  </table>
  <!--[if mso]></td></tr></table><![endif]-->

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
