# Direction « graphique »

## Principe
Une planche d'imprimerie : la grille de 12 colonnes est visible (règle numérotée en tête, filets noirs de 4 px qui découpent chaque cellule), les sections sont des aplats de couleur franche et les titres sont étirés jusqu'à remplir la largeur. Le nom « MAGNIER » s'étire sur toute la page ; tout le reste se range dans des cases.

## Polices
- **Archivo** (variable, axes largeur 62–125 et graisse 400–900) : une seule famille qui fait les titres massifs en largeur étendue, les listes de compétences en version condensée et le texte courant en largeur normale.
- **IBM Plex Mono** : dates, numéros de section, légendes, stack. Elle sert à annoter la planche.

## Palette
| Rôle | Couleur |
|---|---|
| Encre (texte, filets, aplats sombres) | `#111111` |
| Papier (fond) | `#F2EFE6` |
| Jaune signal (titre, contact, CV) | `#FFD21F` |
| Bleu cobalt (photo, projet, séparateurs) | `#2340D8` |
| Blanc (expérience en cours, fond des captures) | `#FFFFFF` |

Toutes les combinaisons de texte passent le niveau AA : encre sur jaune ou papier, blanc sur cobalt (environ 8:1), papier sur encre.

## 3 choix assumés
1. **Le nom remplit toute la largeur.** Sa taille est calculée d'après la largeur de l'écran, de sorte que « MAGNIER » occupe toujours toute la page, de 360 à 1440 px. Le titre de poste vient ensuite, sur un aplat jaune.
2. **Les projets sont disposés en blocs de tailles inégales** (6/4 puis 4/6 colonnes), chacun avec sa couleur de fond. Les deux projets « détails à venir » restent des blocs de texte pleins, sans faux visuel, et sont signalés par une étiquette en mono.
3. **Une seule interaction, l'« ombre dure ».** Au survol ou au focus, les liens d'action (email, téléphone, GitHub, LinkedIn, CV) se décalent de 6 px et laissent apparaître une ombre noire nette. Avec `prefers-reduced-motion`, le déplacement est remplacé par un contour.

## 2 limites
- **Les captures d'écran jurent avec la planche.** Les captures (vert, rouge, violet des interfaces d'origine) sont pleines de couleurs qui entrent en concurrence avec la palette. Il faudrait les recadrer ou les passer en niveaux de gris dans le vrai site.
- **La page est dense et lourde de contraste.** Une personne qui lit longtemps (une équipe technique sur les expériences, par exemple) peut trouver les filets épais et les aplats fatigants. La direction mise sur l'impact plus que sur le confort de lecture prolongée.
