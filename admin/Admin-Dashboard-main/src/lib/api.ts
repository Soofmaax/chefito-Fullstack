import { supabase } from './supabase';

const API_URL = import.meta.env.VITE_API_URL;

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: any[];
  instructions: any[];
  author: {
    id: string;
    name: string;
    email: string;
  };
  category: string;
  difficulty: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  status: 'draft' | 'pending' | 'published' | 'rejected';
  rating: number;
  reviews_count: number;
  created_at: string;
  updated_at: string;
  image_url?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  recipes_count: number;
  joined_at: string;
  last_active: string;
  avatar_url?: string;
  preferences?: {
    role?: string;
  };
}

export interface Comment {
  id: string;
  content: string;
  rating: number;
  author: {
    id: string;
    name: string;
    email: string;
  };
  recipe: {
    id: string;
    title: string;
  };
  status: 'pending' | 'approved' | 'flagged' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface AdminStats {
  total_users: number;
  total_recipes: number;
  total_comments: number;
  pending_recipes: number;
  pending_comments: number;
  flagged_comments: number;
  growth_rate: number;
  monthly_stats: {
    month: string;
    recipes: number;
    users: number;
    comments: number;
  }[];
}

class ApiClient {
  private async getAuthHeader() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      throw new Error('No authentication token available');
    }
    return {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const headers = await this.getAuthHeader();
      
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Health Check
  async checkHealth() {
    return this.request<{ status: string; timestamp: string; version: string }>('/health');
  }

  // Admin Stats
  async getAdminStats(): Promise<AdminStats> {
    try {
      return await this.request<AdminStats>('/admin/stats');
    } catch (error) {
      // Fallback avec des données mockées si l'endpoint n'existe pas encore
      console.warn('Admin stats endpoint not available, using fallback data');
      return {
        total_users: 2847,
        total_recipes: 1429,
        total_comments: 8392,
        pending_recipes: 23,
        pending_comments: 45,
        flagged_comments: 12,
        growth_rate: 24.8,
        monthly_stats: [
          { month: 'Jan', recipes: 65, users: 28, comments: 234 },
          { month: 'Feb', recipes: 89, users: 32, comments: 345 },
          { month: 'Mar', recipes: 78, users: 41, comments: 456 },
          { month: 'Apr', recipes: 91, users: 38, comments: 567 },
          { month: 'May', recipes: 103, users: 45, comments: 678 },
          { month: 'Jun', recipes: 134, users: 52, comments: 789 },
        ]
      };
    }
  }

  // Recipes Management
  async getRecipes(params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<{ recipes: Recipe[]; total: number; page: number; limit: number }> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.status) searchParams.append('status', params.status);
    if (params?.search) searchParams.append('search', params.search);

    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return this.request<{ recipes: Recipe[]; total: number; page: number; limit: number }>(`/recipes${query}`);
  }

  async getRecipe(id: string): Promise<Recipe> {
    return this.request<Recipe>(`/recipes/${id}`);
  }

