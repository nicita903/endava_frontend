import type { ReactNode } from 'react';
import type { ThemeMode } from '../../theme/theme';

export interface LayoutProps {
  children: ReactNode;
  onThemeToggle: () => void;
  themeMode: ThemeMode;
}
