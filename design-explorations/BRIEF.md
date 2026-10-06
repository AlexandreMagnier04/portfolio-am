# Brief — maquette d'accueil du portfolio d'Alexandre Magnier

## Ce que tu produis
UN fichier `design-explorations/<direction>/index.html` autonome (HTML + CSS dans le même fichier, JS minimal facultatif, polices via Google Fonts ou système). Il doit s'ouvrir en double-clic. Images : chemins relatifs vers `../../src/assets/…` (photo : `../../src/assets/photo.png` ; captures : `../../src/assets/projects/<slug>/cover.png`).

## Contenu
Utilise le vrai contenu : `src/data/*.json` et `src/content/projects/*.md` (lis-les d'abord). Aucun texte lorem ipsum, aucune donnée inventée. Cas particuliers :
- Les projets `status: a-completer` n'ont pas d'image : affiche-les avec une mention sobre « détails à venir », sans faux visuel.
- `stack: ["À préciser"]` est une valeur de remplissage : ne l'affiche pas.
- Les années des projets d'école (2024) sont provisoires : ne les affiche pas.
- Ne montre pas l'âge ni de ville de résidence (à confirmer par Alexandre). La zone de mobilité du profil est utilisable.
- Lien CV : `../../public/cv-alexandre-magnier.pdf`.

## Sections de l'accueil
Présentation (nom, titre, accroche, photo) · Expériences · Projets choisis (`featured`) · Compétences · Contact (email, téléphone, GitHub, LinkedIn, lien CV).

## Public
Vitrine polyvalente : recruteurs, équipes tech, clients, curieux. Personne n'est la cible unique.

## Interdits (le site ne doit pas « faire IA »)
- Dégradés violet/bleu, halos, orbes, grain décoratif gratuit.
- Verre dépoli (backdrop-blur) et cartes arrondies toutes identiques en grille 3 colonnes.
- Icônes ou emojis de remplissage, pastilles « badge » partout.
- Hero générique « Hi, I'm … » avec deux boutons centrés.
- Polices par défaut : Inter, Poppins, Space Grotesk, et en général tout ce qui est le premier choix évident.
- Textes creux : « passionné par l'innovation », « solutions sur-mesure », « du concept à la réalisation ».

## Exigences
- Choisis 1 ou 2 polices et une palette de 3 à 5 couleurs, et justifie le choix en une phrase en commentaire HTML en tête de fichier.
- Une composition qui n'est pas une pile de sections de même largeur : joue sur l'échelle, l'asymétrie, le rythme.
- Responsive de 360 px à 1440 px. Contrastes AA. `prefers-reduced-motion` respecté.
- Mouvement : au plus une interaction signature, sobre.
- Termine par un court `design-explorations/<direction>/NOTES.md` : principe de la direction, polices, palette, 3 choix assumés, 2 limites.
