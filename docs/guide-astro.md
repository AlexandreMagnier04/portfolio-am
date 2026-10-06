# Guide des dossiers (pour apprendre Astro)

Ce guide décrit chaque dossier du projet et son rôle dans Astro. Il est complété au fil du chantier.

## À la racine

| Élément | Rôle |
|---|---|
| `astro.config.mjs` | Configuration d'Astro. Ici : le plugin Tailwind pour Vite (Vite est l'outil de build sous Astro). |
| `package.json` / `pnpm-lock.yaml` | Dépendances et scripts (`pnpm dev`, `pnpm build`). Le lockfile fige les versions. `package-lock.json` est un doublon npm, à supprimer un jour (on utilise pnpm). |
| `tsconfig.json` | Configuration TypeScript. Astro vérifie les types même dans les fichiers `.astro`. |
| `node_modules/` | Dépendances installées. Ne jamais modifier, ne pas versionner. |
| `CLAUDE.md` / `AGENTS.md` | Instructions pour l'assistant IA (deux copies identiques : après toute modification de l'une, recopier sur l'autre). |

## `src/` : le code du site, transformé au build

| Dossier | Rôle |
|---|---|
| `src/pages/` | **Routage par fichiers.** Chaque fichier devient une URL : `index.astro` → `/`, `projets/[slug].astro` → `/projets/sonde`. C'est le dossier le plus important à comprendre. [Doc](https://docs.astro.build/en/guides/routing/) |
| `src/layouts/` | Gabarits de page réutilisables (le `<html>`, le `<head>`, le squelette commun). Une page l'enveloppe avec `<Layout>…</Layout>`. |
| `src/components/` | Morceaux d'interface réutilisables (`.astro`). Un composant = un bloc de HTML + son CSS, avec une partie script entre `---` qui s'exécute au build, pas dans le navigateur. [Doc](https://docs.astro.build/en/basics/astro-components/) |
| `src/content/` | **Contenu écrit en Markdown** (ici `projects/*.md`). Astro valide chaque fichier avec un schéma (voir `content.config.ts`). [Doc](https://docs.astro.build/en/guides/content-collections/) |
| `src/content.config.ts` | Déclare les « collections » de contenu et leur schéma (Zod). Une faute dans un `.md` fait échouer le build : c'est voulu. |
| `src/data/` | Données en JSON (profil, expériences, formations, compétences). Importées directement dans les pages avec `import`. Ce n'est pas une collection : pas de schéma, pas de page propre. |
| `src/assets/` | Images traitées par Astro (redimensionnées, converties en WebP/AVIF, avec dimensions calculées) via le composant `<Image />`. |
| `src/styles/` | CSS global (ici `global.css`, qui charge Tailwind). |
| `src/lib/` | Fonctions utilitaires partagées (formatage de dates, tri des projets). Convention, pas une règle d'Astro. |

## Dossiers hors `src/`

| Dossier | Rôle |
|---|---|
| `public/` | Fichiers servis tels quels, sans traitement (favicon, CV en PDF). Une image ici n'est **pas** optimisée : pour les images du site, utiliser `src/assets/`. |
| `docs/` | Notre documentation de travail (spec, plans, rapports, ce guide). Pas servi par le site. |
| `design-explorations/` | Les 3 maquettes HTML statiques de la phase design. Hors build, gardées pour référence. |
| `dist/` | (créé par `pnpm build`) Le site final, en HTML/CSS/JS statiques, prêt à héberger. Jamais édité à la main. |
| `.astro/` | (généré) Types et cache d'Astro. Jamais édité à la main. |

## Idée centrale d'Astro

Astro génère du **HTML statique** au build : le code entre `---` en haut d'un `.astro` s'exécute une fois, sur votre machine, et ne part pas au navigateur. On n'envoie du JavaScript que là où on l'écrit explicitement dans une balise `<script>`. C'est pour ça que ces sites sont rapides.

---

## Où se trouve quoi dans ce site

| Fichier | Rôle |
|---|---|
| `src/pages/index.astro` | La page d'accueil (`/`). Elle assemble les sections. |
| `src/pages/projets/[slug].astro` | Une page par projet (`/projets/sonde/`…). Les crochets `[slug]` signifient « segment dynamique » : Astro génère une page par valeur renvoyée par `getStaticPaths()`. |
| `src/pages/404.astro` | Page affichée pour une adresse inconnue. |
| `src/layouts/Layout.astro` | Le `<html>` et le `<head>` (titre, polices, favicon) autour de toute page. |
| `src/layouts/Shell.astro` | Le cadre « terminal » : arborescence à gauche, barre de commande, barre d'état en bas. Il enveloppe `Layout.astro`. |
| `src/components/Tree.astro` | L'arborescence latérale, qui sert de navigation. |
| `src/components/Hero.astro`, `ExperienceLog.astro`, `ProjectsSection.astro`, `Skills.astro`, `Contact.astro` | Une section de l'accueil chacun. |
| `src/components/ProjectCard.astro` | Une carte de projet du carrousel : image, titre, résumé, chiffre clé, stack. |
| `src/components/ImageSlot.astro` | Affiche l'image d'un projet, ou un emplacement « capture à venir » s'il n'y en a pas. |
| `src/lib/content.ts` | Lit les données et la collection `projects`, et contient les petites fonctions partagées. |
| `src/scripts/scroll-spy.ts` | Le seul JavaScript envoyé au navigateur : il fait suivre la lecture par l'arborescence. |
| `src/styles/global.css` | Tout le CSS (couleurs, mise en page). Un seul fichier est un choix assumé pour un site de cette taille ; sur un gros site, on mettrait le CSS de chaque composant dans sa balise `<style>`. |

## Ajouter une capture à un projet

1. Déposer l'image dans `src/assets/projects/<slug>/cover.png`.
2. Dans `src/content/projects/<slug>.md`, ajouter au frontmatter :
   ```yaml
   cover: ../../assets/projects/<slug>/cover.png
   coverAlt: "Description de ce que montre l'image"
   ```
3. Pour des captures supplémentaires, les lister dans `screenshots:` (même chemin relatif).

L'emplacement « capture à venir » disparaît tout seul dès que `cover` est renseigné.

## Ajouter un projet

Créer `src/content/projects/<slug>.md`. Les champs du frontmatter sont ceux du schéma de `src/content.config.ts` (`title`, `summary`, `year`, `context`, `stack` obligatoires ; `featured`, `order`, `frame`, `cover`, `coverAlt`, `screenshots`, `links`, `status` facultatifs). Le nom du fichier devient l'adresse : `mon-projet.md` → `/projets/mon-projet/`. Un champ manquant ou mal typé fait échouer `pnpm build` avec un message qui nomme le fichier.

## Commandes

| Commande | Effet |
|---|---|
| `pnpm dev` ou `pnpm astro dev --background` | Serveur de développement avec rechargement automatique. |
| `pnpm build` | Génère le site statique dans `dist/`. |
| `pnpm preview` | Sert `dist/` comme en production (à lancer après un build). |

## Note : `sharp`

Astro 7 n'embarque plus `sharp`, la bibliothèque qui redimensionne les images. Elle est déclarée en dépendance : sans elle, `pnpm build` échoue avec `MissingSharp`.

## Thème clair / sombre

Les couleurs sont des variables CSS (`:root` dans `src/styles/global.css`). Un second jeu de valeurs s'applique en mode sombre : soit automatiquement (réglage du système, `prefers-color-scheme`), soit forcé par le bouton `theme --auto|light|dark` en haut de page (`src/scripts/theme-toggle.ts`, choix mémorisé dans le navigateur). Un petit script dans `Layout.astro` applique le thème mémorisé avant l'affichage, pour éviter un flash clair.

## Logos de la stack

La stack d'un projet est la liste `stack:` de sa fiche (`src/content/projects/<slug>.md`). Sur l'accueil, elle s'affiche en texte. Sur la page du projet, une section `stack/` montre un gros logo monochrome par techno (`src/components/TechGrid.astro`).

Chaque nom est associé au fichier `src/assets/tech/<nom normalisé>.svg` (minuscules, sans espace ni ponctuation : « Tailwind CSS » → `tailwindcss.svg`) par `src/lib/tech.ts`. Pour ajouter un logo, déposer le SVG dans `src/assets/tech/` avec le bon nom.

Les logos viennent de Simple Icons (licence CC0) : ils n'ont qu'un seul tracé, que le CSS recolore avec la couleur du texte (noir en thème clair, blanc en thème sombre) grâce à la propriété `mask`. Une techno sans logo (« API REST ») s'affiche en grand texte dans sa tuile.

## Agrandir une capture

Sur la page d'un projet, un clic sur une capture l'ouvre en grand dans une fenêtre (`<dialog>` natif du navigateur, piloté par `src/scripts/lightbox.ts`). On passe d'une image à l'autre avec les flèches du clavier, et `Échap` ferme la fenêtre. Les images de la galerie sont décrites dans la fiche du projet : `coverAlt` et `coverCaption` pour la première, `screenshotAlts` et `screenshotCaptions` pour les suivantes (une ligne par image, dans le même ordre que `screenshots:`).

## Effets de mouvement

Tous les effets sont dans le bloc « mouvement » de `src/styles/global.css`, sous `@media (prefers-reduced-motion: no-preference)` : un visiteur qui demande moins d'animations ne voit rien bouger. Trois ingrédients :

- **Transition entre pages** : la règle CSS `@view-transition { navigation: auto; }` fait fondre une page dans l'autre. L'arborescence et la barre d'état gardent un `view-transition-name`, donc elles restent fixes. Aucun JavaScript n'est nécessaire.
- **Apparition au défilement** : `src/scripts/reveal.ts` utilise `IntersectionObserver` pour ajouter la classe `is-in` à un bloc quand il entre à l'écran. Le CSS fait le reste (opacité et léger décalage). Sans JavaScript, tout reste visible.
- **Survols** : de simples `transition` CSS sur les liens, les lignes de projets et les captures.

## Écran de chargement « AM »

Un petit script dans `<head>` (`Layout.astro`) ajoute la classe `is-loading` sur `<html>` avant le premier affichage, mais seulement si la session n'a pas déjà vu l'écran et si le visiteur n'a pas demandé « moins d'animations ». Le bloc `.loader` (dans le `<body>`) est invisible sans cette classe. `src/scripts/loader.ts` le fait disparaître en fondu après 1,5 s au minimum, quand la page est chargée, avec un plafond de 4 s, et mémorise le passage dans `sessionStorage` : on ne le revoit pas en naviguant, ni à chaque rechargement dans le même onglet. Pour le tester à nouveau, fermer l'onglet ou vider le stockage de session.

## Carrousel des projets

Les projets de l'accueil défilent dans un carrousel de cartes, comme sur l'ancien portfolio : trois cartes visibles sur ordinateur, deux sur tablette, une sur mobile. Tous les projets y sont, dans l'ordre du champ `order` des fiches : Respire, Marketplace, Gustichef, puis le reste. Il n'y a pas de bouton pour « déplier » d'autres projets. Le défilement horizontal est natif (`scroll-snap`) et fonctionne sans JavaScript ; `src/scripts/carousel.ts` ajoute les boutons précédent et suivant, la barre de progression, le compteur et les flèches du clavier. Le chiffre clé d'une carte est le premier élément du champ `figures` de la fiche, à ne remplir qu'avec des faits tirés des dossiers.

Le carrousel avance aussi tout seul, d'une carte toutes les 5,5 secondes (constante `AUTOPLAY_MS` en haut de `src/scripts/carousel.ts`). Il s'arrête quand la souris le survole, quand le focus clavier est dedans, quand l'onglet est caché ou que le carrousel n'est pas à l'écran, et pendant 5,5 secondes après toute action du visiteur (clic, glisser, molette, clavier). Un bouton « pause / lecture » permet de le couper pour de bon, et rien ne bouge pour un visiteur qui demande « moins d'animations ». Au bout de la piste, il revient à la première carte.

## Ordre de la page projet

`src/pages/projets/[slug].astro` assemble la page dans cet ordre : en-tête (titre, résumé, cadre, boutons issus de `links`), puis les captures, puis le texte de la fiche (le Markdown, rendu par `<Content />`), puis la stack, puis la pagination vers le projet précédent et suivant. Les captures viennent en premier pour qu'on voie le projet avant de le lire.

## Mettre en ligne un projet HTML / CSS / JS

Un site statique (HTML, CSS, JS) n'a pas besoin d'Astro : on le dépose tel quel dans `public/demos/<slug>/` (par exemple `public/demos/airbnb/index.html`). Astro copie tout le contenu de `public/` sans le toucher, donc le projet devient accessible à l'adresse `/demos/airbnb/`.

1. **Copier le dossier du projet** dans `public/demos/<slug>/`, avec `index.html` à la racine de ce dossier. Le `<slug>` est le nom de la fiche (`white-hat`, `airbnb`, `cybersim`, `echoes`).
2. **Nettoyer** : supprimer `.DS_Store`, les fichiers `._*` (créés par macOS), `.git/`, `.vscode/` et `node_modules/`.
3. **Chemins relatifs** : à l'intérieur du projet, écrire `img/logo.png` et non `/img/logo.png`. Un chemin qui commence par `/` pointe vers la racine du portfolio et casse l'image.
4. **Lier la fiche** : dans `src/content/projects/<slug>.md`, ajouter au frontmatter `links:` puis `live: "/demos/<slug>/index.html"`. Le bouton « voir le projet en ligne ↗ » apparaît sur la page du projet.
5. **Vérifier** avec `pnpm dev`, en ouvrant `http://localhost:4321/demos/<slug>/index.html` (avec `index.html` : le serveur de développement ne le devine pas, contrairement à un hébergeur).

Les fichiers de `public/` ne sont ni optimisés ni redimensionnés : compresser les grosses images avant de les copier.

« En ligne » veut dire que le portfolio entier est hébergé (Netlify, Vercel, GitHub Pages…) : le dossier `dist/` créé par `pnpm build` contient alors le portfolio et les projets ensemble.

Ce qui a été fait pour White Hat, Airbnb et Echoes : copie depuis `Documents/dev/MDS/B2` sans les fichiers inutiles, correction d'un chemin absolu (Airbnb), accents mis en forme composée (Echoes : le même `é` peut s'écrire de deux façons, macOS accepte les deux, Windows et les hébergeurs non), images d'Echoes ramenées de 36 à 4 Mo. Le champ `links.live` de la fiche accepte un chemin du site (`/demos/airbnb/`) ou une adresse complète.
