# Chefito Admin Dashboard

Interface d'administration pour la plateforme Chefito - Gestion des recettes, utilisateurs et modération de contenu.

## 🚀 Configuration et Installation

### 1. Variables d'environnement

Créez un fichier `.env` à la racine du projet avec vos vraies valeurs :

```env
# Backend API
VITE_API_URL=http://localhost:3001/api
VITE_API_DOCS_URL=http://localhost:3001/api/docs

# Supabase (même configuration que votre backend)
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Admin Application
VITE_APP_NAME=Chefito Admin
VITE_APP_VERSION=1.0.0
```

### 2. Installation des dépendances

```bash
npm install
```

### 3. Démarrage en développement

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## 🔗 Connexion avec le Backend

### Prérequis

1. **Backend Chefito** doit être en cours d'exécution sur le port 3001
2. **Compte admin** créé dans Supabase avec le rôle approprié

### Création d'un utilisateur admin

Dans votre base de données Supabase, exécutez :

```sql
-- 1. Créez d'abord un utilisateur via Supabase Auth Dashboard
-- 2. Puis ajoutez le rôle admin dans la table profiles

UPDATE profiles 
SET preferences = jsonb_set(
  COALESCE(preferences, '{}'), 
  '{role}', 
  '"admin"'
) 
WHERE id = 'USER_ID_DE_VOTRE_ADMIN';
```

### Test de connexion

1. Démarrez votre backend : `cd backend && npm run dev`
2. Démarrez l'admin : `npm run dev`
3. Connectez-vous avec votre compte admin
4. Vérifiez que les données s'affichent dans le dashboard

## 📋 Fonctionnalités

### ✅ Implémentées

- **Authentification** : Connexion sécurisée avec vérification du rôle admin
- **Dashboard** : Vue d'ensemble avec statistiques et graphiques
- **Interface responsive** : Optimisée pour desktop et mobile
- **Gestion d'erreurs** : Affichage des erreurs de connexion API
- **Fallback data** : Données de démonstration si l'API n'est pas disponible

### 🔄 En cours de développement

- **Gestion des recettes** : CRUD complet avec approbation/rejet
- **Gestion des utilisateurs** : Administration des comptes utilisateurs
- **Modération des commentaires** : Approbation/suppression des commentaires
- **Paramètres** : Configuration de l'application

## 🛠️ Architecture

```
src/
├── components/
│   ├── Auth/           # Authentification
│   ├── Dashboard/      # Composants du tableau de bord
│   └── Layout/         # Navigation et mise en page
├── hooks/
│   └── useAuth.ts      # Hook d'authentification
├── lib/
│   ├── api.ts          # Client API avec types TypeScript
│   └── supabase.ts     # Configuration Supabase
├── pages/              # Pages principales
└── utils/              # Utilitaires
```

## 🔌 API Endpoints

### Actuellement utilisés

```javascript
GET /api/health              // Status de l'API
GET /api/admin/stats         // Statistiques globales
GET /api/recipes             // Liste des recettes
GET /api/user/profile        // Profil utilisateur
```

### À implémenter dans le backend

```javascript
// Admin - Recettes
PUT /api/recipes/:id/approve     // Approuver une recette
PUT /api/recipes/:id/reject      // Rejeter une recette
DELETE /api/recipes/:id          // Supprimer une recette

// Admin - Utilisateurs
GET /api/admin/users             // Liste des utilisateurs
PUT /api/admin/users/:id         // Modifier un utilisateur
PUT /api/admin/users/:id/suspend // Suspendre un utilisateur

// Admin - Commentaires
GET /api/admin/comments          // Tous les commentaires
PUT /api/admin/comments/:id/approve  // Approuver un commentaire
DELETE /api/admin/comments/:id   // Supprimer un commentaire

// Admin - Activité
GET /api/admin/activity          // Activité récente
```

## 🎨 Design System

- **Couleurs principales** : Purple (#8b5cf6), Blue (#06b6d4), Orange (#f97316)
- **Typographie** : System fonts avec Tailwind CSS
- **Composants** : Design moderne avec animations subtiles
- **Responsive** : Mobile-first avec breakpoints Tailwind

## 🔧 Scripts disponibles

```bash
npm run dev          # Démarrage en développement
npm run build        # Build de production
npm run preview      # Aperçu du build
npm run lint         # Vérification ESLint
```

## 🐛 Dépannage

### Erreur de connexion API

1. Vérifiez que le backend est démarré sur le port 3001
2. Vérifiez les variables d'environnement dans `.env`
3. Consultez la console du navigateur pour les erreurs détaillées

### Problème d'authentification

1. Vérifiez que votre utilisateur a le rôle admin dans Supabase
2. Vérifiez les clés Supabase dans `.env`
3. Consultez l'onglet Network pour les erreurs d'API

### Données non affichées

L'application utilise des données de fallback si l'API n'est pas disponible. Vérifiez :
1. La connexion au backend
2. Les endpoints API implémentés
3. Les permissions de votre utilisateur admin

## 📞 Support

Pour toute question ou problème :
1. Vérifiez les logs de la console
2. Consultez la documentation de l'API backend
3. Vérifiez la configuration Supabase

---

**Note** : Cette application est conçue pour fonctionner avec le backend Chefito. Assurez-vous que les deux applications sont correctement configurées et connectées.