---
title: "Sonde de supervision"
summary: "Une sonde qui relève la mémoire des postes, et une interface pour suivre ses alertes."
year: 2024
context: entreprise
featured: true
order: 4
frame: "Stage · IESI · 04/2024 → 06/2024"
stack: ["Python", "NestJS", "Angular", "TypeScript", "MongoDB", "API REST"]
cover: ../../assets/projects/sonde/cover.png
coverAlt: "Interface de la sonde : tableau de 34 alertes avec la machine, le type (RAM ou stockage), la date, la valeur, le statut OK ou Alert et le seuil de 80 %"
coverCaption: "tableau des alertes"
---

## Contexte

Pour les trois dernières semaines de mon stage, mon tuteur m'a confié seul une mission : une sonde installée sur les postes d'IESI pour relever la RAM et le stockage, et une interface pour suivre ses alertes.

## Ce que j'ai fait

- **La sonde (Python)** : toutes les minutes, elle envoie une alerte RAM et une alerte stockage en pourcentage, avec un seuil de 80 % réglable. Elle tourne grâce au planificateur de tâches de Windows.
- **Le back (NestJS)** : il reçoit les alertes de plusieurs sondes par une API REST, les stocke et les renvoie de la plus récente à la plus ancienne.
- **Le front (Angular)** : un tableau des alertes, avec un statut rouge « Alert » quand le seuil est dépassé et vert « OK » sinon.

## Ce que j'ai appris

À concevoir seul toute la chaîne, de la sonde à l'interface, et à découvrir la programmation orientée objet avec Python.
