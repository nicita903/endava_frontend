import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: rgba(17, 24, 39, 0.5);
`;

export const Dialog = styled.div<{ $width?: string }>`
  width: ${({ $width }) => `min(100%, ${$width ?? '520px'})`};
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  padding: 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background.elevated};
  box-shadow:
    0 20px 25px rgba(0, 0, 0, 0.1),
    0 10px 10px rgba(0, 0, 0, 0.04);
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

export const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 20px;
  line-height: 1.3;
`;

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  border: none;
  border-radius: 6px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  font-size: 18px;
  line-height: 1;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[50]};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const Description = styled.div`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  line-height: 1.5;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
`;
