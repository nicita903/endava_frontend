import styled from 'styled-components';

export const SwitchContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
`;

export const SwitchLabel = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 14px;
  font-weight: 500;
`;

export const SwitchButton = styled.button<{ $checked: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${({ $checked, theme }) =>
    $checked ? theme.colors.text.primary : theme.colors.text.secondary};
  cursor: pointer;
  font-size: 14px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const SwitchTrack = styled.span<{ $checked: boolean }>`
  position: relative;
  width: 44px;
  height: 24px;
  flex: 0 0 auto;
  border-radius: 999px;
  background-color: ${({ $checked, theme }) =>
    $checked
      ? theme.colors.primary[500]
      : theme.colors.border.default};
  transition: background-color 150ms ease;
`;

export const SwitchThumb = styled.span<{ $checked: boolean }>`
  position: absolute;
  top: 3px;
  left: ${({ $checked }) => ($checked ? '23px' : '3px')};
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.background.card};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: left 150ms ease;
`;

export const SwitchText = styled.span`
  white-space: nowrap;
`;
