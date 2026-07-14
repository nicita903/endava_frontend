import {
  Card,
  CardHeader,
  CardTitle,
  IconWrapper,
  NavigationLink,
  SummaryList,
  SummaryListItem,
  SummaryValue,
} from './styles';
import type { SummaryCardProps } from './types';

export const SummaryCard = ({
  title,
  icon,
  items,
  to,
}: SummaryCardProps) => {
  return (
    <Card data-testid="summary-card">
      <CardHeader>
        <IconWrapper aria-hidden="true">{icon}</IconWrapper>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <SummaryList>
        {items.map((item, index) => (
          <SummaryListItem
            key={`${item.label}-${index}`}
          >
            <span>{item.label}</span>
            <SummaryValue>{item.value}</SummaryValue>
          </SummaryListItem>
        ))}
      </SummaryList>

      {to && (
        <NavigationLink to={to}>
          View details
        </NavigationLink>
      )}
    </Card>
  );
};