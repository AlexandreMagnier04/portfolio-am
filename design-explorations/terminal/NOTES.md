# Direction « terminal »

**Principe.** Le portfolio se lit comme un dépôt ouvert dans un éditeur sobre : une arborescence fixe à gauche (`README.md`, `experiences/`, `projets/`, `competences.yml`, `contact`) sert de plan, chaque section s'ouvre par la commande qui l'affiche (`$ ls -lt experiences/`, `$ cat competences.yml`…). Le registre CLI structure la page, il ne la décore pas : thème clair papier/encre, ni néon, ni fausse fenêtre, ni curseur qui clignote.

**Police.** Martian Mono seule (Google Fonts, variable). La hiérarchie passe par son axe de largeur : 112,5 et graisse 760 pour le nom, 100 pour les titres, 75–87,5 en graisse légère pour le texte courant et les métadonnées.

**Palette.**
- `#F3F0E8` papier (fond)
- `#1A1A17` encre (texte, filets forts, ligne d'état)
- `#5C5A52` gris (commentaires, métadonnées), 5,9:1 sur le fond
- `#D6D1C4` filets
- `#B23C1A` vermillon, seul accent (prompt `$`, élément actif, survol, focus, « détails à venir »), environ 5:1 sur le fond

## 3 choix assumés
1. **Une seule famille, monospace partout**, y compris pour le corps de texte. L'axe `wdth` remplace la deuxième police.
2. **Interaction signature unique** : l'arborescence suit la lecture (un trait vermillon glisse vers la section en cours, la ligne d'état en bas affiche le chemin et la position en %). Sans animation si `prefers-reduced-motion`.
3. **Rythme des projets irrégulier** : les deux projets sans visuel sont deux colonnes de largeurs inégales et décalées. Viennent ensuite deux captures alternées à gauche puis à droite, chacune avec un cartouche texte. Pas de grille de cartes.

## 2 limites
- Le monospace en paragraphe long reste moins confortable qu'une proportionnelle : l'accroche (environ 60 caractères par ligne) est à la limite. Un texte plus long, comme les pages projet, demanderait peut-être une police proportionnelle pour le corps.
- Les captures d'écran (fonds blancs, pastilles vertes et rouges) introduisent des couleurs hors palette. Le cadre noir les contient, mais elles concurrencent l'accent unique. Sous 900 px, l'arborescence et la ligne d'état disparaissent au profit d'une simple ligne de liens, et l'interaction signature n'existe donc que sur desktop.
