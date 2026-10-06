## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Projet

Portfolio personnel d'Alexandre Magnier (développeur full stack, en recherche de poste), en français uniquement. Astro 7 + Tailwind 4, pnpm.

- Spec : `docs/superpowers/specs/2026-10-05-portfolio-redesign-design.md` (section « Direction retenue »). Plans : `docs/superpowers/plans/`.
- Source de vérité du contenu : le CV (`public/cv-alexandre-magnier.pdf`). Ne jamais inventer de fait (dates, technos, résultats) ; ce qui manque est marqué `status: a-completer`.
- Contenu : `src/data/*.json` (profil, expériences, formations, compétences) et `src/content/projects/*.md` (collection `projects`, schéma Zod dans `src/content.config.ts`). Un contenu invalide fait échouer `pnpm astro build`.
- Valeurs provisoires à ne pas afficher : `year: 2024` des projets d'école, `stack: ["À préciser"]`. L'âge (26 ans) n'apparaît que dans l'accroche (`src/data/profile.json`) et doit être mis à jour à la main ; ne pas afficher de ville de résidence. Les projets n'affichent pas d'« état ».
- Les images de projet sont fournies par Alexandre après coup : un projet sans `cover` affiche un emplacement « capture à venir », jamais un faux visuel.
- Assets : `src/assets/` (via `astro:assets`). Pas de fichiers aux noms ambigus (espaces, guillemets).
- `design-explorations/` contient des maquettes statiques hors build (la maquette `terminal/` est la référence visuelle), ne pas les importer dans `src/`.
- Ancien portfolio (référence, ne pas modifier) : `../portfolio`.

## Design

Direction « terminal » : monospace (Martian Mono), arborescence fixe à gauche, sections ouvertes par des commandes, palette tirée du bleu de la photo (`#112343`). Le site ne doit pas ressembler à un site généré par IA. Interdits : dégradés violet/bleu, verre dépoli, grille de cartes identiques, icônes ou emojis de remplissage, hero générique centré avec deux boutons, polices par défaut (Inter, Poppins, Space Grotesk), textes creux, fausses fenêtres macOS à trois pastilles.

## Vérification

Avant de dire qu'un travail est terminé : `pnpm astro build` passe, aucune image ni lien cassé, rendu vérifié de 360 px à desktop.

## Pédagogie

Alexandre apprend Astro pendant ce projet : à chaque dossier ou fichier clé créé ou modifié (`src/pages`, `src/layouts`, `src/components`, `src/content`, `src/data`, `src/assets`, `public`, config), expliquer en une ou deux phrases son rôle, en français, sans répéter ce qui a déjà été expliqué. Le guide des dossiers est dans `docs/guide-astro.md`.

## Structure et commandes