  async updateRecipe(id: string, data: Partial<Recipe>): Promise<Recipe> {
    return this.request<Recipe>(`/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteRecipe(id: string): Promise<void> {
    return this.request(`/recipes/${id}`, { method: 'DELETE' });
  }

  async approveRecipe(id: string): Promise<Recipe> {
    return this.request<Recipe>(`/recipes/${id}/approve`, { method: 'PUT' });
  }

  async rejectRecipe(id: string, reason?: string): Promise<Recipe> {
    return this.request<Recipe>(`/recipes/${id}/reject`, {
      method: 'PUT',
      body: JSON.stringify({ reason }),
    });
  }

  // Users Management
  async getUsers(params?: {
    page?: number;
    limit?: number;
    role?: string;
    status?: string;
    search?: string;
  }): Promise<{ users: User[]; total: number; page: number; limit: number }> {
    try {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      if (params?.role) searchParams.append('role', params.role);
      if (params?.status) searchParams.append('status', params.status);
      if (params?.search) searchParams.append('search', params.search);

      const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
      return await this.request<{ users: User[]; total: number; page: number; limit: number }>(`/admin/users${query}`);
    } catch (error) {
      // Fallback avec des données mockées
      console.warn('Admin users endpoint not available, using fallback data');
      return {
        users: [
          {
            id: '1',
            name: 'Marie Dubois',
            email: 'marie.dubois@email.com',
            role: 'user',
            status: 'active',
            recipes_count: 12,
            joined_at: '2024-01-10',
            last_active: '2024-01-20',
          },
          {
            id: '2',
            name: 'Jean Martin',
            email: 'jean.martin@email.com',
            role: 'user',
            status: 'active',
            recipes_count: 8,
            joined_at: '2024-01-08',
            last_active: '2024-01-19',
          },
        ],
        total: 2847,
        page: 1,
        limit: 10,
      };
    }
  }

  async getUser(id: string): Promise<User> {
    return this.request<User>(`/admin/users/${id}`);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.request<User>(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async suspendUser(id: string, reason?: string): Promise<User> {
    return this.request<User>(`/admin/users/${id}/suspend`, {
      method: 'PUT',
      body: JSON.stringify({ reason }),
    });
  }

  async activateUser(id: string): Promise<User> {
    return this.request<User>(`/admin/users/${id}/activate`, { method: 'PUT' });
  }

  // Comments Management
  async getComments(params?: {
    page?: number;
    limit?: number;
    status?: string;
    recipe_id?: string;
    search?: string;
  }): Promise<{ comments: Comment[]; total: number; page: number; limit: number }> {
    try {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      if (params?.status) searchParams.append('status', params.status);
      if (params?.recipe_id) searchParams.append('recipe_id', params.recipe_id);
      if (params?.search) searchParams.append('search', params.search);

      const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
      return await this.request<{ comments: Comment[]; total: number; page: number; limit: number }>(`/admin/comments${query}`);
    } catch (error) {
      // Fallback avec des données mockées
      console.warn('Admin comments endpoint not available, using fallback data');
      return {
        comments: [
          {
            id: '1',
            content: 'Cette recette est absolument délicieuse ! J\'ai suivi toutes les étapes et le résultat était parfait.',
            rating: 5,
            author: { id: '1', name: 'Marie Dubois', email: 'marie.dubois@email.com' },
            recipe: { id: '1', title: 'Coq au Vin Moderne' },
            status: 'pending',
            created_at: '2024-01-20',
            updated_at: '2024-01-20',
          },
        ],
        total: 8392,
        page: 1,
        limit: 10,
      };
    }
  }

  async approveComment(id: string): Promise<Comment> {
    return this.request<Comment>(`/admin/comments/${id}/approve`, { method: 'PUT' });
  }

  async rejectComment(id: string, reason?: string): Promise<Comment> {
    return this.request<Comment>(`/admin/comments/${id}/reject`, {
      method: 'PUT',
      body: JSON.stringify({ reason }),
    });
  }

  async deleteComment(id: string): Promise<void> {
    return this.request(`/admin/comments/${id}`, { method: 'DELETE' });
  }

  async flagComment(id: string, reason: string): Promise<Comment> {
    return this.request<Comment>(`/admin/comments/${id}/flag`, {
      method: 'PUT',
      body: JSON.stringify({ reason }),
    });
  }

  // Activity & Logs
  async getRecentActivity(limit: number = 10) {
    try {
      return await this.request<any[]>(`/admin/activity?limit=${limit}`);
    } catch (error) {
      // Fallback avec des données mockées
      return [
        {
          id: 1,
          type: 'recipe',
          user: 'Marie Dubois',
          action: 'published a new recipe',
          target: 'Coq au Vin Moderne',
          time: '5 minutes ago',
        },
        {
          id: 2,
          type: 'user',
          user: 'Jean Martin',
          action: 'joined the platform',
          target: '',
          time: '12 minutes ago',
        },
      ];
    }
  }

  // User Profile (current admin)
  async getUserProfile(): Promise<User> {
    return this.request<User>('/user/profile');
  }

  async updateUserProfile(data: Partial<User>): Promise<User> {
    return this.request<User>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiClient();