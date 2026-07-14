import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 180px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 10px;
  background-color: ${({ theme }) =>
    theme.colors.background.card};
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  min-height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary[50]};
  font-size: 22px;
`;

export const CardTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 18px;
`;

export const StatisticValue = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 36px;
  font-weight: 700;
`;

export const SummaryList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const SummaryListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const SummaryValue = styled.strong`
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const NavigationLink = styled(Link)`
  width: fit-content;
  margin-top: auto;
  color: ${({ theme }) => theme.colors.accent[500]};
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) =>
      theme.colors.border.strong};
    outline-offset: 2px;
  }
`;