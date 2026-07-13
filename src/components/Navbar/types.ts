import type { ReactNode } from 'react';

export interface NavbarItem {
  label: string;
  href: string;
  testId?: string;
}

export interface NavbarProps {
  logo?: ReactNode;
  items: NavbarItem[];
  activeItem?: string;
  onThemeToggle?: () => void;
  onItemClick?: (item: NavbarItem) => void;
  themeToggleLabel?: string;
  'data-testid'?: string;
}
