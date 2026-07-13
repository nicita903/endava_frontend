import styled from 'styled-components';

export const StyledLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Required = styled.span`
  color: ${({ theme }) => theme.colors.error};
`;
