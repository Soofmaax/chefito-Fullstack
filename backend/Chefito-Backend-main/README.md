# Chefito Backend API

A TypeScript Express backend for the Chefito cooking assistant, featuring Supabase authentication and Cloudflare R2 recipe storage.

## 🚀 Features

- **Authentication**: Supabase Auth with JWT middleware
- **Recipe Management**: Cloudflare R2 storage with JSON-based recipes
- **User Profiles**: Customizable user preferences and dietary restrictions
- **Analytics**: Recipe view tracking and user statistics
- **Type Safety**: Full TypeScript implementation with comprehensive types

## 📁 Project Structure

```
src/
├── config/          # Configuration files (Supabase, R2, database)
├── controllers/     # Request handlers and business logic
├── middleware/      # Authentication and error handling
├── routes/          # API route definitions
├── services/        # External service integrations
├── types/           # TypeScript type definitions
└── app.ts          # Main application entry point
```

## 🛠 Setup Instructions

### 1. Environment Configuration

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required environment variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `CLOUDFLARE_BUCKET_URL` - Your R2 bucket endpoint URL
- `CLOUDFLARE_ACCESS_KEY_ID` - Your R2 access key ID
- `CLOUDFLARE_SECRET_ACCESS_KEY` - Your R2 secret access key
- `CLOUDFLARE_BUCKET_NAME` - Your R2 bucket name

### 2. Database Setup

Run the migration scripts in your Supabase dashboard:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the contents of `supabase/migrations/create_profiles_table.sql`
4. Run the contents of `supabase/migrations/create_user_stats_table.sql`

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## 📡 API Endpoints

### Public Endpoints

- `GET /api/health` - Health check
- `GET /api/recipes` - List all recipes
- `GET /api/recipes/:id` - Get specific recipe
- `GET /api/recipes/:id/variants` - Get recipe variants
- `POST /api/recipes/view` - Record recipe view (optional auth)

### Protected Endpoints (Require Authentication)

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/stats` - Get user statistics

## 🍳 Recipe Storage Structure

### Cloudflare R2 Bucket Structure

```
chefito-recipes/
├── recipes/
│   ├── recipe-1.json
│   ├── recipe-2.json
│   └── ...
└── variants/
    ├── recipe-1/
    │   ├── vegan.json
    │   ├── gluten-free.json
    │   └── kids.json
    └── ...
```

### Recipe JSON Format

```json
{
  "id": "recipe-1",
  "title": "Classic Margherita Pizza",
  "description": "A traditional Italian pizza with fresh basil and mozzarella",
  "cuisine": "Italian",
  "difficulty": "medium",
  "cookingTime": 45,
  "servings": 4,
  "ingredients": [
    {
      "name": "Pizza dough",
      "amount": 1,
      "unit": "piece"
    }
  ],
  "instructions": [
    "Preheat oven to 475°F (245°C)",
    "Roll out pizza dough..."
  ],
  "nutritionInfo": {
    "calories": 280,
    "protein": 12,
    "carbs": 35,
    "fat": 10,
    "fiber": 2,
    "sugar": 3
  },
  "tags": ["vegetarian", "italian", "pizza"],
  "imageUrl": "https://example.com/pizza.jpg",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z",
  "author": "Chef Mario",
  "rating": 4.5,
  "reviewCount": 120
}
```

## 🧪 Testing

### Manual Testing Checklist

1. **Health Check**: `GET /api/health`
2. **Recipe Listing**: `GET /api/recipes`
3. **Recipe Details**: `GET /api/recipes/{recipe-id}`
4. **Recipe Variants**: `GET /api/recipes/{recipe-id}/variants`
5. **Authentication**: Test with valid/invalid JWT tokens
6. **Profile Management**: Test profile CRUD operations
7. **View Tracking**: Test recipe view recording

### Using curl for Testing

```bash
# Health check
curl http://localhost:3001/api/health

# List recipes
curl http://localhost:3001/api/recipes

# Get specific recipe
curl http://localhost:3001/api/recipes/recipe-1

# Test with authentication
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:3001/api/user/profile
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables for Production

Ensure all environment variables are set in your production environment, especially:
- Set `NODE_ENV=production`
- Update `FRONTEND_URL` to your production frontend URL
- Use production Supabase credentials
- Use production R2 credentials

## 📋 Manual Setup Tasks

### 1. Supabase Configuration

1. Create a new Supabase project
2. Enable authentication with email/password
3. Disable email confirmation in Auth settings
4. Run the provided migration scripts
5. Get your project URL and keys

### 2. Cloudflare R2 Setup

1. Create a Cloudflare account and set up R2
2. Create a new R2 bucket (e.g., `chefito-recipes`)
3. Create API tokens with R2 permissions
4. Upload sample recipe JSON files to test

### 3. Sample Recipe Upload

Create sample recipes in your R2 bucket following the JSON structure above. Store them as:
- `recipes/sample-recipe-1.json`
- `recipes/sample-recipe-2.json`
- `variants/sample-recipe-1/vegan.json`

## 🔧 Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

## 🤝 Contributing

This is a hackathon project for bolt.new. Feel free to extend and improve the codebase!