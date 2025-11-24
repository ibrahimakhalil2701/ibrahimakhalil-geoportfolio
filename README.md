# 🗺️ GeoPortfolio V2.0 - Portfolio Géomatique Immersif

Portfolio professionnel de **Ibrahimakhalil Mbacke**, Géomaticien et Développeur WebMapping, avec une expérience géospatiale unique et immersive.

## 🎯 Nouveautés V2.0

### ✅ Corrections de Bugs
- ✅ **Navigation des couches** : Les checkbox fonctionnent maintenant avec feedback visuel
- ✅ **Section Accueil** : Ne se vide plus au retour depuis d'autres sections
- ✅ **Logo cliquable** : Retourne toujours à l'accueil avec tout le contenu

### 🆕 Nouvelles Fonctionnalités
1. **Modal Profil** : Accès rapide aux informations personnelles et réseaux sociaux
2. **Timeline Géographique Interactive (Scrollytelling)** :
   - Parcours académique : UCAD Dakar → Sorbonne Paris → UQAM Montréal
   - Expériences professionnelles : Tours → WSP → HEC Montréal
   - Cartes qui zooment automatiquement sur scroll
   - Animations fluides et immersives
3. **Section Projets Complète** :
   - 6 projets GitHub intégrés avec détails
   - Filtres par catégories (WebMapping, Analyse, Automatisation, Recherche)
   - Mini-cartes pour chaque projet
   - Modals de détails pour chaque projet
4. **Design Amélioré** :
   - Animations CSS avancées
   - Transitions fluides
   - Interface webmapping moderne
   - Responsive parfait (desktop, tablette, mobile)

## 📋 Structure du Projet

```
geoportfolio-v2/
├── index.html              # Page principale
├── styles/
│   └── main.css           # 1600+ lignes de CSS
├── scripts/
│   └── main.js            # JavaScript complet avec toutes les fonctionnalités
└── README.md              # Cette documentation
```

## 🚀 Installation & Utilisation

### Méthode 1 : Local (Immédiat)
1. Ouvrez simplement `index.html` dans votre navigateur
2. C'est tout ! ✨

### Méthode 2 : GitHub Pages (Gratuit)
1. Créez un repo GitHub : `votre-username.github.io`
2. Uploadez tous les fichiers
3. Activez GitHub Pages dans Settings
4. Votre site sera sur : `https://votre-username.github.io`

