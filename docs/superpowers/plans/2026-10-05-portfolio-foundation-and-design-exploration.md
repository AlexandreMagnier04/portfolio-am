# Portfolio — Fondation, contenu et exploration design : Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Poser le socle Astro (schémas de contenu, assets migrés), produire le contenu structuré à partir du CV et de l'ancien portfolio, puis générer trois maquettes de direction design comparables.

**Architecture:** Astro 7 + Tailwind 4 (déjà installés). Le contenu vit dans `src/content/` (collection `projects` en Markdown + données JSON pour expériences/formations/compétences/profil), validé par des schémas Zod. Les maquettes design sont des fichiers HTML statiques autonomes dans `design-explorations/<direction>/`, hors build Astro. L'implémentation finale de la direction retenue fait l'objet d'un **second plan** rédigé après le choix d'Alexandre (voir spec, étape 3).

**Tech Stack:** Astro 7.3, Tailwind 4.3, Zod (`astro/zod`), loaders `astro/loaders`, pnpm.

**Spec :** `docs/superpowers/specs/2026-10-05-portfolio-redesign-design.md`

**Remarque vérification :** il n'y a pas de framework de tests dans le projet et le dossier n'est pas un dépôt git. La vérification repose sur `astro check`/`astro build` (le schéma Zod fait échouer le build si le contenu est invalide) et sur des contrôles de fichiers. Pas d'étapes de commit.

---

## Structure des fichiers

| Fichier | Responsabilité |
|---|---|
| `src/content.config.ts` | Déclare la collection `projects` et le schéma Zod |
| `src/content/projects/*.md` | Un projet par fichier (frontmatter typé + corps Markdown) |
| `src/data/profile.json` | Identité, titre, accroche, contacts, liens |
| `src/data/experience.json` | Expériences professionnelles (source : CV) |
| `src/data/education.json` | Formations (source : CV) |
| `src/data/skills.json` | Compétences groupées (source : CV) |
| `src/assets/projects/<slug>/*.png` | Captures migrées et renommées |
| `src/assets/photo.png`, `src/assets/logos/*` | Photo et logos utiles migrés |
| `public/cv-alexandre-magnier.pdf` | CV de référence en téléchargement |
| `docs/superpowers/content-report.md` | Rapport de l'agent contenu : trous, incohérences, arbitrages |
| `design-explorations/<direction>/index.html` | Maquette statique de l'accueil, une par direction |
| `design-explorations/BRIEF.md` | Brief commun donné aux trois agents design |

---

### Task 1: Schéma de contenu et nettoyage du starter

**Files:**
- Create: `src/content.config.ts`
- Create: `src/data/` (dossier)
- Modify: `src/pages/index.astro`, `src/layouts/Layout.astro`
- Delete: `src/components/Welcome.astro`, `src/assets/astro.svg`, `src/assets/background.svg`

- [ ] **Step 1: Créer le schéma de la collection `projects`**

`src/content.config.ts` :

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      year: z.number().int(),
      context: z.enum(['entreprise', 'ecole', 'personnel']),
      status: z.enum(['complet', 'a-completer']).default('complet'),
      featured: z.boolean().default(false),
      order: z.number().int().default(100),
      stack: z.array(z.string()).min(1),
      cover: image().optional(),
      screenshots: z.array(image()).default([]),
      links: z
        .object({ repo: z.string().url().optional(), live: z.string().url().optional() })
        .default({}),
    }),
});

export const collections = { projects };
```

- [ ] **Step 2: Supprimer le starter**

Run (bash) :

```bash
cd "c:/Users/alexm/Documents/dev/perso/mywebsite"
rm src/components/Welcome.astro src/assets/astro.svg src/assets/background.svg
mkdir -p src/data src/content/projects src/assets/projects src/assets/logos
```

- [ ] **Step 3: Remplacer la page d'accueil et le layout par des coquilles minimales**

`src/layouts/Layout.astro` :

```astro
---
interface Props { title?: string; description?: string }
const { title = 'Alexandre Magnier', description = 'Portfolio d\'Alexandre Magnier, Software Engineer.' } = Astro.props;
import '../styles/global.css';
---
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

`src/pages/index.astro` :

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout>
  <main><h1>Alexandre Magnier</h1></main>
