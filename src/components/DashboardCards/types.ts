import type { ReactNode } from 'react';

export type CardTone =
  | 'blue'
  | 'green'
  | 'orange'
  | 'purple';

export interface StatisticCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  tone?: CardTone;
  to?: string;
  linkLabel?: string;
}

export interface SummaryItem {
  label: string;
  value: string | number;
}

export interface SummaryCardProps {
  title: string;
  description?: string;
  icon: ReactNode;
  items: SummaryItem[];
  tone?: CardTone;
  to?: string;
  linkLabel?: string;
}