# Direction « éditorial »

## Principe
La page d'accueil est mise en page comme un magazine : une une avec le nom composé très grand, puis des rubriques numérotées (§ 01 à § 04) séparées par des filets. Le texte porte l'essentiel du design : échelle typographique, italiques, lettrine, citation en exergue, folios en petites capitales. L'image n'apparaît que là où elle documente un projet.

## Polices
- **Newsreader** (Google Fonts, variable avec tailles optiques) : titres géants, intertitres et texte courant. L'axe `opsz` donne des déliés fins en très grand corps et un texte robuste en petit corps.
- **Schibsted Grotesk** : folios, dates, légendes, libellés en capitales espacées. C'est une grotesque dessinée pour un groupe de presse, qui reste discrète à côté du serif.

## Palette
| Rôle | Couleur |
|---|---|
| Papier (fond) | `#F3EEE4` |
| Encre (texte) | `#1C1A17` |
| Encre douce (texte secondaire, 6,6:1) | `#5B544A` |
| Filet (décor seulement) | `#CBC1B0` |
| Accent vermillon (5,4:1) | `#B4321E` |

## 3 choix assumés
1. **Le nom fait le visuel du haut de page.** « Alexandre / *Magnier.* » occupe toute la largeur, sans bouton ni accroche générique. La photo, en noir et blanc, est traitée comme une illustration légendée et non comme un avatar.
2. **Une seule couleur, utilisée pour pointer.** Le vermillon sert aux numéros, aux types de contrat, à la lettrine, au point final du nom et à l'interaction. Rien d'autre n'est coloré.
3. **Projets en chemin de fer, pas en grille.** Un article principal (Sonde, avec image), une brève en colonne latérale, une citation tirée du contenu réel, puis une brève et un second article décalé. Les deux projets « à compléter » sont des brèves en texte seul, avec la mention « Détails à venir ».

Interaction signature : au survol ou au focus d'une expérience, un filet vermillon se trace sous la ligne (désactivé avec `prefers-reduced-motion`).

## 2 limites
1. **Beaucoup de texte.** Un visiteur pressé (recruteur non technique) doit lire pour comprendre ; il n'y a pas de repère visuel immédiat sur les technologies. La composition dépend aussi de la longueur des textes : un projet avec un long titre ou un résumé plus long déséquilibrera le chemin de fer.
2. **Fragile côté contenu et polices.** La mise en page asymétrique des projets est écrite pour 4 projets mis en avant ; en ajouter ou en retirer demande de reprendre les placements. Sans Google Fonts, le repli sur Georgia/Arial fait perdre une grande partie du caractère (tailles optiques, italique de Newsreader).
