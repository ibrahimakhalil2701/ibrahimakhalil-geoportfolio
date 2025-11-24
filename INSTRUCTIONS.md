# 📋 INSTRUCTIONS RAPIDES - GeoPortfolio V2

## 🚀 Démarrage en 3 Étapes

### 1️⃣ Ouvrir le Portfolio Localement
```
Double-cliquez sur index.html
```
C'est tout ! Le portfolio s'ouvre dans votre navigateur.

---

## 🌐 Héberger en Ligne (Gratuit)

### Option A : GitHub Pages
1. Créez un compte sur [GitHub](https://github.com)
2. Créez un nouveau repository : `votre-nom.github.io`
3. Uploadez tous les fichiers du dossier `geoportfolio-v2`
4. Allez dans **Settings** > **Pages**
5. Sélectionnez **main branch** > **Save**
6. Votre site sera sur : `https://votre-nom.github.io`

### Option B : Netlify (RECOMMANDÉ - Plus Simple)
1. Allez sur [Netlify](https://www.netlify.com)
2. Créez un compte gratuit
3. **Drag & Drop** le dossier `geoportfolio-v2` entier
4. Site en ligne en 30 secondes !
5. URL gratuite fournie : `votre-nom.netlify.app`

### Option C : Vercel
1. Allez sur [Vercel](https://vercel.com)
2. Créez un compte gratuit
3. Cliquez sur **New Project**
4. Uploadez le dossier ou connectez GitHub
5. Déploiement automatique !

---

## ✏️ Personnalisation Rapide

### Modifier vos informations
Ouvrez `index.html` et cherchez :

#### Email (ligne ~210)
```html
<p><strong>Email:</strong> ibrahimakhalilmbacke2000@gmail.com</p>
```
Remplacez par votre email

#### Téléphone (ligne ~211)
```html
<p><strong>Tel:</strong> +1 (438) 543-5338</p>
```
Remplacez par votre numéro

#### LinkedIn & GitHub (lignes ~212-213)
```html
<p><strong>LinkedIn:</strong> <a href="...">votre-profil</a></p>
<p><strong>GitHub:</strong> <a href="...">votre-username</a></p>
```

### Ajouter votre photo
Ligne ~100 dans `index.html` :
```html
<div class="profile-photo">
    <!-- Remplacer les initiales par : -->
    <img src="ma-photo.jpg" alt="Photo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
</div>
```

### Changer les couleurs
Ouvrez `styles/main.css`, ligne ~10 :
```css
:root {
    --accent-cyan: #06B6D4;    /* Couleur principale */
    --accent-orange: #F97316;  /* Couleur secondaire */
}
```

---

## 🎯 Sections du Portfolio

1. **🗺️ Accueil** : Carte mondiale avec votre parcours
2. **🌍 Parcours** : Timeline géographique interactive
3. **📊 Compétences** : Toutes vos compétences SIG
4. **🚀 Projets** : 6 projets avec détails
5. **📧 Contact** : Carte + informations

---

## ❓ Questions Fréquentes

**Q : Les cartes ne s'affichent pas ?**
R : Assurez-vous d'avoir une connexion internet (Leaflet utilise des CDN)

**Q : Comment ajouter un projet ?**
R : Copiez un bloc `<div class="project-card">` dans `index.html` et modifiez le contenu

**Q : Le site est-il responsive ?**
R : Oui ! Fonctionne parfaitement sur mobile, tablette et desktop

**Q : Puis-je modifier le design ?**
R : Oui ! Tous les styles sont dans `styles/main.css`

---

## 📞 Besoin d'Aide ?

📧 ibrahimakhalilmbacke2000@gmail.com

---

**Bonne chance avec votre portfolio géomatique ! 🗺️✨**
