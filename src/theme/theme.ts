export const lightTheme = {
  colors: {
    primary: {
      50: '#EEF4FF',
      100: '#DCE8FF',
      200: '#B8D0FF',
      300: '#8CB1FF',
      400: '#5F92FF',
      500: '#336BFF',
      600: '#1F4FD6',
      700: '#173DA8',
      800: '#122D7A',
      900: '#0A1F4D',
    },
    accent: {
      50: '#FFF5EB',
      100: '#FFE6CC',
      200: '#FFCC99',
      300: '#FFB366',
      400: '#FF9933',
      500: '#FF7A00',
      600: '#E66E00',
      700: '#B35600',
      800: '#804000',
      900: '#4D2600',
    },
    success: '#16A34A',
    warning: '#F59E0B',
    error: '#DC2626',
    info: '#2563EB',
    background: {
      page: '#F8FAFC',
      card: '#FFFFFF',
      sidebar: '#0A1F4D',
      elevated: '#FFFFFF',
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
      muted: '#94A3B8',
      inverse: '#FFFFFF',
    },
    border: {
      light: '#E2E8F0',
      default: '#CBD5E1',
      strong: '#94A3B8',
    },
    policy: {
      active: '#16A34A',
      expiring: '#F59E0B',
      expired: '#DC2626',
      draft: '#64748B',
    },
    chart: {
      blue: '#336BFF',
      orange: '#FF7A00',
      green: '#16A34A',
      yellow: '#F59E0B',
      purple: '#7C3AED',
      teal: '#0D9488',
    },
  },
};

export type AppTheme = typeof lightTheme;

export const darkTheme: AppTheme = {
  colors: {
    primary: {
      50: '#10224A',
      100: '#17305F',
      200: '#1F4387',
      300: '#2857B0',
      400: '#3B73E0',
      500: '#6EA0FF',
      600: '#8CB5FF',
      700: '#B8D0FF',
      800: '#DCE8FF',
      900: '#EEF4FF',
    },
    accent: {
      50: '#4D2600',
      100: '#804000',
      200: '#B35600',
      300: '#E66E00',
      400: '#FF7A00',
      500: '#FF9933',
      600: '#FFB366',
      700: '#FFCC99',
      800: '#FFE6CC',
      900: '#FFF5EB',
    },
    success: '#22C55E',
    warning: '#FBBF24',
    error: '#F87171',
    info: '#60A5FA',
    background: {
      page: '#0B1220',
      card: '#111827',
      sidebar: '#050B1A',
      elevated: '#172033',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#CBD5E1',
      muted: '#64748B',
      inverse: '#0F172A',
    },
    border: {
      light: '#1F2937',
      default: '#334155',
      strong: '#64748B',
    },
    policy: {
      active: '#22C55E',
      expiring: '#FBBF24',
      expired: '#F87171',
      draft: '#94A3B8',
    },
    chart: {
      blue: '#6EA0FF',
      orange: '#FF9933',
      green: '#22C55E',
      yellow: '#FBBF24',
      purple: '#A78BFA',
      teal: '#2DD4BF',
    },
  },
};

export const theme = lightTheme;

export type ThemeMode = 'light' | 'dark';
