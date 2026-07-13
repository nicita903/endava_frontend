import styled from 'styled-components';

export const StyledError = styled.span`
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
`;
