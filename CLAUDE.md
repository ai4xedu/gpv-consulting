# GPV — Design System « La Trajectoire » (v1.0 · juillet 2026)

Design system par défaut pour **tout visuel produit par Claude** pour Giovanni's Positive Vibes (site, Claude Design, réseaux sociaux, print). Référence complète : [charte/index.html](charte/index.html) · tokens CSS : [charte/tokens.css](charte/tokens.css).

## Identité

- **Marque** : Giovanni's Positive Vibes (GPV) — transformations humaines, relationnelles et managériales. Casablanca + distance.
- **Concept visuel** : la transformation comme trajectoire ; le dégradé de la vague du logo est le fil conducteur.
- **Signature** : « Comprendre ce qui bloque. Renforcer ce qui relie. Mettre en mouvement ce qui doit changer. »
- **4 pôles** : GPV Organisations (B2B) · GPV Accompagnements · GPV Expériences · GPV Insights.

## Logo — règles strictes

- Fichiers officiels (vectorisés, fond transparent), **le rendu s'adapte au fond** — jamais de redessin ni d'autre recolorisation :
  - `charte/assets/logo-gpv.svg` — couleur. **Défaut sur fonds clairs** (blanc, perle, ciel).
  - `charte/assets/logo-gpv-blanc.svg` — logotype blanc + icône couleur. **Défaut sur fonds sombres et dégradé** (nuit, indigo, photo sombre).
  - `charte/assets/logo-gpv-mono-nuit.svg` — monochrome bleu nuit. Filigrane, tampon, gravure, impression 1 couleur.
  - `charte/assets/logo-gpv-transparent.png` — PNG transparent 1590×920 (outils sans SVG).
  - `charte/assets/logo-gpv.jpeg` — original 1280×1280 fond blanc (référence de fidélité).
- Règle de choix : la version couleur ne va JAMAIS sur fond sombre (le logotype bleu nuit disparaît). Cartouche blanc arrondi = solution de secours pour les outils externes sans accès aux déclinaisons.
- Zone de protection : ¼ de la largeur du cercle, sur les 4 côtés. Min : 140 px écran / 28 mm print.

## Couleurs (ratio 60/30/10)

| Rôle | Couleur | Hex |
|---|---|---|
| Fonds clairs (60 %) | Blanc / Gris perle / Bleu ciel | `#FFFFFF` / `#F4F6F8` / `#E9F6FA` |
| Structure & texte (30 %) | Bleu nuit / Indigo | `#10314F` / `#16466E` |
| Accent (10 %) | Turquoise / Azur | `#35C1D6` / `#1F8FC4` |
| Dégradé signature | 120° turquoise → azur → indigo | `linear-gradient(120deg,#35C1D6,#1F8FC4 45%,#16466E)` |

Règles de contraste (vérifiées) : texte = bleu nuit sur fonds clairs, blanc sur indigo/nuit. **Jamais de texte turquoise sur blanc** (2,2:1). Blanc sur azur : grands titres ≥ 24 px seulement. Texte secondaire : `#44607C`. Le dégradé est réservé aux moments clés (hero, couverture, filet signature) — jamais en fond de texte long. B2B = dégradé discret (filets) ; B2C/Expériences = surfaces pleines autorisées.

## Typographies (Google Fonts, 2 familles max)

- **Titres** : Poppins 500/600 — H1 44/34 px · H2 32/26 · H3 24 · H4 18. Jamais < 500.
- **Texte** : Inter 400/500 — corps 16 px lh 1,65 · petit 14 · légende 12 maj. espacées 0,12 em.
- Pas d'italique décoratif, pas de texte en dégradé, max 2 graisses par support.

## Motifs graphiques (jamais superposés au logo)

Vague séparatrice (path fluide en dégradé) · trajectoire pointillée (point de départ plein → pointillés → flèche) · cercles incomplets · pictos filaires des 4 pôles. Trait 2–2,5 px, bouts arrondis, 1–2 couleurs max.

## Réseaux sociaux — formats et zones sûres

| Plateforme | Format | Px | Zone sûre |
|---|---|---|---|
| Instagram | Post portrait (défaut) | 1080×1350 | Essentiel dans le carré central 1080×1080 |
| Instagram | Carrousel | 1080×1350 | Marges internes 96 px |
| Instagram | Story / Reel | 1080×1920 | Libre : 250 px haut, 420 px bas, 120 px droite |
| TikTok | Vidéo | 1080×1920 | Libre : 150 px haut, 450 px bas, 140 px droite, 60 px gauche |
| YouTube | Vignette | 1280×720 | Éviter angle bas-droit (horodatage) ; lisible à 120 px |
| YouTube | Bannière | 2560×1440 | Zone tous-écrans : 1546×423 centrée |

**Gabarits RS** : hook concret en premier (scène avant théorie) ; une idée par visuel ; filet dégradé signature en haut ou bas ; badge de pôle (pilule) ; handle `@wearegiovanni` en bas dans la zone sûre ; texte Poppins SemiBold ≥ 64 px sur 1080 de large ; logo en cartouche blanc seulement sur couvertures/vignettes ; max 5 hashtags Instagram. Vignettes YouTube : 3–4 mots max + portrait réel + soulignement turquoise.

## Web

Fond blanc dominant, cartes bleu ciel/perle radius 12–20 px, **un seul CTA principal par écran** (indigo `#16466E`, texte blanc, pilule ; survol azur). Hero : dégradé signature + trajectoire en filigrane. Ombres douces `rgba(16,49,79,.08)` uniquement.

## Print

CMJN : turquoise C75 M10 J0 N16 · azur C84 M27 J0 N23 · indigo C80 M36 J0 N57 · nuit C80 M38 J0 N69. Couché mat 350 g (cartes) / 120 g (intérieur). Logo en cartouche blanc sur fonds colorés.

## Garde-fous contenu (obligatoires)

- Jamais : chiffres/témoignages/certifications inventés, « coach certifié ICF », « aérothérapie », promesses de guérison, vocabulaire « neuro-quantique », lotus/cerveaux lumineux/ésotérisme, stock photos artificielles, visages générés par IA.
- Le parapente = support expérientiel encadré, jamais une thérapie. B2B et B2C toujours séparés.
- Ton : professionnel, humain, précis. Phrases courtes. « Vous » en institutionnel ; tutoiement possible en grand public. Pas de superlatifs.
- Coordonnées confirmées uniquement : +212 7 76 68 63 12 · yk@gpvconsulting.com · gpvconsulting.com · Instagram @wearegiovanni · YouTube @giovannispositivevibes · Casablanca.

## Projet

- `charte/` : charte graphique interactive (ouvrir `index.html`) + tokens + logos.
- `site/` : site web — `index.html` (page d'accueil), `css/style.css` (consomme `css/tokens.css`, copie des tokens de la charte), `img/` (photos réelles extraites des brochures officielles + logos). Formulaire de contact en `mailto:` (pas de serveur) — à brancher sur un vrai backend au moment de la mise en ligne.
- Entité contractante B2B : **GPV Consulting** — yk@gpvconsulting.com · 6 bd Mohamed Taib Naciri, 1er étage, bureau n°4, Casablanca. Le B2C passe par giovannispositivevibes@gmail.com.
- Attention : il existe une AUTRE marque « GPV — Global Purpose and Vision » (logo violet, brochure corporate 02-2026). Ne jamais mélanger son identité visuelle avec Giovanni's Positive Vibes ; seuls ses contenus (offres, textes) et photos sont réutilisables.
- Phases suivantes possibles : pages intérieures (offres, fondateur, contact), backend formulaire, SEO, versions EN/AR.
