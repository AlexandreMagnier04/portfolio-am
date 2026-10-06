---
title: "Marketplace pour unions commerciales"
summary: "Une plateforme où chaque commerçant crée sa vitrine numérique, avec l'aide de l'IA."
year: 2025
context: entreprise
featured: true
order: 2
frame: "Stage · La Marmite Digitale · 04/2025 → 06/2025"
stack: ["Python", "Django", "OpenStreetMap", "ChatGPT", "API REST"]
cover: ../../assets/projects/marketplace-marmite/cover.png
coverAlt: "Accueil de la marketplace de La Marmite Digitale : menu, barre de recherche, vitrines des commerçants et produits des vendeurs"
coverCaption: "accueil"
screenshots:
  - ../../assets/projects/marketplace-marmite/vitrine.png
  - ../../assets/projects/marketplace-marmite/formulaire.png
screenshotAlts:
  - "Page d'une vitrine : adresse, carte interactive avec un marqueur et horaires d'ouverture jour par jour"
  - "Formulaire de création d'une vitrine : nom et photo du propriétaire, coordonnées, description, catégories et tags"
screenshotCaptions:
  - "page vitrine"
  - "création de vitrine"
---

## Contexte

La Marmite Digitale, agence de webmarketing, prépare une marketplace pour des unions commerciales : chaque commerçant crée sa vitrine numérique et les clients réservent en clic & collect. Le back-office Django avait été conçu par quatre étudiants. J'ai repris le projet pour développer le front, seul, à partir de la maquette Figma, en me formant à Django en quelques jours. C'est un prototype, avant un déploiement test à Aubigny-en-Artois.

## Ce que j'ai fait

- **Formulaire de vitrine** : adresse reliée à une carte interactive (OpenStreetMap), horaires jour par jour, champs préremplis à la modification.
- **Assistance par IA** : ChatGPT reformule et enrichit la description de la boutique à partir de ce que saisit le commerçant.
- **Page vitrine** : bannière, carrousel de produits, carte, horaires et informations du propriétaire.
- **Navigation** : recherche avec suggestions, liste des vitrines avec tri et pagination, grille de produits.

## Ce que j'ai appris

Python et Django, en reprenant le code d'autres développeurs sans mettre le projet en péril, et l'intégration d'API externes.
