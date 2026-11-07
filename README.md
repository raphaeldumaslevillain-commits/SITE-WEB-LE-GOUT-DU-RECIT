# Le Goût du Récit

Maquette du site de Nathalie Peine, avec un accueil et trois pages d’activité. Les liens du carnet renvoient aux articles du site actuel. Les coordonnées ouvrent le logiciel de messagerie ou de téléphone.

## Prévisualiser

Servir le dossier du dépôt avec un serveur statique, par exemple :

```sh
python3 -m http.server 8426
```

Ouvrir [localhost:8426](http://localhost:8426). Le site ne demande ni installation de dépendances ni compilation.

Le premier écran affiche le menu sur fond beige. Dès le premier défilement, le prologue de quatre secondes se dévoile sous la navigation. La vidéo avance en descendant et se rembobine en remontant. À la fin, le logo et le nom de Nathalie Peine apparaissent, puis le titre et le texte d’accueil se découvrent plus bas. Si la réduction des animations est activée ou si le navigateur ne peut pas lire la vidéo, le premier défilement révèle le logo.

## Sources

- [Site actuel de Nathalie Peine](https://nathaliepeine.wordpress.com/), [Actions](https://nathaliepeine.wordpress.com/actions/), [Formations](https://nathaliepeine.wordpress.com/formations/), [Familles](https://nathaliepeine.wordpress.com/familles/), [Blog](https://nathaliepeine.wordpress.com/blog/) et [Contact](https://nathaliepeine.wordpress.com/contact/). Les textes de la maquette sont adaptés de ces pages.
- Photos reprises du site et converties en WebP, dont les reportages [en Haute-Saône](https://nathaliepeine.wordpress.com/2026/03/11/lectures-nomades-en-haute-saone/), [à Chevilly-Larue](https://nathaliepeine.wordpress.com/2025/01/21/le-camion-a-chevilly/), [dans le camion](https://nathaliepeine.wordpress.com/2025/01/03/des-nouvelles-du-camion/) et [Tricotis, tricotas…](https://nathaliepeine.wordpress.com/2026/03/11/tricotis-tricotas/).
- Logo original et animation d’accueil V2 fournis pour la maquette. La copie MP4 est optimisée pour le web.
- Cormorant Garamond, DM Sans, Caveat et Source Sans 3 sont distribuées sous licence SIL Open Font License. Les licences accompagnent les fichiers de police dans `assets/fonts/`.

## Typographie

Les accents de titre utilisent Bradley Hand Bold lorsqu’elle est disponible sur l’appareil, avec Caveat Bold en secours. Les textes courants et leurs mises en gras utilisent les graisses Regular et Bold de Myriad Pro lorsqu’elles sont installées, avec Source Sans 3 en secours.

Pour distribuer Bradley Hand et Myriad Pro via Adobe Fonts, ajouter le code d’intégration du projet web du compte de la cliente aux quatre pages, puis placer les noms CSS fournis par Adobe en tête de `--script` et `--copy`. Voir les [conditions d’utilisation des polices web d’Adobe Fonts](https://helpx.adobe.com/fonts/web/font-licensing/webfont-licensing.html).
