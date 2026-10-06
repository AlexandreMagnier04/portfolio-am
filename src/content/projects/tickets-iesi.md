---
title: "Écran atelier en temps réel"
summary: "Un écran qui affiche en direct les tickets et les tâches des techniciens."
year: 2024
context: entreprise
featured: true
order: 5
frame: "Stage · IESI · 04/2024 → 06/2024"
stack: ["Angular", "NestJS", "TypeScript", "MongoDB", "Docker", "API REST"]
cover: ../../assets/projects/tickets-iesi/cover.png
coverAlt: "Écran atelier : colonnes des tickets et des tâches avec leurs compteurs ouverts, en cours, gelés et en retard"
coverCaption: "tickets et tâches"
---

## Contexte

IESI a développé Apollo, une plateforme où les clients envoient des tickets et où l'équipe crée des tâches. Pour mon premier projet de stage, j'ai conçu l'écran de l'atelier des techniciens, qui affiche ces tickets et ces tâches en direct, actualisés toutes les minutes.

## Ce que j'ai fait

J'ai développé le front en Angular, en binôme avec un autre stagiaire sur le back (NestJS).

- **Affichage** : tickets à gauche, tâches à droite, avec des compteurs par statut. Les éléments ouverts passent en premier, du plus ancien au plus récent.
- **Urgences** : une date passe en rouge à partir de deux jours de retard, pour que les techniciens repèrent ce qui presse.
- **Données** : tout vient de l'API REST, rien n'est écrit à la main. Développement avec des données fictives, puis vraies données à la mise en production.
- **Déploiement** : après trois semaines, mise en production sur l'écran de l'atelier avec Docker.

## Ce que j'ai appris

Angular et TypeScript, faire dialoguer un front et un back par une API, et ajuster le code après une mise en production.