### Méthode 3 : Netlify (Gratuit, Recommandé)
1. Allez sur [Netlify](https://netlify.com)
2. Drag & drop le dossier `geoportfolio-v2`
3. Site en ligne en 30 secondes !
4. URL personnalisée gratuite

### Méthode 4 : Vercel (Gratuit)
1. Allez sur [Vercel](https://vercel.com)
2. Importez depuis GitHub ou uploadez le dossier
3. Déploiement automatique

## 🎨 Sections du Portfolio

### 1. 🗺️ Accueil (Hero)
- Carte mondiale interactive
- Points géolocalisés : Montréal, Paris, Tours, Dakar, Mali, Touba
- Statistiques en temps réel
- Appels à l'action (CTA)

### 2. 🌍 Parcours Géographique (Timeline)
- **Scrollytelling immersif**
- Carte qui zoome automatiquement sur les lieux
- Parcours académique détaillé :
  - 🏠 UCAD, Dakar, Sénégal
  - 🎓 Sorbonne Université, Paris, France (2020-2023)
  - 🎓 UQAM, Montréal, Canada (2023-2025)
- Expériences professionnelles :
  - 💼 Ville de Tours (Stage SIG, Avril-Juin 2023)
  - 💼 WSP Canada (Géomatique Climatique, Sept-Déc 2024)
  - 🔬 HEC Montréal (Projet FRQ, 2024)

### 3. 📊 Compétences
- **SIG Desktop** : ArcGIS Pro, QGIS, ArcGIS Online, FME
- **WebMapping** : Leaflet, MapLibre GL, Mapbox, OpenLayers
- **Programmation** : Python (GeoPandas, Rasterio), JavaScript, SQL/PostGIS, R
- **Bases de Données** : PostGIS, PostgreSQL, GeoPackage, SpatiaLite
- **Analyse Spatiale** : Analyse Raster, Network Analysis, Statistiques Spatiales
- **Télédétection** : Traitement d'images, Indices spectraux, Classification

### 4. 🚀 Projets (6 Projets)
1. **Géoportail National du Mali** (Maîtrise)
   - Leaflet, PostGIS, Docker, Python
   - [GitHub](https://github.com/ibrahimakhalil2701/Geoportail_Mali)

2. **Analyse Multimodale STM vs BIXI**
   - QGIS, Python, Network Analyst
   - [GitHub](https://github.com/ibrahimakhalil2701/Analyse-Spatiale-Comparative-Multimodale---Montr-al-STM-vs-BIXI-QGIS)

3. **Outil Python d'Analyse Zonale**
   - Python, GeoPandas, Rasterio
   - [GitHub](https://github.com/ibrahimakhalil2701/SIG-statistiques-zonales-Python-)

4. **Réseau Cyclable de Montréal**
   - JavaScript, Leaflet, GeoJSON
   - [GitHub](https://github.com/ibrahimakhalil2701/pistes-cyclables-montreal)

5. **Environnement GDAL Docker**
   - Docker, GDAL, Python
   - [GitHub](https://github.com/ibrahimakhalil2701/gdal-docker)

6. **Visualisation de Données Géographiques (GEO7630)**
   - JavaScript, D3.js, Leaflet
   - [GitHub](https://github.com/ibrahimakhalil2701/geo7630h25)

### 5. 📧 Contact
- Carte interactive de Montréal
- Informations complètes
- Liens réseaux sociaux stylisés
- Badge de disponibilité

## 🛠️ Technologies Utilisées

### Frontend
- HTML5 (Structure sémantique)
- CSS3 (Variables, Grid, Flexbox, Animations)
- JavaScript ES6+ (Modules, Async/Await)

### Cartographie
- **Leaflet.js 1.9.4** : Bibliothèque cartographique principale
- **OpenStreetMap** : Fond de carte standard
- **CARTO Dark** : Fond de carte sombre pour le hero

### Bibliothèques
- **Font Awesome 6.4.0** : Icônes
- **Animate.css 4.1.1** : Animations prédéfinies

### Hébergement
- GitHub Pages (Option 1 - Gratuit)
- Netlify (Option 2 - Gratuit, Recommandé)
- Vercel (Option 3 - Gratuit)

## 🎨 Palette de Couleurs

```css
/* Couleurs principales */
--accent-cyan: #06B6D4;       /* Couleur principale */
--accent-orange: #F97316;     /* Couleur secondaire */
--panel-dark: #1F2937;        /* Fond panneaux */
--panel-darker: #0F172A;      /* Fond principal */

/* Couches thématiques */
--layer-formation: #3B82F6;   /* Formation (Bleu) */
--layer-experience: #EF4444;  /* Expérience (Rouge) */
--layer-projet: #10B981;      /* Projets (Vert) */
--layer-origine: #F59E0B;     /* Origines (Orange) */
```

## 📱 Responsive Design

Le portfolio s'adapte automatiquement :
- **Desktop** (>1200px) : Vue complète
- **Tablette** (768-1200px) : Navigation optimisée
- **Mobile** (<768px) : Navigation verticale, cartes optimisées

## 🔧 Personnalisation

### Modifier les informations de contact
Dans `index.html`, recherchez et modifiez :
- Email : `ibrahimakhalilmbacke2000@gmail.com`
- Téléphone : `+1 (438) 543-5338`
- LinkedIn : `https://www.linkedin.com/in/ibrahimakhalil-mbacke`
- GitHub : `https://github.com/ibrahimakhalil2701`

### Ajouter une photo
Dans `index.html`, ligne ~100 :
```html
<div class="profile-photo">
    <!-- Remplacer <div class="profile-initials">IM</div> par : -->
    <img src="votre-photo.jpg" alt="Photo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
</div>
```

### Changer les couleurs
Dans `styles/main.css`, ligne ~10 :
```css
:root {
    --accent-cyan: #VOTRE_COULEUR;
    --accent-orange: #VOTRE_COULEUR;
    /* etc. */
}
```

## 📊 Statistiques

- **HTML** : ~1000 lignes
- **CSS** : ~1600 lignes
- **JavaScript** : ~800 lignes
- **Total** : ~3400 lignes de code
- **Poids** : ~120 KB (sans images)

## 🎯 Fonctionnalités Principales

### Navigation
✅ Navigation fluide entre sections
✅ Logo retourne à l'accueil
✅ Boutons actifs mis en évidence
✅ Transitions animées

### Cartes Interactives
✅ Carte hero avec parcours géographique
✅ Timeline avec zoom automatique au scroll
✅ Mini-cartes pour chaque projet
✅ Carte de contact interactive
✅ Popups informatifs

### Animations
✅ Grille cartographique animée en fond
✅ Lignes de connexion animées (dash-array)
✅ Apparition progressive au scroll
✅ Hover effects sur tous les éléments
✅ Transitions fluides

### Interactivité
✅ Modal profil avec stats
✅ Filtres de projets par catégorie
✅ Modals de détails pour chaque projet
✅ Contrôle des couches dans le sidebar
✅ Coordonnées en temps réel dans la status bar

## 🐛 Bugs Corrigés

1. ✅ **Navigation des couches** : Feedback visuel fonctionnel
2. ✅ **Section Accueil** : Contenu persistant
3. ✅ **Logo** : Retour à l'accueil garanti
4. ✅ **Initialisation des cartes** : Pas de duplication
5. ✅ **Responsive** : Parfait sur tous les écrans

## 📞 Contact

**Ibrahimakhalil Mbacke**
- 📧 Email: ibrahimakhalilmbacke2000@gmail.com
- 📱 Téléphone: +1 (438) 543-5338
- 💼 LinkedIn: [ibrahimakhalil-mbacke](https://www.linkedin.com/in/ibrahimakhalil-mbacke)
- 💻 GitHub: [ibrahimakhalil2701](https://github.com/ibrahimakhalil2701)

## 📄 Licence

Ce portfolio est un projet personnel de Ibrahimakhalil Mbacke.
Libre d'utilisation pour inspiration, mais merci de créditer l'auteur.

---

**Version:** 2.0.0
**Dernière mise à jour:** Novembre 2024
**Statut:** 🚀 Production Ready

---

*"La géographie est la science de l'espace et du lieu. Ce portfolio en est la représentation digitale immersive."*
