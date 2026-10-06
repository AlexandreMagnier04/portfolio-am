---
title: "Respire"
summary: "Une application web d'abonnement à des contenus de bien-être : PDF, vidéos et audios."
year: 2025
context: entreprise
featured: true
order: 1
frame: "Alternance · IESI · 09/2025 → 06/2026"
links:
  live: "https://vm-alex.hex-it.ovh/"
figures:
  - value: "19 semaines"
    label: "de la conception à la mise en production"
  - value: "81 %"
    label: "de couverture de tests"
  - value: "5"
    label: "services en production"
stack: ["Angular", "NestJS", "TypeScript", "Tailwind CSS", "Prisma", "MySQL", "MinIO", "Docker", "Gitea", "Jest", "Playwright"]
cover: ../../assets/projects/respire/cover.png
coverAlt: "Accueil du front-office de Respire sur ordinateur : la catégorie Yoga, avec un document PDF et une vidéo"
coverCaption: "front-office · bureau"
screenshots:
  - ../../assets/projects/respire/mobile.png
  - ../../assets/projects/respire/back-office.png
  - ../../assets/projects/respire/maquette.png
screenshotAlts:
  - "Accueil du front-office de Respire sur mobile, avec les catégories Yoga, Relaxation, Nutrition bien-être et Addiction"
  - "Back-office de Respire : menu d'administration et liste des abonnements avec la formule, les dates et le statut"
  - "Maquette finale de la page d'accueil de Respire, en version mobile et ordinateur"
screenshotCaptions:
  - "front-office · mobile"
  - "back-office · abonnements"
  - "maquette de l'accueil"
---

## Contexte

Mission de mon alternance chez IESI, pour l'une des gérantes, qui anime des séances de relaxation aux Ateliers du Bien-Être. Pour que ses élèves pratiquent chez eux, elle voulait une plateforme d'abonnement à ses médias (audio, vidéo, PDF), en web mobile-first, avec deux formules : Évaluation (deux semaines) et Premium (un mois). Trois livrables : un front-office, un back-office et une API REST commune. L'application est en production.

## Comment je me suis organisé

J'ai mené le projet seul pendant 19 semaines. Comme Scrum repose sur des sprints d'équipe, j'ai choisi le Kanban, complété par la priorisation MoSCoW et des points d'étape réguliers avec mon responsable.

- **Kanban dans Notion** : chaque tâche a un statut et des dates de début et de fin, ce qui me permet de justifier le planning réel.
- **MoSCoW** : l'indispensable d'abord (authentification, droits par rôle, médias, abonnements). Le paiement en ligne, les favoris et les notifications push sont écartés de la première version.
- **Definition of Done** : une fonctionnalité n'est terminée que si le lint et les tests passent, les entrées sont validées, les droits appliqués et l'interface vérifiée en responsive.

## Ce que j'ai fait

- **Conception** : personas, user stories, Merise et UML, puis maquettes.
- **Choix techniques argumentés** : NestJS et Angular, pour leur cohérence TypeScript et parce qu'IESI utilise déjà Node.js ; Prisma et MySQL ; architecture 3-tiers avec un seul back pour deux fronts.
- **Abonnements** : chevauchement interdit, expiration automatique à la date de fin.
- **Médias** : streaming sécurisé depuis MinIO avec des URL signées temporaires, aucun fichier accessible sans passer par l'API.
- **Sécurité** : JWT dans des cookies HttpOnly, Secure et SameSite Strict, mots de passe hachés avec bcrypt, droits par rôle appliqués par des guards NestJS, et une veille OWASP testée sur deux risques du Top 10.
- **Tests et déploiement** : 81 % de couverture avec Jest, tests de bout en bout avec Playwright, Docker, pipeline CI/CD avec Gitea Actions et mise en production sur un serveur privé virtuel avec Portainer.

## Ce que j'ai appris

Le streaming de fichiers, le cycle complet d'authentification JWT et une chaîne de déploiement montée seul de A à Z. La suite prévue : paiement en ligne avec Stripe, notifications push et conformité RGPD complète.
