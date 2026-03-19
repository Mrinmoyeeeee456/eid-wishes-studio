import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { getAnonymousId } from '../lib/anonymousId';

interface ThemeState {
  isDark: boolean;
  isLoading: boolean;
  hydrateTheme: () => Promise<void>;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  isDark: false,
  isLoading: true,

  hydrateTheme: async () => {
    try {
      const localTheme = localStorage.getItem('eid_theme_pref');
      if (localTheme) {
        const isDark = localTheme === 'dark';
        set({ isDark, isLoading: false });
      }

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

  // Toggle is now SYNCHRONOUS — no await, no blocking
  toggleTheme: () => {
    const { isDark } = get();
    const newTheme = !isDark;
    const themeString = newTheme ? 'dark' : 'light';

    // Instant UI update
    set({ isDark: newTheme });
    localStorage.setItem('eid_theme_pref', themeString);

    // Fire-and-forget Supabase sync (non-blocking)
    const userId = getAnonymousId();
    supabase
      .from('user_preferences')
      .upsert(
        { id: userId, theme: themeString, updated_at: new Date().toISOString() },
        { onConflict: 'id' }
      )
      .then(() => {})
      .catch((err) => console.error('Theme sync error:', err));
  },
}));
