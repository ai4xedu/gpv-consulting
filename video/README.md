# GPV — Pipeline vidéo IA (Arcads)

Workflow de production des vidéos courtes GPV : script → scènes → génération IA → montage → cover.
La réflexion sur les inserts motion design est dans [motion-design.md](motion-design.md).

---

## 1. Connecter Arcads

Deux routes. Elles ne s'excluent pas — la première pour piloter à la voix depuis l'app Claude,
la seconde pour produire en série depuis Claude Code (c'est celle qui sert pour les 10 vidéos).

### Route A — connecteur MCP (Claude app / Claude Desktop)

1. Compte actif sur https://app.arcads.ai (abonnement + crédits : la génération vidéo consomme des crédits).
2. Page de connexion officielle du connecteur : https://connectmcp.arcads.ai (ou https://setup.arcads.ai).
3. Ajouter le connecteur dans Claude → **Paramètres → Connecteurs**, puis autoriser l'accès au compte Arcads
   (OAuth : on se connecte à Arcads, on autorise, c'est fini — pas de clé à copier).
4. Vérifier : demander à Claude « liste les acteurs Arcads disponibles ». S'il répond, la connexion est bonne.

### Route B — API directe depuis Claude Code (recommandée pour la série)

Pack officiel : https://github.com/krusemediallc/arcads-claude-code — pas de MCP, appels API directs,
et il embarque les skills utiles (`arcads-external-api`, `nano-banana-image-ad`, `caption-video`,
`generate-youtube-thumbnail`, `meta-ad-builder`).

```bash
git clone https://github.com/krusemediallc/arcads-claude-code
cd arcads-claude-code
./scripts/setup.sh          # demande la clé API, vérifie la connexion, écrit .env + MASTER_CONTEXT.md
```

La clé se récupère sur https://app.arcads.ai/settings/api → variable `ARCADS_API_KEY`
(voir [.env.example](.env.example)). `META_ACCESS_TOKEN` / `META_AD_ACCOUNT_ID` ne servent que si
on publie directement en annonces Meta — inutile pour de l'organique Reels/TikTok.

> **À faire sur ta machine, pas ici.** La session Claude cloud passe par un proxy qui bloque
> `arcads.ai` (403 sur le tunnel) : aucune génération n'est possible depuis le dépôt distant.
> Le repo sert à préparer scripts, plans de tournage et specs ; la génération se lance en local.

Modèles disponibles via Arcads au moment de l'écriture : Seedance 2.0, Sora 2, Veo 3.1, Kling 3.0.

---

## 2. Étapes pour générer une vidéo

1. **Entrées.** Le script (texte), et si besoin une image de référence
   (produit, décor, acteur) déposée dans `references/`. Arcads détecte les références
   et garde la cohérence d'un plan à l'autre.
2. **Choix du plan.** Durée (8–15 s par plan généré), format 9:16, ratio de plans IA vs face caméra
   — voir le tableau de beats dans `motion-design.md`.
3. **Prompt.** Une phrase concrète décrivant scène + action + intention, par ex. :
   « Plan Seedance 12 s, 9:16, esthétique iPhone : mains d'un homme qui repose son téléphone
   sur une table de cuisine, l'autre personne hors champ ne répond pas, lumière du soir. »
4. **Estimation crédits.** L'agent chiffre avant de lancer — valider explicitement.
   Sur 10 vidéos, chiffrer la série entière avant le premier rendu.
5. **Génération + polling.** L'agent attend la fin du job et rend le MP4.
6. **Sélection.** Générer 2 variantes par plan clé, garder la meilleure. Jeter sans état d'âme :
   un plan IA raté se voit plus qu'il ne sert.
7. **Montage.** Assemblage des plans + inserts motion (`motion-design.md`) + sous-titres
   (skill `caption-video`).
8. **Cover.** Skill `gpv-covers` sur une capture de la vidéo montée → thumbnail 1080×1920.

---

## 3. Garde-fous GPV (non négociables)

Rappel de `CLAUDE.md`, qui prime sur toute suggestion d'outil :

- **Aucun visage généré par IA, aucune stock photo artificielle.** Conséquence directe sur les plans
  Arcads : les scènes IA GPV se tournent **sans visage identifiable** — mains, dos, silhouettes,
  hors-champ, objets, cadrages serrés. Le visage à l'écran est celui de Giovanni, filmé.
  C'est la contrainte structurante de tout ce pipeline (le format « acteur UGC face caméra »
  vendu par Arcads est, tel quel, hors charte).
- Pas de chiffres, témoignages ou certifications inventés. Un plan IA ne met jamais en scène
  un « client » qui témoigne.
- Le parapente est un support expérientiel encadré, jamais une thérapie.
- B2B (GPV Consulting) et B2C (Giovanni's Positive Vibes) restent séparés — jamais dans la même vidéo.
- Ton : phrases courtes, concret avant théorie, pas de superlatifs.
