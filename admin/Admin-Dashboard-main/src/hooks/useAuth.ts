import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface Profile {
  id: string;
  name?: string;
  preferences?: {
    role?: string;
  };
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      
      if (currentUser) {
        await loadUserProfile(currentUser.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);
        
        if (currentUser) {
          await loadUserProfile(currentUser.id);
        } else {
          setProfile(null);
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('id, name, preferences')
        .eq('id', userId)
        .single();
      
      if (error) {
        // Si le profil n'existe pas, on peut le créer
        if (error.code === 'PGRST116') {
          await createUserProfile(userId);
          return;
        }
        throw error;
      }

      setProfile(profileData);
      const role = profileData?.preferences?.role;
      setIsAdmin(role === 'admin');
      
      if (role !== 'admin') {
      }
    } catch (error) {
      setIsAdmin(false);
      setProfile(null);
    }
  };

  const createUserProfile = async (userId: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const { data: newProfile, error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          name: userData.user?.user_metadata?.name || userData.user?.email?.split('@')[0] || 'User',
          preferences: { role: 'user' }
        })
        .select()
        .single();

      if (error) throw error;
      
      setProfile(newProfile);
      setIsAdmin(false);
    } catch {
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Vérifier le rôle admin après connexion
      if (data.user) {
        await loadUserProfile(data.user.id);
      }
      
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in');
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
      setIsAdmin(false);
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error('Failed to sign out');
      throw error;
    }
  };

  const makeUserAdmin = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          preferences: { role: 'admin' }
        })
        .eq('id', userId);

      if (error) throw error;
      
      // Recharger le profil si c'est l'utilisateur actuel
      if (userId === user?.id) {
        await loadUserProfile(userId);
      }
      
      toast.success('User promoted to admin');
    } catch (error: any) {
      toast.error('Failed to promote user to admin');
      throw error;
    }
  };

  return {
    user,
    profile,
    isAdmin,
    loading,
    signIn,
    signOut,
    makeUserAdmin,
    reloadProfile: () => user ? loadUserProfile(user.id) : Promise.resolve(),
  };
}