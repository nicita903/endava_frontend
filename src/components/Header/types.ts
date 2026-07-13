import type { ReactNode } from 'react';

export interface HeaderProps {
  title: string;
  as?: string;
  description?: string;
  'data-testid'?: string;
  actions?: ReactNode;
}