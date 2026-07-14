import type { ReactNode } from 'react';

export interface StatisticCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    to?: string;
}

export interface SummaryItem {
    label: string;
    value: string | number;
}

export interface SummaryCardProps {
    title: string;
    icon: ReactNode;
    items: SummaryItem[];
    to?: string;
}