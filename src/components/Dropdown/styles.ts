import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Select = styled.select<{ $error?: boolean }>`
  appearance: none;
  padding: 12px 40px 12px 12px;
  border-radius: 6px;
  border: 1px solid
    ${({ $error, theme }) =>
      $error ? theme.colors.error : theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.background.card};
  background-image:
    linear-gradient(45deg, transparent 50%, currentColor 50%),
    linear-gradient(135deg, currentColor 50%, transparent 50%);
  background-position:
    calc(100% - 18px) 50%,
    calc(100% - 12px) 50%;
  background-repeat: no-repeat;
  background-size:
    6px 6px,
    6px 6px;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }

  &:disabled {
    border-color: ${({ theme }) => theme.colors.border.light};
    background-color: ${({ theme }) => theme.colors.background.page};
    color: ${({ theme }) => theme.colors.text.muted};
    cursor: not-allowed;
    opacity: 1;
  }
`;
