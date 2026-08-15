# Intégrer des scènes motion design IA dans les 10 vidéos

Réflexion + spec de production. À lire avant de générer quoi que ce soit.

---

## 1. Le problème posé par la charte

La charte GPV interdit les visages générés par IA et les images artificielles. Le format UGC
standard d'Arcads — un acteur IA face caméra qui parle du produit — est donc **inutilisable tel quel**.

Ce n'est pas une impasse, c'est un cadrage. Il reste deux usages de l'IA parfaitement dans la charte :

| Type d'insert | Ce que c'est | Outil | Statut charte |
|---|---|---|---|
| **A. Scène de vie** | Plan concret, sans visage identifiable : mains, dos, silhouette, objet, hors-champ | Arcads (Seedance / Veo / Kling) | ✅ si aucun visage net |
| **B. Motif animé** | Le vocabulaire graphique GPV mis en mouvement : trajectoire, boucle, vague, cercle incomplet | Rendu code / After Effects (déterministe, aux tokens) | ✅ par construction |

**Règle de partage :** le concret passe par A, l'abstrait par B. Une émotion se montre (A),
un mécanisme se dessine (B). Ne jamais demander à l'IA de figurer un concept —
elle produit du symbolisme flou, exactement ce que la charte proscrit (lotus, cerveaux lumineux).

---

## 2. Où les inserts se posent dans une vidéo

Structure type d'un Reel GPV de 45–60 s, et l'emplacement des beats :

| Temps | Bloc | Insert |
|---|---|---|
| 0–3 s | **Hook** — Giovanni face caméra, scène concrète | ❌ aucun. Le visage réel porte l'accroche. Un insert ici tue la rétention. |
| 3–10 s | **Situation** — la scène du quotidien | ✅ **A** — 2 à 3 s. Le plan illustre littéralement ce qui est dit. |
| 10–30 s | **Mécanisme** — ce qui se joue vraiment | ✅ **B** — 2 à 3 s, au moment exact du mot-clé (« la boucle », « ça remonte »). |
| 30–45 s | **Bascule** — ce qui change si on agit | ✅ **A** ou **B** — 1,5 à 2 s, jamais plus. |
| 45–60 s | **Chute + CTA** | ✅ **B** — carton final dégradé signature, 2 s. |

Doses : **2 à 4 inserts par vidéo, 1,5 à 3 s chacun**, soit 8 à 12 % de la durée totale.
Au-delà, la vidéo devient un clip et perd la présence humaine qui est l'actif de la marque.
Aucun insert dans les 3 premières secondes, jamais deux inserts consécutifs.

---

## 3. Le kit récurrent — ce qui fait série

L'erreur sur 10 vidéos serait de générer 30 plans uniques. L'identité de série vient de la
**répétition reconnaissable**. On produit **6 assets une fois**, on les réutilise partout :

**Motifs animés (B) — le kit signature**

1. `trajectoire-depart` — point plein → pointillés qui avancent → flèche. Ouvre le sujet.
2. `boucle-fermee` — cercle qui se referme sur lui-même puis repart. C'est LE motif du guide
   « pourquoi vos disputes recommencent » : il porte la marque intellectuelle de GPV.
3. `cercle-incomplet` — arc qui tourne sans jamais fermer. Pour « ce qui reste en suspens ».
4. `vague-transition` — la vague séparatrice qui balaie l'écran. Transition entre deux blocs.
5. `bascule` — deux traits qui se croisent, l'un descend, l'autre monte. Pour le pivot.
6. `carton-final` — dégradé signature 120°, une phrase Poppins SemiBold, handle `@wearegiovanni`.

Chaque vidéo pioche 2 ou 3 de ces 6. Au bout de 4 vidéos, `boucle-fermee` est devenu la signature
visuelle de GPV — c'est ça, le rendement d'une série.

**Scènes de vie (A) — générées à la demande**

Là, on génère par vidéo, mais avec un style figé, écrit une fois et copié dans chaque prompt :

> Style GPV : 9:16, esthétique iPhone naturelle, lumière douce du soir ou lumière du jour rasante,
> intérieur marocain contemporain sobre, palette froide (bleus, gris, blanc), grain léger,
> caméra à l'épaule très légère. Aucun visage net dans le cadre. Pas de texte incrusté.

Banque de scènes réutilisable sur les 10 : deux tasses sur une table, une porte entrouverte,
un téléphone posé écran vers le bas, des mains qui se décroisent, une chaise vide en réunion,
un couloir de bureau à contre-jour, des chaussures dans l'entrée. Concret, banal, jamais joli.

---

## 4. Specs techniques

- **Format** 1080×1920, 30 fps, H.264. Zones sûres : Instagram 250 px haut / 420 px bas ;
  TikTok 150 px haut / 450 px bas / 140 px droite. Aucun élément motion hors zone.
- **Motifs (B)** : trait 2–2,5 px à l'échelle 1080, bouts arrondis, 1 à 2 couleurs max
  (turquoise `#35C1D6`, azur `#1F8FC4`), sur fond blanc `#FFFFFF` ou bleu nuit `#10314F`.
  Le dégradé signature reste réservé au `carton-final` et au filet de transition.
- **Animation** : durée 1,5–3 s, easing `cubic-bezier(.22,.61,.36,1)`, un seul mouvement par insert.
  Le tracé se dessine (stroke-dashoffset), il n'apparaît pas d'un bloc.
- **Typo à l'écran** : Poppins SemiBold ≥ 64 px sur 1080 de large. Jamais de texte turquoise sur blanc
  (2,2:1), jamais de texte en dégradé.
- **Son** : les inserts B passent sous la voix, avec un souffle ou un tick discret à l'entrée.
  Ne jamais couper la voix pour un insert — le montage reste continu à l'audio.
- **Sous-titres** : brûlés (skill `caption-video`), et ils ne s'arrêtent pas pendant les inserts.

---

## 5. Pipeline sur les 10 vidéos

1. **Découper le script des 10.** Pour chaque vidéo : repérer le mot-clé du mécanisme
   (→ insert B) et la scène concrète du hook (→ insert A).
2. **Remplir le plan de tournage** — un tableau `video | timecode | type (A/B) | asset ou prompt | durée`.
   C'est le seul document à valider avant de dépenser un crédit.
3. **Produire le kit B une fois** (6 assets, rendus au code depuis `charte/tokens.css`, donc
   exactement aux couleurs de la marque, regénérables et gratuits).
4. **Générer les plans A par lot** chez Arcads, 2 variantes sur les plans clés, en chiffrant
   la série entière d'abord.
5. **Filmer les blocs face caméra**, monter, incruster, sous-titrer.
6. **Covers** via le skill `gpv-covers`, une par vidéo.

Ordre volontaire : le kit B avant les plans A. Les motifs sont gratuits, réutilisables et
100 % dans la charte — ils absorbent une bonne partie du besoin d'illustration, et on ne découvre
qu'après coup combien de plans IA sont réellement nécessaires. Souvent moins que prévu.
