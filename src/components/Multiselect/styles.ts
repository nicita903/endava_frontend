import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Separator = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border.light};
`;

export const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Checkbox = styled.input`
  cursor: pointer;
`;
