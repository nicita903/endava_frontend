import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledCalendarInput = styled.input<{
  $error?: boolean;
}>`
  padding: 12px;
  border: 1px solid
    ${({ $error, theme }) =>
      $error ? theme.colors.error : theme.colors.border.default};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.background.card};
  color: ${({ theme }) => theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;