</Layout>
```

- [ ] **Step 4: Vérifier que le build passe**

Run: `pnpm astro build`
Expected: build terminé sans erreur. Un avertissement « collection `projects` vide » est acceptable à ce stade.

---

### Task 2: Migration des assets de l'ancien portfolio

**Files:**
- Create: `src/assets/projects/<slug>/…`, `src/assets/photo.png`, `src/assets/logos/…`, `public/cv-alexandre-magnier.pdf`

Correspondance (ancien → nouveau). Les slugs sont ceux des projets : `white-hat`, `airbnb`, `sonde`, `tickets-iesi`, `cybersim`, `echoes`, `films`, `spotify`.

- [ ] **Step 1: Copier et renommer les captures de projets**

Run (bash) :

```bash
cd "c:/Users/alexm/Documents/dev/perso/mywebsite"
OLD="../portfolio/img"; NEW="src/assets/projects"
mkdir -p $NEW/{white-hat,airbnb,sonde,tickets-iesi,cybersim,echoes,films,spotify}
cp "$OLD/projet-white-hat.png" $NEW/white-hat/cover.png
for i in 1 2 3 4; do cp "$OLD/whitehat-$i.png" $NEW/white-hat/shot-$i.png; done
cp "$OLD/refont-airbnb-1.png" $NEW/airbnb/cover.png
cp "$OLD/refont-airbnb-1.png" $NEW/airbnb/shot-1.png
cp "$OLD/refont-arbnb-2.png"  $NEW/airbnb/shot-2.png
cp "$OLD/sonde.png"           $NEW/sonde/cover.png
cp "$OLD/projet-sonde.png"    $NEW/sonde/shot-1.png
cp "$OLD/atelier.png"         $NEW/tickets-iesi/cover.png
cp "$OLD/cybersim-1.png"      $NEW/cybersim/cover.png
cp "$OLD/cybersim-2.png"      $NEW/cybersim/shot-1.png
for i in 1 2 3; do cp "$OLD/echoes-$i.png" $NEW/echoes/shot-$i.png; done
cp "$OLD/echoes-1.png"        $NEW/echoes/cover.png
cp "$OLD/film-1.png"          $NEW/films/cover.png
cp "$OLD/film-2.png"          $NEW/films/shot-1.png
for i in 1 2 3 4 5; do cp "$OLD/refont-spotify-$i.png" $NEW/spotify/shot-$i.png; done
cp "$OLD/refont-spotify-1.png" $NEW/spotify/cover.png
```

- [ ] **Step 2: Copier photo, logos de technos, CV**

```bash
cp "../portfolio/img/photo.png" src/assets/photo.png
cp "../portfolio/img/angular.jpg" src/assets/logos/angular.jpg
cp "../portfolio/img/nest.png"    src/assets/logos/nestjs.png
cp "../portfolio/img/js.png"      src/assets/logos/javascript.png
cp "../portfolio/img/ts.jpg"      src/assets/logos/typescript.jpg
cp "../portfolio/img/python.png"  src/assets/logos/python.png
cp "../portfolio/img/sql.png"     src/assets/logos/sql.png
cp "../portfolio/img/wordpress.png" src/assets/logos/wordpress.png
cp "C:/Users/alexm/Desktop/CV-Alexandre Magnier.pdf" public/cv-alexandre-magnier.pdf
```

- [ ] **Step 3: Vérifier le décompte**

Run: `find src/assets -type f | wc -l`
Expected: `33` (`white-hat` 5 + `airbnb` 3 + `sonde` 2 + `tickets-iesi` 1 + `cybersim` 2 + `echoes` 4 + `films` 2 + `spotify` 6 = 25 captures, + photo 1 + 7 logos). Si le décompte diffère, comparer avec les commandes ci-dessus et corriger avant de continuer.

Note : les logos ne sont conservés que s'ils servent la direction retenue ; l'agent relecteur de la phase finale supprime les assets non utilisés.

---

### Task 3: Agent contenu — extraction et rapport

**Files:**
- Create: `src/data/profile.json`, `src/data/experience.json`, `src/data/education.json`, `src/data/skills.json`
- Create: `src/content/projects/*.md` (8 projets d'école/stage + 3 projets pro récents)
- Create: `docs/superpowers/content-report.md`

- [ ] **Step 1: Lancer l'agent contenu**

Lancer un agent `general-purpose` avec exactement ce prompt :

```text
Tu prépares le contenu d'un portfolio (français) pour Alexandre Magnier dans
C:\Users\alexm\Documents\dev\perso\mywebsite. NE MODIFIE AUCUN AUTRE FICHIER que ceux listés plus bas.

Sources :
1. CV de référence (fait foi) : C:\Users\alexm\Desktop\CV-Alexandre Magnier.pdf
2. Ancien portfolio : C:\Users\alexm\Documents\dev\perso\portfolio
   (index.html, projets.html, competences.html, details-projets/*.html). Son img/cv-alexandre.pdf est PÉRIMÉ : ne l'utilise pas comme source de faits.
Les images déjà migrées sont dans src/assets/projects/<slug>/ (cover.png, shot-N.png).

Règles :
- N'invente AUCUN fait. Tout ce que tu écris doit venir du CV ou de l'ancien portfolio. Si un détail manque, écris-le dans le rapport, pas dans le contenu.
- Écris en français, ton sobre et concret, à la première personne quand c'est un texte de présentation. Pas de formules creuses (« passionné par l'innovation », « solutions sur-mesure »).
- Respecte le schéma de src/content.config.ts (lis-le d'abord). Les chemins d'images du frontmatter sont relatifs au fichier .md, par exemple ../../assets/projects/sonde/cover.png.

À produire :
A. src/data/profile.json : { name, title, tagline, location, mobility, email, phone, github, linkedin, cv, photo, age }  (valeurs du CV ; "cv": "/cv-alexandre-magnier.pdf")
B. src/data/experience.json : tableau trié du plus récent au plus ancien, chaque entrée { role, type, company, place, start, end, bullets[] } ; start/end au format "MM/AAAA". Reprends les puces du CV.
C. src/data/education.json : { degree, school, place, start, end, topics[] }.
D. src/data/skills.json : groupes du CV (Frameworks, Langages, Bases de données & ORM, Tests, DevOps & Outils, Notions) + { softSkills[], languages[], interests[] }.
E. src/content/projects/<slug>.md pour : white-hat, airbnb, sonde, tickets-iesi, cybersim, echoes, films, spotify (depuis l'ancien site) ET pour les trois réalisations du CV : diffusion-contenus-iesi (alternance IESI 2025-2026), marketplace-marmite (La Marmite Digitale 2025), refonte-responsive-iesi (CDD IESI 2025).
   - Les trois dernières ont status: a-completer, context: entreprise, pas de cover, et un corps qui ne reprend QUE les puces du CV.
   - sonde et tickets-iesi : le CV les rattache au stage IESI 04/2024-06/2024 ; context: entreprise.
   - featured: true pour au plus 4 projets (priorité aux projets en entreprise, puis aux plus aboutis).
   - Corps Markdown : brief, ce que j'ai fait, stack. Reprends le fond des pages détail de l'ancien site, réécrit proprement.
F. docs/superpowers/content-report.md avec : (1) trous de contenu par projet, (2) incohérences entre l'ancien site et le CV (dates, technos, intitulés), (3) projets d'école recommandés à garder ou retirer, avec une phrase de justification, (4) liste des assets migrés jamais référencés, (5) questions à poser à Alexandre.

Termine en lançant `pnpm astro build` depuis le dossier du projet et indique si le contenu est valide.
```

- [ ] **Step 2: Vérifier la validité du contenu**

Run: `pnpm astro build`
Expected: build sans erreur de validation Zod. Si une erreur apparaît, la corriger (frontmatter ou chemin d'image) avant de continuer.

- [ ] **Step 3: Contrôle de traçabilité**

Lire `docs/superpowers/content-report.md` et `src/data/experience.json`. Comparer chaque expérience au CV (dates, entreprises, puces). Toute entrée non traçable au CV est corrigée ou supprimée.

- [ ] **Step 4: Présenter le rapport à Alexandre**

Résumer le rapport (trous, projets d'école à garder/retirer, questions) et recueillir ses décisions. Appliquer ses arbitrages : supprimer les projets retirés (`.md` + dossier d'assets), ajuster `featured`.

---

### Task 4: Brief commun des agents design

**Files:**
- Create: `design-explorations/BRIEF.md`

- [ ] **Step 1: Écrire le brief**

`design-explorations/BRIEF.md` :

```markdown
# Brief — maquette d'accueil du portfolio d'Alexandre Magnier

## Ce que tu produis
UN fichier `design-explorations/<direction>/index.html` autonome (HTML + CSS dans le même fichier, JS minimal facultatif, polices via Google Fonts ou système). Il doit s'ouvrir en double-clic. Images : chemins relatifs vers `../../src/assets/…`.

## Contenu
Utilise le vrai contenu : `src/data/*.json` et `src/content/projects/*.md`. Aucun texte lorem ipsum, aucune donnée inventée. Les projets `status: a-completer` s'affichent avec une mention sobre « détails à venir ».

## Sections de l'accueil
Présentation (nom, titre, accroche, photo) · Expériences · Projets choisis (`featured`) · Compétences · Contact (email, téléphone, GitHub, LinkedIn, lien CV).

## Public
Vitrine polyvalente : recruteurs, équipes tech, clients, curieux. Personne n'est la cible unique.

## Interdits (le site ne doit pas « faire IA »)
- Dégradés violet/bleu, halos, orbes, grain décoratif gratuit.
- Verre dépoli (backdrop-blur) et cartes arrondies toutes identiques en grille 3 colonnes.
- Icônes ou emojis de remplissage, pastilles « badge » partout.
- Hero générique « Hi, I'm … » avec deux boutons centrés.
- Polices par défaut : Inter, Poppins, Space Grotesk, et en général tout ce qui est le premier choix évident.
- Textes creux : « passionné par l'innovation », « solutions sur-mesure », « du concept à la réalisation ».

## Exigences
- Choisis 1 ou 2 polices et une palette de 3 à 5 couleurs, et justifie le choix en une phrase en commentaire HTML en tête de fichier.
- Une composition qui n'est pas une pile de sections de même largeur : joue sur l'échelle, l'asymétrie, le rythme.
- Responsive de 360 px à 1440 px. Contrastes AA. `prefers-reduced-motion` respecté.
- Mouvement : au plus une interaction signature, sobre.
- Termine par un court `design-explorations/<direction>/NOTES.md` : principe de la direction, polices, palette, 3 choix assumés, 2 limites.
```

---

### Task 5: Trois agents design en parallèle

**Files:**
- Create: `design-explorations/editorial/index.html`, `NOTES.md`
- Create: `design-explorations/terminal/index.html`, `NOTES.md`
- Create: `design-explorations/graphique/index.html`, `NOTES.md`

- [ ] **Step 1: Lancer les trois agents dans le même message**

Trois appels `Agent` (`general-purpose`) simultanés. Le prompt de chacun est : « Lis d'abord `C:\Users\alexm\Documents\dev\perso\mywebsite\design-explorations\BRIEF.md`, puis réalise la direction ci-dessous. Charge le skill `frontend-design:frontend-design` avant d'écrire. Ne touche à rien en dehors de ton dossier. » suivi de la direction :

- **editorial** — « Éditorial / typographique : mise en page de magazine, typographie expressive à grande échelle, palette chaude et sobre (papier, encre, un seul accent), filets et numérotation, texte comme matière principale. »
- **terminal** — « Terminal assumé mais sobre : monospace, esprit éditeur de code et CLI traité avec retenue (pas de néons, pas de pluie de code, pas de faux fenêtres macOS), structure en arborescence/commandes, un seul accent de couleur. »
- **graphique** — « Graphique / brutaliste : contrastes forts, bordures épaisses, grille visible, aplats de couleurs franches, titres massifs, composition volontairement tendue mais lisible. »

- [ ] **Step 2: Vérifier que les livrables existent**

Run: `ls design-explorations/*/index.html design-explorations/*/NOTES.md`
Expected: 6 fichiers listés.

- [ ] **Step 3: Contrôle visuel**

Ouvrir chaque maquette via le serveur de dev :

```bash
astro dev --background
```

Les maquettes sont hors `src/pages`, donc les ouvrir en fichier local (`file:///C:/Users/alexm/Documents/dev/perso/mywebsite/design-explorations/<direction>/index.html`) ou les servir avec `npx serve design-explorations`. Pour chaque maquette, prendre une capture à 1440 px et à 390 px (outil navigateur disponible dans la session) et vérifier : images chargées, aucun débordement horizontal, contenu fidèle au CV.

- [ ] **Step 4: Relecture anti-« look IA »**

Pour chaque maquette, vérifier la liste « Interdits » du brief. Toute maquette qui en viole un point est renvoyée à son agent avec la liste des violations.

- [ ] **Step 5: Présenter les trois directions à Alexandre**

Donner pour chaque direction : chemin de la maquette, capture desktop/mobile, polices, palette, forces et limites (extraits de `NOTES.md`). Demander : choisir une direction, ou combiner des éléments (par exemple la typographie de l'une et la structure d'une autre).

---

### Task 6: Mise à jour de CLAUDE.md (et AGENTS.md)

**Files:**
- Modify: `CLAUDE.md` (`AGENTS.md` est un lien physique vers le même fichier : vérifier après édition que les deux ont le même contenu ; sinon copier `CLAUDE.md` sur `AGENTS.md`)

- [ ] **Step 1: Conserver les sections existantes**

Garder telles quelles les sections « Development » (serveur en arrière-plan : `astro dev --background`, `astro dev stop|status|logs`) et « Documentation » (liens docs Astro).

- [ ] **Step 2: Ajouter la section « Projet »**

Ajouter à la fin de `CLAUDE.md` :

```markdown
## Projet

Portfolio personnel d'Alexandre Magnier (Software Engineer), en français uniquement. Astro 7 + Tailwind 4, pnpm.

- Spec : `docs/superpowers/specs/2026-10-05-portfolio-redesign-design.md`. Plans : `docs/superpowers/plans/`.
- Source de vérité du contenu : le CV (`public/cv-alexandre-magnier.pdf`). Ne jamais inventer de fait (dates, technos, résultats) ; ce qui manque est marqué `status: a-completer`.
- Contenu : `src/data/*.json` (profil, expériences, formations, compétences) et `src/content/projects/*.md` (collection `projects`, schéma Zod dans `src/content.config.ts`). Un contenu invalide fait échouer `pnpm astro build`.
- Assets : `src/assets/` (via `astro:assets`). Pas de fichiers aux noms ambigus (espaces, guillemets).
- `design-explorations/` contient des maquettes statiques hors build, ne pas les importer dans `src/`.
- Ancien portfolio (référence, ne pas modifier) : `../portfolio`.

## Design

Le site ne doit pas ressembler à un site généré par IA. Interdits : dégradés violet/bleu, verre dépoli, grille de cartes identiques, icônes ou emojis de remplissage, hero générique centré avec deux boutons, polices par défaut (Inter, Poppins, Space Grotesk), textes creux. La direction visuelle retenue est consignée dans la spec (section « Direction retenue »).

## Vérification

Avant de dire qu'un travail est terminé : `pnpm astro build` passe, aucune image ni lien cassé, rendu vérifié de 360 px à desktop.
```

- [ ] **Step 3: Vérifier**

Run: `diff CLAUDE.md AGENTS.md && echo identiques`
Expected: `identiques`.

---

### Task 7: Clôture de ce plan

- [ ] **Step 1: Consigner la décision**

Ajouter à la fin de `docs/superpowers/specs/2026-10-05-portfolio-redesign-design.md` une section « Direction retenue » : direction choisie (ou mélange), polices, palette, décisions d'Alexandre sur les projets à garder.

- [ ] **Step 2: Arrêter le serveur de dev**

Run: `astro dev stop`

- [ ] **Step 3: Rédiger le plan 2**

Invoquer à nouveau `superpowers:writing-plans` pour écrire `docs/superpowers/plans/<date>-portfolio-implementation.md` : layouts, composants, pages d'accueil et `/projets/[slug]`, responsive, accessibilité, revue anti-« look IA », `astro build` final, suppression des assets non utilisés, et dernière mise à jour de `CLAUDE.md` (structure réelle des composants, commandes, conventions de la direction retenue). Ce plan est rédigé avec la direction retenue, donc avec du code concret.

---

## Auto-revue

- **CLAUDE.md :** demandé par Alexandre en cours de route, couvert par la Task 6 (et mise à jour finale dans le plan 2).
- **Couverture de la spec :** sources (Tasks 2-3), périmètre/schéma/collections (Task 1), correctifs de l'ancien site (le starter est remplacé, les liens/images cassés ne sont pas migrés ; la revue finale est dans le plan 2), trous de contenu sans invention (Task 3, règle explicite), processus agents contenu puis trois agents design (Tasks 3-5), validation de la direction avant implémentation (Task 5 step 5, Task 6). L'implémentation, la revue finale et la vérification responsive/accessibilité sont volontairement reportées au plan 2.
- **Cohérence :** slugs identiques dans Task 2 et Task 3 ; champs du schéma (Task 1) repris dans le prompt de l'agent contenu.