- `pnpm dev` / `pnpm astro dev --background`, `pnpm build`, `pnpm preview` (après un build).
- Pages : `src/pages/index.astro` et `src/pages/projets/[slug].astro` (une page par fichier de `src/content/projects/`), `404.astro`.
- Cadre commun : `src/layouts/Shell.astro` (arborescence + barre d'état) dans `Layout.astro`. Sections dans `src/components/`, accès aux données dans `src/lib/content.ts`.
- Tout le CSS est dans `src/styles/global.css` (choix assumé pour un site de cette taille). Tailwind n'est importé que pour le thème et le reset (`tailwindcss/theme`, `tailwindcss/preflight`), pas pour les utilitaires.
- `sharp` est une dépendance requise par Astro 7 pour les images.
- Ajouter une capture ou un projet : voir `docs/guide-astro.md`.
- Thème sombre : jetons redéfinis sous `:root[data-theme="dark"]` et `@media (prefers-color-scheme: dark)` dans `global.css`, bouton dans `Shell.astro`, logique dans `src/scripts/theme-toggle.ts`. Toute nouvelle couleur doit être un jeton, jamais une valeur en dur.
- Stack des projets : texte sur l'accueil, gros logos monochromes sur la page projet (`src/components/TechGrid.astro`, `src/lib/tech.ts`). Pour un nouveau logo, déposer `src/assets/tech/<nom>.svg` (minuscules, sans espace ni point : « Tailwind CSS » → `tailwindcss.svg`), à prendre chez Simple Icons (monochrome). Sans logo, la techno s'affiche en texte.

`AGENTS.md` est une copie identique de ce fichier : après toute modification de `CLAUDE.md`, lancer `cp CLAUDE.md AGENTS.md`. Ne pas utiliser `sed -i` sur ces fichiers (cela peut les désynchroniser).
- Structure d'une fiche projet : `## Contexte`, `## Ce que j'ai fait`, `## Ce que j'ai appris` (facultatif). Ne pas répéter dans le texte le titre, la période ni la stack, déjà affichés par la page. La stack s'affiche dans sa propre section, pas dans le texte.
- Captures : `coverAlt`/`coverCaption`, `screenshotAlts`/`screenshotCaptions` ; un clic sur une image l'agrandit (`src/scripts/lightbox.ts`). Ne jamais publier de donnée personnelle visible dans une capture (e-mail d'un tiers, etc.) : la masquer avant d'enregistrer l'image.
- Sources de contenu des projets : rapports de stage (`Documents/Cours/B1/Stage B1`, `Documents/Cours/B2/RENDU STAGE LMD`), présentations Canva « PRES CDA » (Respire) et « Présentation Gustichef », dépôt local `Documents/respire`.
- Méthode agile : décrite dans la fiche Respire (`src/content/projects/respire.md`, section « Comment je me suis organisé »), d'après le dossier de projet CDA (`Documents/Cours/CDA`) : 19 semaines en solo, Kanban dans Notion, MoSCoW, Definition of Done, points d'étape. Pas de sprints ni de Scrum. Il n'y a plus de section méthode sur l'accueil (décision d'Alexandre).
- Liens des projets (champ `links` des fiches) : `live` ajoute un bouton « voir le projet en ligne ↗ » sur la page du projet, `repo` un bouton « voir le code sur GitHub ↗ ». Décision d'Alexandre : un endroit où cliquer pour voir le projet, pas de bouton e-mail. N'ajouter une adresse que si elle est publique et répond (déjà fait : Respire et Gustichef). Les anciennes démos d'alexandremagnier.com sont hors service.
- Sous Windows, arrêter le serveur de développement (`astro dev stop`) avant `pnpm astro build` : lancés ensemble, le build peut planter (assertion libuv).
- Compétences (`src/data/skills.json`) : le CV reste la base, complétée par les dossiers de projet. Ajouts faits : groupe « Méthodes » (Kanban, MoSCoW, user stories, Definition of Done, TDD, Merise, UML) d'après le dossier CDA, et SvelteKit passé en « Frameworks » (utilisé en production sur Gustichef).
- Mouvement : sobre et toujours sous `@media (prefers-reduced-motion: no-preference)` : fondu entre pages (`@view-transition`, CSS pur), apparition au défilement (`src/scripts/reveal.ts`), survols, ouverture de la fenêtre d'agrandissement. Pas de parallaxe, de halo ni de dégradé animé.
- Écran de chargement « AM » : première visite de la session seulement, jamais avec « réduire les animations » (`Layout.astro`, `src/scripts/loader.ts`, bloc `.loader` de `global.css`). Il utilise les couleurs de la barre d'état, identiques dans les deux thèmes.
- Projets sur l'accueil : un carrousel de cartes avec TOUS les projets (ordre = champ `order` : Respire, Marketplace, Gustichef d'abord), comme sur l'ancien portfolio. Pas de bouton "plus" ni de bloc dépliable pour d'autres projets (décision d'Alexandre). Fichiers : `ProjectsSection.astro`, `ProjectCard.astro`, `src/scripts/carousel.ts`. Chiffres clés dans `figures` : uniquement des faits sourcés.
- Page projet : l'ordre est titre et résumé, boutons (`links`), CAPTURES, texte de la fiche, stack, pagination. Le projet se voit d'abord (décision d'Alexandre) ; ne pas remettre les captures en bas.
- Démos HTML/CSS/JS : les projets statiques (white-hat, airbnb, echoes) sont copiés dans `public/demos/<slug>/` et liés par `links.live: "/demos/<slug>/index.html"` (toujours avec index.html : sans lui, le serveur de développement renvoie une erreur 404) (le schéma accepte un chemin du site ou une adresse https). Avant d'en ajouter une : retirer `.git`, `.vscode`, `.DS_Store` et les fichiers `._*`, utiliser des chemins relatifs (pas de `/img/…`), écrire les accents en forme composée (NFC), recompresser les images > 1 Mo (1800 px max). Sources : `Documents/dev/MDS/B2`. Cybersim n'a pas de source sur le disque.
- Carrousel dynamique : défilement automatique d'une carte toutes les 5,5 s (`AUTOPLAY_MS` dans `carousel.ts`), pas plus vite (décision d'Alexandre). Il se met en pause au survol, au focus, onglet caché, hors écran et après une action du visiteur ; bouton pause/lecture ; jamais avec « réduire les animations ».
