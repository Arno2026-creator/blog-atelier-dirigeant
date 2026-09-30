# L'Atelier du Dirigeant — Blog Jekyll

Blog professionnel pour les dirigeants de commerce et restauration.
**Stack :** Jekyll 4 · Netlify · GitHub · Decap CMS · Netlify Identity

---

## 🚀 Intégration sur votre dépôt existant

### 1. Téléchargez et extrayez le ZIP
Extrayez le contenu du dossier `blog-atelier-dirigeant/` — tous les fichiers sont des fichiers Jekyll.

### 2. Copiez dans votre dépôt GitHub
Via GitHub.com → **Add file → Upload files** → glissez-déposez tous les fichiers → committez.

> ⚠️ Vos anciens fichiers HTML (`categorie-*.html`, `index.html`…) seront remplacés. Sauvegardez-les si besoin.

### 3. Vérifiez les paramètres Netlify
- **Build command :** `jekyll build`
- **Publish directory :** `_site`
- **Ruby version :** `3.2.0` (déjà dans `netlify.toml`)

### 4. Activez Netlify Identity
- **Site configuration → Identity → Enable Identity**
- **Registration → Invite only**
- **Services → Git Gateway → Enable Git Gateway**

### 5. Accédez au CMS
Rendez-vous sur `https://votre-site.netlify.app/admin/` — vous recevrez un email d'invitation.

---

## 📝 Publier un article sans toucher au code

1. Aller sur `/admin/`
2. **Articles → New Article**
3. Remplir titre, catégorie, image, contenu
4. Cliquer **Publish** → commit automatique → déploiement Netlify

---

## 📁 Structure du projet

```
blog-atelier-dirigeant/
├── _config.yml          # Configuration Jekyll
├── _layouts/            # default, post, page
├── _includes/           # header, footer, post-card, sidebar
├── _posts/              # 6 articles migrés (Markdown)
├── _pages/              # À propos, Contact
├── _data/settings.yml   # Paramètres éditables via CMS
├── admin/               # Decap CMS
├── assets/css/          # Thème bleu marine & or
├── assets/js/           # JavaScript
├── blog/index.html      # Page liste des articles
├── index.html           # Page d'accueil
├── Gemfile              # Dépendances Ruby
└── netlify.toml         # Configuration Netlify
```

---

## 🛠️ Développement local

```bash
bundle install
bundle exec jekyll serve --livereload
# → http://localhost:4000
```

---

*Contact : arnolenne72@gmail.com*