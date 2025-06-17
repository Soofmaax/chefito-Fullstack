# 🔗 Guide de liaison Backend-Admin

## Configuration pour connecter l'admin au backend

### 1. Variables d'environnement pour l'admin

Crée un fichier `.env` dans ton projet admin avec :

```env
# Backend API
VITE_API_URL=http://localhost:3001/api
VITE_API_DOCS_URL=http://localhost:3001/api/docs

# Supabase (même config que le backend)
VITE_SUPABASE_URL=ton_supabase_url
VITE_SUPABASE_ANON_KEY=ton_supabase_anon_key

# Admin specific
VITE_APP_NAME=Chefito Admin
VITE_APP_VERSION=1.0.0
```

### 2. CORS - Déjà configuré dans le backend

Le backend accepte déjà les connexions depuis :
- `http://localhost:3000` (React par défaut)
- `http://localhost:5173` (Vite par défaut)

### 3. Endpoints API disponibles pour l'admin

#### **Authentification**
- Les admins utilisent la même auth Supabase
- Vérification du rôle via `profiles.preferences.role = "admin"`

#### **Endpoints existants utilisables :**
```javascript
// Recettes
GET /api/recipes                    // Liste des recettes
GET /api/recipes/:id               // Détail recette
GET /api/recipes/:id/variants      // Variantes

// Commentaires  
GET /api/comments/recipe/:recipeId // Commentaires d'une recette
POST /api/comments/recipe/:recipeId // Créer commentaire
PUT /api/comments/:commentId       // Modifier commentaire

// Utilisateurs
GET /api/user/profile              // Profil utilisateur
PUT /api/user/profile              // Modifier profil
GET /api/user/stats                // Stats utilisateur

// Santé
GET /api/health                    // Status API
```

### 4. Endpoints admin à ajouter (pour plus tard)

Quand tu créeras l'admin, on ajoutera :
```javascript
// Admin - Recettes
POST /api/admin/recipes            // Créer recette
PUT /api/admin/recipes/:id         // Modifier recette
DELETE /api/admin/recipes/:id      // Supprimer recette
PUT /api/admin/recipes/:id/approve // Approuver recette

// Admin - Commentaires
GET /api/admin/comments            // Tous les commentaires
PUT /api/admin/comments/:id/approve // Approuver commentaire
DELETE /api/admin/comments/:id     // Supprimer commentaire

// Admin - Utilisateurs
GET /api/admin/users               // Liste utilisateurs
PUT /api/admin/users/:id           // Modifier utilisateur
GET /api/admin/stats               // Stats globales
```

### 5. Authentification admin

```javascript
// Dans l'admin, vérifier le rôle après login
const checkAdminRole = async (user) => {
  const { data: profile } = await supabase
    .from('profiles')
    .select('preferences')
    .eq('id', user.id)
    .single();
    
  return profile?.preferences?.role === 'admin';
};
```

### 6. Démarrage des projets

```bash
# Terminal 1 - Backend
cd backend
npm run dev        # Port 3001

# Terminal 2 - Admin  
cd admin
npm run dev        # Port 5173 (Vite) ou 3000 (React)
```

## 🎯 Prochaines étapes

1. **Crée le projet admin** dans une nouvelle conversation
2. **Utilise ce guide** pour la configuration
3. **Teste la connexion** entre les deux
4. **Ajoute les endpoints admin** au backend si nécessaire

## 📝 Notes importantes

- Le backend est **déjà prêt** pour recevoir l'admin
- L'authentification Supabase **fonctionne** pour les deux
- Les **CORS sont configurés** correctement
- La **documentation API** est disponible sur `/api/docs`

## 🔧 Commandes utiles

```bash
# Voir la doc API du backend
curl http://localhost:3001/api/docs

# Tester la connexion
curl http://localhost:3001/api/health

# Voir les recettes
curl http://localhost:3001/api/recipes
```