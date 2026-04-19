import * as React from 'react';
import type { ResolvedTheme, Theme } from '../types/theme';

const STORAGE_KEY = 'giselle-ui-theme';

export interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = 'system' }: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }

    return defaultTheme;
  });

  const [systemTheme, setSystemTheme] = React.useState<ResolvedTheme>(() => getSystemTheme());

  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  React.useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, resolvedTheme]);

  React.useEffect(() => {
    if (theme !== 'system') {
      return;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const applySystemTheme = (nextTheme: ResolvedTheme) => {
      setSystemTheme((currentTheme) => (currentTheme === nextTheme ? currentTheme : nextTheme));
    };

    applySystemTheme(media.matches ? 'dark' : 'light');

    const onChange = (event: MediaQueryListEvent) => {
      applySystemTheme(event.matches ? 'dark' : 'light');
    };

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [theme]);

  const value = React.useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme
    }),
    [resolvedTheme, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
