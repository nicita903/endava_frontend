import styled from 'styled-components';

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(260px, 1fr)
  );
  gap: 20px;
  margin-top: 24px;
`;