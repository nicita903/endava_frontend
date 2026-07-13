import styled from 'styled-components';

export const FilterWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active
        ? theme.colors.primary[500]
        : theme.colors.border.default};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.background.card};
  cursor: pointer;
  color: ${({ $active, theme }) =>
    $active
      ? theme.colors.primary[500]
      : theme.colors.text.secondary};
  padding: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[50]};
    color: ${({ theme }) => theme.colors.primary[500]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.border.strong};
    outline-offset: 2px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 1px;
    right: 1px;
    width: 10px;
    height: 10px;
    border: 2px solid ${({ theme }) => theme.colors.background.card};
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.warning};
    opacity: ${({ $active }) => ($active ? 1 : 0)};
  }
`;

export const FilterPopover = styled.div`
  position: absolute;

  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);

  z-index: 1000;

  width: max-content;
  min-width: 250px;
  max-width: min(320px, calc(100vw - 32px));
  max-height: min(360px, calc(100vh - 160px));
  overflow-y: auto;

  padding: 16px;

  background-color: ${({ theme }) => theme.colors.background.elevated};

  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 8px;

  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 10px 15px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PopoverHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PopoverTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CloseButton = styled.button`
  border: none;
  border-radius: 4px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[50]};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.border.strong};
    outline-offset: 2px;
  }
`;
