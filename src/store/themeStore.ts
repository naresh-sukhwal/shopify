import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

import { themeType } from '@/interface';
import { DarkThemeColors, LightThemeColors } from '@/utils/theme.utils';

const scheme = Appearance.getColorScheme();

type ThemeStore = {
  isDarkTheme: boolean;
  themeColor: themeType;

  setTheme: (payload: any) => void;
  toggleTheme: () => void;
  setSystemTheme: (scheme: 'light' | 'dark') => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    set => ({
      isDarkTheme: scheme === 'dark',
      themeColor: scheme === 'dark' ? DarkThemeColors : LightThemeColors,

      setTheme: payload =>
        set(state => ({
          themeColor: {
            ...state.themeColor,
            primary: payload.primary_color,
            secondary: payload.secondary_color,
            tertiary: payload.tertiary_color,
          },
        })),

      toggleTheme: () =>
        set(state => {
          const isDark = !state.isDarkTheme;
          return {
            isDarkTheme: isDark,
            themeColor: isDark ? DarkThemeColors : LightThemeColors,
          };
        }),

      setSystemTheme: scheme => {
        const isDark = scheme === 'dark';
        set({
          isDarkTheme: isDark,
          themeColor: isDark ? DarkThemeColors : LightThemeColors,
        });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
