# Refonte du portfolio d'Alexandre Magnier — Design

Date : 2026-10-05

## Objectif

Remplacer l'ancien portfolio statique (`../portfolio`, HTML/CSS/JS) par un site Astro 7 + Tailwind 4 dans `mywebsite`. Le site est une **vitrine personnelle polyvalente** (pas de cible unique : ni recrutement seul, ni freelance seul). Il doit avoir une vraie personnalité et ne pas ressembler à un site généré par IA.

## Sources de contenu

- **CV de référence** : `C:\Users\alexm\Desktop\CV-Alexandre Magnier.pdf` (titre « Software Engineer », alternance IESI 09/2025-06/2026, CDD front-end 08-09/2025, stages La Marmite Digitale et IESI, stack Node/TypeScript/Angular/NestJS, Prisma/Drizzle, Jest/Playwright).
- **Ancien portfolio** : `c:\Users\alexm\Documents\dev\perso\portfolio` — `index.html`, `projets.html`, `competences.html`, `details-projets/*.html` (8 projets), `img/` (captures, logos technos, photo), `img/cv-alexandre.pdf` (CV **périmé**, ne pas utiliser comme source de faits).
- En cas de divergence, le CV de référence l'emporte.

## Périmètre

- **Langue** : français uniquement.
- **Pages** : accueil (présentation, expériences, projets choisis, compétences, contact) ; une page par projet (`/projets/[slug]`) ; CV en téléchargement ; liens GitHub (`AlexandreMagnier04`) et LinkedIn (`alexandre-magnier`).
- **Hors périmètre** : blog, i18n, CMS, formulaire de contact avec backend.

## Architecture technique

- Astro 7, Tailwind 4 (déjà configurés), pas de framework JS de composants sauf besoin avéré.
- Contenu dans des **content collections** : `projects` (un fichier par projet, frontmatter typé : titre, résumé, technos, année, contexte, liens, images), plus des données structurées pour expériences, formations et compétences.
- Assets migrés depuis l'ancien site dans `src/assets`, optimisés via `astro:assets`. Les noms de fichiers douteux (`html"css.png`, `atelier copy.png`, `refont-arbnb-2.png`) sont renommés ; les doublons et assets inutilisés sont écartés.
- Corrections connues de l'ancien site à ne pas reporter : lien GitHub du footer en `your-username`, références à des images absentes (`airbnb-1.png`, `spotify-1.png`), `animations.css` référencé mais absent, copyright 2025.

## Contenu : trous à combler

L'ancien portfolio ne contient que des projets d'école et deux projets de stage 2024. Le CV mentionne des réalisations absentes :

- application de diffusion de contenus avec abonnement (IESI, 2025-2026) ;
- marketplace pour unions commerciales avec assistant IA (La Marmite Digitale) ;
- refonte responsive mobile-first (CDD IESI).

Règle : **ne rien inventer**. Ces projets sont créés avec les seuls faits du CV et marqués « à compléter » tant qu'Alexandre n'a pas fourni captures et détails. Le choix des projets d'école à conserver est tranché par Alexandre après l'inventaire.

## Processus (agents)

1. **Agent contenu** : lit tout l'ancien portfolio et le CV, produit les données structurées en français et un rapport des trous / incohérences / projets à arbitrer.
2. **Trois agents design en parallèle** : même contenu, une direction chacun (éditorial/typographique ; terminal assumé mais sobre ; graphique/brutaliste), chacun livre une maquette statique de l'accueil dans `design-explorations/<direction>/`. Contraintes anti-« look IA » communes : pas de dégradés violets/bleus, pas de verre dépoli, pas de cartes identiques en grille uniforme, pas d'icônes ou emojis de remplissage, pas de textes génériques. Typographie et palette choisies, justifiées en une phrase. Alexandre choisit ou mélange.
3. **Implémentation Astro** de la direction retenue (plan rédigé via writing-plans).
4. **Revue et vérification** : un agent relecteur applique la même liste anti-« look IA » ; `astro build` doit passer ; vérification visuelle du dev server (desktop + mobile) ; accessibilité de base (contrastes, focus, `alt`, `prefers-reduced-motion`).

## Critères de réussite

- Toutes les informations du site sont traçables au CV de référence ou à l'ancien portfolio.
- Le site build sans erreur et s'affiche correctement de 360 px à desktop.
- Aucun lien cassé, aucune image manquante.
- Alexandre valide la direction visuelle sur maquettes avant l'implémentation.

## Questions ouvertes

- Quels projets d'école conserver ? (après inventaire par l'agent contenu)
- Captures et détails des trois réalisations professionnelles récentes.
- Le site en ligne (alexandremagnier.com) diffère-t-il de `../portfolio` ?

## Direction retenue (2026-10-05)

Décisions d'Alexandre après comparaison des trois maquettes (`design-explorations/`) :

- **Direction :** « terminal » (`design-explorations/terminal/index.html`) : monospace Martian Mono, arborescence fixe à gauche, sections ouvertes par des commandes, compétences en `.yml`, barre d'état. Structure et interactions conservées.
- **Palette :** abandon du papier chaud/vermillon au profit du **bleu de la photo**. Fond de la photo : `#112343` (identique au bleu marine du CV). Proposition de départ, à valider par un contrôle de contraste AA à l'implémentation : encre `#112343`, papier `#F1F4F8`, gris `#4A5A75`, filets `#CBD3E0`, accent bleu `#2457D6`, barre d'état en `#112343` avec accent éclairci.
- **Projets :** afficher le **maximum de projets** (les 11 fiches de `src/content/projects/`), avec un **emplacement d'image prévu** pour chacun ; Alexandre fournira les captures plus tard. Un projet sans image affiche un emplacement sobre « capture à venir ». Les projets mis en avant (`featured`) sont présentés en grand, les autres en lignes compactes. Chaque projet a sa page `/projets/[slug]`.
- **Accroche :** Alexandre est **en recherche de poste**. Aucune date de fin d'alternance présentée comme « actuelle ».
- **Non affiché :** âge, ville de résidence, et « Hauts-de-France » (déduit, non confirmé).
- **Reste à confirmer :** année des projets d'école, stack des trois projets en entreprise, intitulé du diplôme, projet « Mr Doe », liens de démos.

## Mises à jour (2026-10-05, soir)

- Titre : « Développeur full stack » (remplace « Software Engineer »). La recherche de poste est mise en avant dans l'accroche (ligne en accent) et dans le contact.
- Accroche : diplôme, **« j'ai 26 ans »**, expérience concrète en entreprise, aisance avec Node.js (l'âge est désormais affiché, à mettre à jour à la main).
- Chaque projet affiche sa stack avec les logos des technos ; plus aucun « état » (« détails à venir ») nulle part.
- « Application de diffusion de contenus multimédias » devient **« Projet Respire »** (`respire.md`, URL `/projets/respire/`). Sa stack vient des dépendances du dépôt local `Documents/respire` : Angular, NestJS, TypeScript, Tailwind CSS, Prisma, MySQL, Docker, Jest, Playwright.
- Thème clair/sombre avec bouton.
