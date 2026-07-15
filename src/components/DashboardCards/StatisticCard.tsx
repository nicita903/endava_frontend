import {
  CardTitle,
  NavigationLink,
  StatisticCardContainer,
  StatisticContent,
  StatisticIconWrapper,
  StatisticValue,
} from './styles';
import type { StatisticCardProps } from './types';

export const StatisticCard = ({
  title,
  value,
  icon,
  tone = 'blue',
  to,
  linkLabel = 'View details',
}: StatisticCardProps) => {
  return (
    <StatisticCardContainer data-testid="statistic-card">
      <StatisticIconWrapper $tone={tone}>
        {icon}
      </StatisticIconWrapper>

      <StatisticContent>
        <CardTitle>{title}</CardTitle>

        <StatisticValue>{value}</StatisticValue>

        {to && (
          <NavigationLink to={to}>
            {linkLabel}
            <span aria-hidden="true">→</span>
          </NavigationLink>
        )}
      </StatisticContent>
    </StatisticCardContainer>
  );
};