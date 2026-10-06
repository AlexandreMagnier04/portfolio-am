---
title: "Gustichef"
summary: "Une plateforme qui met en relation des chefs à domicile et des particuliers."
year: 2026
context: ecole
featured: true
order: 3
frame: "Projet d'école · MyDigitalSchool"
links:
  live: "https://212.227.190.62.nip.io/"
stack: ["SvelteKit", "TypeScript", "Tailwind CSS", "PostgreSQL", "Drizzle", "Better Auth", "Google OAuth", "Zod", "Stripe", "Brevo", "MinIO", "Docker", "Caddy", "GitHub", "Playwright"]
cover: ../../assets/projects/gustichef/cover.png
coverAlt: "Accueil de Gustichef sur mobile : onglets Découvrir et Demandes, catégories (pâtisserie, chef à domicile, vegan, nutrition), filtres par ville et par prix, et la publication d'un chef"
coverCaption: "accueil · mobile"
screenshots:
  - ../../assets/projects/gustichef/demandes.png
  - ../../assets/projects/gustichef/messagerie.png
screenshotAlts:
  - "Onglet Demandes de Gustichef sur mobile : une demande d'anniversaire avec sa date, son heure, le nombre de convives, sa ville et un bouton pour y répondre"
  - "Messagerie de Gustichef sur mobile : conversation entre un client et un chef, avec un menu proposé et la confirmation de la réservation"
screenshotCaptions:
  - "demandes · mobile"
  - "messagerie · mobile"
---

## Contexte

Projet de groupe de troisième année (My Digital Project), avec trois autres profils : webmarketing, création numérique et webdesign. J'en suis le développeur. Gustichef relie des chefs à domicile et des particuliers, avec l'ergonomie d'un réseau social et l'efficacité d'une place de marché. Le produit minimum devait être livré en trois mois.

## Ce que j'ai fait

- **Architecture** : application en couches, sans aucune logique serveur côté client, et chaque entrée validée par un schéma Zod.
- **Fonctionnalités** : comptes par e-mail ou Google, profils chef et client, publications, menus avec galerie d'images.
- **Mise en relation** : demandes, réponses du chef, messagerie en temps réel, et réservation avec empreinte bancaire Stripe.
- **Tests** : 42 tests unitaires, 52 d'intégration et des tests Playwright. Ils ont révélé qu'un chef pouvait modifier le menu d'un autre : je l'ai corrigé par une vérification de propriété.
- **Déploiement** : Docker, pipeline GitHub Actions, serveur sécurisé (clé SSH, pare-feu, Fail2ban) et HTTPS automatique avec Caddy.

## Ce que j'ai appris

SvelteKit, Better Auth, le paiement avec Stripe et le temps réel, en travaillant au quotidien avec des profils design et marketing.
