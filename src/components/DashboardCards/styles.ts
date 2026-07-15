import { Link } from 'react-router-dom';
import styled from 'styled-components';

import type { CardTone } from './types';

const getToneColor = (
  tone: CardTone,
  theme: {
    colors: {
      chart: {
        blue: string;
        green: string;
        orange: string;
        purple: string;
      };
    };
  }
) => {
  return theme.colors.chart[tone];
};

export const StatisticCardContainer = styled.article`
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 126px;
  padding: 20px;
  border: 1px solid
    ${({ theme }) => theme.colors.border.light};
  border-radius: 12px;
  background-color:
    ${({ theme }) => theme.colors.background.card};
  box-shadow: 0 4px 14px rgb(15 23 42 / 5%);
`;

export const StatisticIconWrapper = styled.div<{
  $tone: CardTone;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 56px;
  width: 56px;
  height: 56px;
  border-radius: 15px;
  background-color: ${({ $tone, theme }) =>
    `${getToneColor($tone, theme)}18`};
  color: ${({ $tone, theme }) =>
    getToneColor($tone, theme)};

  svg {
    width: 30px;
    height: 30px;
  }
`;

export const StatisticContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
`;

export const CardTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 14px;
  font-weight: 600;
`;

export const StatisticValue = styled.p`
  margin: 4px 0 10px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 28px;
  font-weight: 700;
`;

export const NavigationLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.primary[500]};
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) => theme.colors.border.strong};
    outline-offset: 2px;
  }
`;

export const SummaryCardContainer = styled.article`
  overflow: hidden;
  border: 1px solid
    ${({ theme }) => theme.colors.border.light};
  border-radius: 12px;
  background-color:
    ${({ theme }) => theme.colors.background.card};
  box-shadow: 0 4px 14px rgb(15 23 42 / 5%);
`;

export const SummaryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px;
`;

export const SummaryHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const SummaryTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 18px;
`;

export const SummaryDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 13px;
`;

export const SummaryIconWrapper = styled.div<{
  $tone: CardTone;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 42px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: ${({ $tone, theme }) =>
    `${getToneColor($tone, theme)}18`};
  color: ${({ $tone, theme }) =>
    getToneColor($tone, theme)};

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const SummaryList = styled.ul`
  margin: 0;
  padding: 0 20px;
  border-top: 1px solid
    ${({ theme }) => theme.colors.border.light};
  list-style: none;
`;

export const SummaryListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 48px;
  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border.light};
  color: ${({ theme }) => theme.colors.text.secondary};

  &:last-child {
    border-bottom: 0;
  }
`;

export const SummaryValue = styled.strong`
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SummaryFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 14px 20px;
  border-top: 1px solid
    ${({ theme }) => theme.colors.border.light};
  background-color:
    ${({ theme }) => theme.colors.primary[50]};
`;