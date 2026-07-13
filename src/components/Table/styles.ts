import styled from 'styled-components';

import { Select } from '../Dropdown/styles';

const TABLE_ROW_HEIGHT = 48;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;

  &:has([aria-haspopup='dialog'][aria-expanded='true']) {
    padding-bottom: 360px;
    margin-bottom: -360px;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.primary[50]};
`;

export const TableFooter = styled.tfoot`
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const TableHeader = styled.th`
  padding: 12px;
  height: ${TABLE_ROW_HEIGHT}px;
  text-align: left;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const TableHeaderContent = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const TableRow = styled.tr<{ $clickable?: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};

  &:hover {
    background-color: ${({ $clickable, theme }) =>
      $clickable ? theme.colors.primary[50] : 'transparent'};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.border.strong};
    outline-offset: -2px;
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  height: ${TABLE_ROW_HEIGHT}px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const TableStateCell = styled.td`
  height: 96px;
  padding: 24px 12px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: inherit;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
`;

export const TableRetryButton = styled.button`
  display: inline;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary[500]};
  cursor: pointer;
  font: inherit;
  text-decoration: underline;

  &:hover {
    text-decoration-thickness: 2px;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.border.strong};
    outline-offset: 2px;
  }
`;

export const PaginationCell = styled.td`
  padding: 16px 0 0;
`;

export const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  width: 100%;
`;

export const PaginationSizeControl = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
`;

export const PaginationSizeSelect = styled(Select)`
  min-width: 96px;
  padding: 8px 40px 8px 10px;
  font-size: 14px;
`;

export const PaginationInfo = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
`;
