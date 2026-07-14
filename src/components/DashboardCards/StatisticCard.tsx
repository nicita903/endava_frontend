import {
  Card,
  CardHeader,
  CardTitle,
  IconWrapper,
  NavigationLink,
  StatisticValue,
} from './styles';
import type { StatisticCardProps } from './types';

export const StatisticCard = ({
  title,
  value,
  icon,
  to,
}: StatisticCardProps) => {
  return (
    <Card data-testid="statistic-card">
      <CardHeader>
        <IconWrapper aria-hidden="true">{icon}</IconWrapper>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <StatisticValue>{value}</StatisticValue>

      {to && (
        <NavigationLink to={to}>
          View details
        </NavigationLink>
      )}
    </Card>
  );
};