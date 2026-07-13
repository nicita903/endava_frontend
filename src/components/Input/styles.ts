import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledInput = styled.input<{ $error?: boolean }>`
  padding: 12px;
  border-radius: 6px;
  border: 1px solid
    ${({ $error, theme }) =>
      $error ? theme.colors.error : theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.background.card};
  color: ${({ theme }) => theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;
