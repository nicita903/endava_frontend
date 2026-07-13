import styled from 'styled-components';

export const Page = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.page};
`;

export const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
  box-sizing: border-box;
`;
