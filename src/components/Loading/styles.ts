import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingWrapper = styled.div<{ $fullScreen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: ${({ $fullScreen }) =>
    $fullScreen ? '100vh' : 'auto'};
  position: ${({ $fullScreen }) =>
    $fullScreen ? 'fixed' : 'static'};
  inset: ${({ $fullScreen }) =>
    $fullScreen ? '0' : 'auto'};
  z-index: ${({ $fullScreen }) =>
    $fullScreen ? '1000' : 'auto'};
  background-color: ${({ $fullScreen, theme }) =>
    $fullScreen
      ? theme.colors.background.card
      : 'transparent'};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
`;

export const Spinner = styled.span`
  width: 18px;
  height: 18px;
  border: 2px solid ${({ theme }) => theme.colors.border.default};
  border-top-color: ${({ theme }) => theme.colors.primary[500]};
  border-radius: 50%;
  animation: ${spin} 700ms linear infinite;
`;
