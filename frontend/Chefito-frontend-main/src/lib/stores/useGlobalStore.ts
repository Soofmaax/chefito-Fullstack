import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface GlobalState {
  // UI State
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  
  // User Preferences
  cookingMode: 'beginner' | 'intermediate' | 'expert';
  voiceEnabled: boolean;
  notificationsEnabled: boolean;
  
  // Performance
  prefetchEnabled: boolean;
  
  // Actions
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setCookingMode: (mode: 'beginner' | 'intermediate' | 'expert') => void;
  setVoiceEnabled: (enabled: boolean) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setPrefetchEnabled: (enabled: boolean) => void;
}

/**
 * Global state store using Zustand
 * Minimal state management for app-wide settings
 */
export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      // Initial state
      sidebarOpen: false,
      theme: 'system',
      cookingMode: 'beginner',
      voiceEnabled: true,
      notificationsEnabled: true,
      prefetchEnabled: true,
      
      // Actions
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setTheme: (theme) => set({ theme }),
      setCookingMode: (mode) => set({ cookingMode: mode }),
      setVoiceEnabled: (enabled) => set({ voiceEnabled: enabled }),
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      setPrefetchEnabled: (enabled) => set({ prefetchEnabled: enabled }),
    }),
    {
      name: 'chefito-global-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        cookingMode: state.cookingMode,
        voiceEnabled: state.voiceEnabled,
        notificationsEnabled: state.notificationsEnabled,
        prefetchEnabled: state.prefetchEnabled,
      }),
    }
  )
);

export default useGlobalStore;