import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    min-height: 100%;
  }

  body {
    font-family: sans-serif;
    background-color: ${({ theme }) => theme.colors.background.page};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;
