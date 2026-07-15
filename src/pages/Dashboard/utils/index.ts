import type { StatisticCardProps } from '../../../components/DashboardCards';
import { ROUTES } from '../../../constants/routes';

export type StatisticType =
  | 'owners'
  | 'cars'
  | 'insured'
  | 'uninsured';

export const getStatisticCard = (
  type: StatisticType,
  value: string | number
): StatisticCardProps => {
  switch (type) {
    case 'owners':
      return {
        title: 'Total Owners',
        value,
        icon: '👤',
        to: ROUTES.OWNERS,
      };

    case 'cars':
      return {
        title: 'Total Cars',
        value,
        icon: '🚗',
        to: ROUTES.CARS,
      };

    case 'insured':
      return {
        title: 'Insured Cars',
        value,
        icon: '✓',
      };

    case 'uninsured':
      return {
        title: 'Uninsured Cars',
        value,
        icon: '!',
      };

    default:
      throw new Error('Unknown statistic type');
  }
};