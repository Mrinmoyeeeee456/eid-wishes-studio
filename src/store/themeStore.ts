import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { getAnonymousId } from '../lib/anonymousId';

interface ThemeState {
  isDark: boolean;
  isLoading: boolean;
  hydrateTheme: () => Promise<void>;
  toggleTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  isDark: false,
  isLoading: true, // Start loading to show skeleton

  hydrateTheme: async () => {
    try {
      // 1. Check local preference (to prevent flicker if possible)
      const localTheme = localStorage.getItem('eid_theme_pref');
      if (localTheme) {
        const isDark = localTheme === 'dark';
        set({ isDark, isLoading: false });
      }

      // 2. Hydrate from Supabase as source of truth
      const userId = getAnonymousId();
      const { data, error } = await supabase
        .from('user_preferences')
        .select('theme')
        .eq('id', userId)
        .single();

      if (!error && data) {
        const isDark = data.theme === 'dark';
        set({ isDark, isLoading: false });
        localStorage.setItem('eid_theme_pref', data.theme);
      } else {
        // First visit or no Supabase conection: fallback to system pref
        if (!localTheme) {
          const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          set({ isDark: isSystemDark, isLoading: false });
        } else {
           set({ isLoading: false });
        }
      }
    } catch (err) {
      console.error('Failed to hydrate theme:', err);
      set({ isLoading: false });
    }
  },

  toggleTheme: async () => {
    const { isDark } = get();
    const newTheme = !isDark;
    const themeString = newTheme ? 'dark' : 'light';

    // Optimistic Update
    set({ isDark: newTheme });
    localStorage.setItem('eid_theme_pref', themeString);

    try {
      const userId = getAnonymousId();
      
      // Async Sync to Supabase
      await supabase
        .from('user_preferences')
        .upsert(
          { id: userId, theme: themeString, updated_at: new Date().toISOString() },
          { onConflict: 'id' }
        );
    } catch (err) {
      console.error('Failed to sync theme preference:', err);
      // We don't revert the optimistic update because local UX is more important
    }
  }
}));
