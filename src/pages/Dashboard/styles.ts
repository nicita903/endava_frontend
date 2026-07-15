import styled from 'styled-components';

export const DashboardPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns:
    repeat(4, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns:
    repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

export const MoreButton = styled.button`
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 26px;
  cursor: pointer;
`;  