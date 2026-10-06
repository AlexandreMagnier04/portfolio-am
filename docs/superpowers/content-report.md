# Rapport de contenu : migration du portfolio

Date : 2026-10-05. Sources : CV `C:\Users\alexm\Desktop\CV-Alexandre Magnier.pdf` (fait foi) et ancien portfolio `../portfolio` (HTML uniquement ; `img/cv-alexandre.pdf` ignoré car périmé).

Fichiers produits : `src/data/{profile,experience,education,skills}.json`, 11 fichiers dans `src/content/projects/`. `pnpm astro build` passe ; les 11 entrées et 22 images sont synchronisées sans erreur de schéma.

## 1. Trous de contenu par projet

Valeurs de remplissage imposées par le schéma (à remplacer dès que l'info est connue) :

- **`year` des 6 projets d'école** (white-hat, airbnb, cybersim, echoes, films, spotify) : **2024 est une valeur provisoire**. Ni le CV ni l'ancien site ne datent ces projets ; on sait seulement qu'ils s'inscrivent dans le Bachelor Cycle Web et Multimédia (09/2023 – 06/2025).
- **`year` des projets en entreprise** : année de début de la mission (2024 pour sonde et tickets-iesi, 2025 pour les trois autres). La diffusion de contenus court jusqu'en 06/2026.
- **`stack` de diffusion-contenus-iesi** : `["À préciser"]`. Le CV ne cite aucune techno pour ce projet, or le schéma exige au moins un élément. Le front devra masquer ce tag ou il faudra le remplacer.
- **`stack` de marketplace-marmite** : `["API REST", "IA"]`, les seuls éléments techniques cités dans les puces du CV. Aucun framework ni modèle d'IA n'est indiqué.

Par projet :

| Projet | Manque |
|---|---|
| diffusion-contenus-iesi | Stack, type de contenus diffusés, mode d'abonnement (paiement ?), captures, lien, nom du produit, statut (en production ?) |
| marketplace-marmite | Stack front/back, outil ou modèle d'IA utilisé, nom de la marketplace, captures, lien, partie du backend refondue |
| refonte-responsive-iesi | Quels sites ont été refaits, captures avant/après, autres technos que Tailwind |
| sonde | Mode de déploiement de la sonde, nombre de postes, rôle exact de chaque techno ; une seule capture |
| tickets-iesi | Une seule image (cover) ; absent de `projets.html` dans l'ancien site (présent seulement sur l'accueil) ; mécanisme du « temps réel » non précisé |
| white-hat | Rôle personnel dans le groupe, taille du groupe, année |
| airbnb | Rôle personnel dans l'équipe dev (quelles fonctionnalités Alexandre a codées), année |
| cybersim | Rôle exact (tutorat ? conception seule ?), comment la « gestion des utilisateurs » est faite avec seulement HTML/CSS/JS, année |
| echoes | Seul ou en équipe (« j'ai participé »), part personnelle, année |
| films | Seul ou en équipe, année |
| spotify | Seul ou en équipe, année, détails du système de niveaux |

Liens : aucun lien `repo` ni `live` n'a été renseigné. L'ancien site pointait vers des démos hébergées sur `https://www.alexandremagnier.com/details-projets/projets/{projet-white-hat,refont-airbnb,cybersim,echoes}/` ; il faut vérifier qu'elles sont toujours en ligne avant de les reprendre. Les autres boutons « Voir le projet » avaient un `href` vide. Aucun dépôt GitHub par projet n'était lié.

## 2. Incohérences entre l'ancien site et le CV

- **Âge** : 24 ans sur l'ancien site, 26 ans sur le CV. `profile.json` reprend 26 ; cette valeur se périme, il vaudrait mieux la calculer à partir d'une date de naissance ou la retirer.
- **Formation** : l'ancien site indique « Bachelor Cycle Web et Multimédia, 2023 – Actuellement » et cite aussi « Études de commerce 2018 – 2023 » et un « Bac ES 2018 (Lycée Fernand Darchicourt) ». Le CV donne le Bachelor Cycle Web et Multimédia 09/2023 – 06/2025 puis le Bachelor Développeur web 09/2025 – 07/2026, sans commerce ni bac. Seul le CV a été repris.
- **Intitulé du diplôme** : le CV dit « Diplômé Concepteur Développeur d'Applications » (titre RNCP probable) alors que la formation est listée comme « Bachelor Développeur web ». Il faudrait confirmer le lien entre les deux et que le diplôme est bien obtenu (fin prévue 07/2026).
- **Titre** : « Développeur Web » sur l'ancien site, « Software Engineer » sur le CV. Le CV a été repris.
- **Cybersim** : `projets.html` le range dans la catégorie « Stage IESI » (`data-category="stage"`), mais la page détail et l'accueil le décrivent comme un tutorat pour les premières années à l'école. Il a été classé `ecole`.
- **Sonde / tickets** : l'ancien site cite Angular + NestJS (+ Python pour la sonde) ; le CV ajoute API REST et Docker (tickets) mais ne cite pas ces frameworks. Les deux sources ont été cumulées dans `stack`.
- **Compétences** : l'ancien site cite SQL et GitHub. Le CV cite MySQL/PostgreSQL et Git, et ajoute PHP, Prisma, Drizzle, Jest, Playwright, Tailwind, Docker, C#, Flutter et Svelte. Laravel (Spotify, Films) n'apparaît pas dans le CV, alors que PHP y figure.
- **Soft skills** : l'ancien site liste « Aisance relationnelle » et « Travail en équipe » ; le CV liste « Organisé », « Réactif » et « Leadership ». Seul le CV a été repris.
- **Code postal de Ronchin** : le CV indique « Ronchin (59710) », qui est le code de Mérignies (Ronchin = 59790). `experience.json` affiche « Ronchin » sans code postal.
- **Lien GitHub** : le pied de page de l'ancien `index.html` pointait vers `https://github.com/your-username` (placeholder). Le CV donne `AlexandreMagnier04`, qui a été repris.
- **Localisation** : le CV n'indique pas de ville de résidence, seulement « Mobile sur Lille, Douai, Lens et Arras ». `profile.location` vaut « Hauts-de-France » (région de ces quatre villes) : c'est à confirmer.

## 3. Projets d'école : garder ou retirer

- **Garder – Airbnb** : un vrai travail d'équipe (8 personnes, collaboration avec des designers) avec des fonctionnalités d'accessibilité concrètes.
- **Garder – Spotify** : c'est le seul projet d'école côté back-end (Laravel) avec une logique métier (points, niveaux), et il a 5 captures.
- **Garder – Films** : intégration d'une API externe (TMDB), cohérente avec le profil « API » du CV ; à garder si une capture plus parlante est disponible.
- **À discuter – Cybersim** : le sujet (simulations de cyberattaques) est intéressant, mais la classification est incohérente et la part réelle d'Alexandre reste floue.
- **Retirer – White Hat** : c'est un exercice d'initiation HTML/CSS qui dessert un profil « Software Engineer » doté de deux ans d'expérience en entreprise.
- **Retirer – Echoes** : HTML/CSS/JS sans contribution personnelle identifiable (« j'ai participé »), et il fait doublon avec les autres sites vitrines.

## 4. Assets migrés jamais référencés

- `src/assets/projects/airbnb/shot-1.png` : doublon exact de `cover.png` (même hash MD5).
- `src/assets/projects/echoes/shot-1.png` : doublon exact de `cover.png`.
- `src/assets/projects/spotify/shot-1.png` : doublon exact de `cover.png`.
- `src/assets/photo.png` : non référencée par le contenu Markdown. `profile.json` indique `"photo": "../assets/photo.png"` (chemin relatif au JSON, à importer explicitement dans le composant).
- `src/assets/logos/*` (angular, nestjs, javascript, typescript, python, sql, wordpress) : non référencés par le contenu. `skills.json` ne contient pas de chemins de logos. Le logo `sql.png` ne correspond à aucune compétence du CV telle quelle (MySQL/PostgreSQL).

Pour information, non migrés : le projet « Mr Doe » de l'ancien site (`projet-mr-doe.png`, `logo mr doe.png`, cité comme « projet précédent » de l'écran atelier) et des captures `maud-1..5.png` sans page associée.

## 5. Questions à poser à Alexandre

1. Quelle stack pour l'application de diffusion de contenus (front, back, BDD, paiement, hébergement) ? Peut-on montrer des captures ou un lien ?
2. Marketplace La Marmite Digitale : quelle stack, quel service d'IA, quel nom de produit ? Le projet est-il public ?
3. Refonte responsive IESI : quels sites ? Des captures avant/après sont-elles possibles ?
4. En quelle année (et quel semestre) ont été faits White Hat, Airbnb, Cybersim, Echoes, Films et Spotify ?
5. Pour chaque projet d'école : seul ou en équipe, et quelle a été ta part exacte ?
6. Cybersim : projet d'école ou réalisé pendant le stage IESI ?
7. Les démos sur alexandremagnier.com sont-elles toujours en ligne ? As-tu des dépôts GitHub publics à lier ?
8. Le titre « Concepteur Développeur d'Applications » est-il obtenu (date) ? Correspond-il au Bachelor Développeur web ?
9. L'alternance IESI (fin 06/2026) est terminée : quelle est ta situation actuelle (recherche de poste, embauche) pour l'accroche ?
10. Faut-il afficher l'âge ? Quelle localisation afficher (ville de résidence ou zone de mobilité) ?
11. Projet « Mr Doe » : à intégrer ou à abandonner ?
12. Featured actuels : diffusion-contenus-iesi, marketplace-marmite, sonde, tickets-iesi. Les deux premiers n'ont ni image ni stack précise : ce choix te convient-il ?
