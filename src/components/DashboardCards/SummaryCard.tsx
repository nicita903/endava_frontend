import {
  NavigationLink,
  SummaryCardContainer,
  SummaryDescription,
  SummaryFooter,
  SummaryHeader,
  SummaryHeading,
  SummaryIconWrapper,
  SummaryList,
  SummaryListItem,
  SummaryTitle,
  SummaryValue,
} from './styles';
import type { SummaryCardProps } from './types';

export const SummaryCard = ({
  title,
  description,
  icon,
  items,
  tone = 'blue',
  to,
  linkLabel = 'View details',
}: SummaryCardProps) => {
  return (
    <SummaryCardContainer data-testid="summary-card">
      <SummaryHeader>
        <SummaryHeading>
          <SummaryTitle>{title}</SummaryTitle>

          {description && (
            <SummaryDescription>
              {description}
            </SummaryDescription>
          )}
        </SummaryHeading>

        <SummaryIconWrapper
          $tone={tone}
          aria-hidden="true"
        >
          {icon}
        </SummaryIconWrapper>
      </SummaryHeader>

      <SummaryList>
        {items.map((item) => (
          <SummaryListItem key={item.label}>
            <span>{item.label}</span>
            <SummaryValue>{item.value}</SummaryValue>
          </SummaryListItem>
        ))}
      </SummaryList>

      {to && (
        <SummaryFooter>
          <NavigationLink to={to}>
            {linkLabel}
            <span aria-hidden="true">→</span>
          </NavigationLink>
        </SummaryFooter>
      )}
    </SummaryCardContainer>
  );
};