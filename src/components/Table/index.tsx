import {
  useId,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';

import { Button } from '../Button';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '../Icons';
import { Loading } from '../Loading';

import { TableFilter } from './TableFilters';

import {
  EmptyMessage,
  PaginationCell,
  PaginationInfo,
  PaginationSizeControl,
  PaginationSizeSelect,
  PaginationWrapper,
  StyledTable,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableHeaderContent,
  TableRetryButton,
  TableRow,
  TableStateCell,
  TableWrapper,
} from './styles';

import type { TableProps } from './types';

const INTERACTIVE_ELEMENT_SELECTOR =
  'a, button, input, select, textarea, [role="button"], [role="link"]';

const isFromInteractiveElement = (
  target: EventTarget | null,
  currentTarget: HTMLElement
) =>
  target instanceof Element &&
  currentTarget.contains(target) &&
  !!target.closest(INTERACTIVE_ELEMENT_SELECTOR);

export const Table = <T extends object>({
  columns,
  data,
  'data-testid': dataTestId = 'table',
  filters = [],
  emptyMessage = 'No data available.',
  errorMessage = '',
  isLoading = false,
  loadingMessage = 'Loading...',
  onRowClick,
  onRetry,
  pagination,
}: TableProps<T>) => {
  const paginationSizeSelectId = useId();
  const rows = data ?? [];
  const getFilterForColumn = (columnKey: keyof T) =>
    filters.find((filter) => filter.columnKey === columnKey);

  const hasError = !!errorMessage;

  if (!rows.length && !pagination && !isLoading && !hasError) {
    return (
      <EmptyMessage data-testid={`${dataTestId}-empty`}>
        {emptyMessage}
      </EmptyMessage>
    );
  }

  const pageSize = pagination
    ? Math.max(pagination.size, 1)
    : Math.max(rows.length, 1);
  const currentPage = pagination
    ? Math.max(pagination.page, 1)
    : 1;
  const hasNextPage = pagination
    ? (pagination.hasNextPage ?? rows.length >= pageSize)
    : false;
  const handlePageChange = (page: number) => {
    if (!pagination) {
      return;
    }

    const nextPage = Math.max(page, 1);

    if (nextPage === currentPage && pageSize === pagination.size) {
      return;
    }

    pagination.onChange({
      page: nextPage,
      size: pageSize,
    });
  };
  const handlePageSizeChange = (size: number) => {
    if (!pagination) {
      return;
    }

    if (currentPage === 1 && size === pageSize) {
      return;
    }

    pagination.onChange({
      page: 1,
      size,
    });
  };
  const handleRowClick = (
    event: MouseEvent<HTMLTableRowElement>,
    row: T
  ) => {
    if (
      !onRowClick ||
      isFromInteractiveElement(event.target, event.currentTarget)
    ) {
      return;
    }

    onRowClick(row);
  };
  const handleRowKeyDown = (
    event: KeyboardEvent<HTMLTableRowElement>,
    row: T
  ) => {
    if (!onRowClick || event.target !== event.currentTarget) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onRowClick(row);
    }
  };

  return (
    <>
      {rows.length || pagination || isLoading || hasError ? (
        <TableWrapper data-testid={`${dataTestId}-wrapper`}>
          <StyledTable data-testid={dataTestId}>
            <TableHead>
              <TableRow data-testid={`${dataTestId}-header-row`}>
                {columns.map((column) => {
                  const filter = getFilterForColumn(column.key);
                  const columnTestId = String(column.key);

                  return (
                    <TableHeader
                      key={columnTestId}
                      data-testid={`${dataTestId}-header-${columnTestId}`}
                    >
                      <TableHeaderContent>
                        <span>{column.header}</span>
                        {filter && (
                          <TableFilter
                            filter={filter}
                            data-testid={`${dataTestId}-filter-${columnTestId}`}
                          />
                        )}
                      </TableHeaderContent>
                    </TableHeader>
                  );
                })}
              </TableRow>
            </TableHead>

            <tbody>
              {hasError ? (
                <TableRow data-testid={`${dataTestId}-error-row`}>
                  <TableStateCell
                    colSpan={columns.length}
                    data-testid={`${dataTestId}-error`}
                  >
                    {errorMessage}
                    {onRetry && (
                      <>
                        {' '}
                        Please{' '}
                        <TableRetryButton
                          type="button"
                          data-testid={`${dataTestId}-retry`}
                          onClick={onRetry}
                        >
                          retry
                        </TableRetryButton>
                        .
                      </>
                    )}
                  </TableStateCell>
                </TableRow>
              ) : isLoading ? (
                <TableRow data-testid={`${dataTestId}-loading-row`}>
                  <TableStateCell
                    colSpan={columns.length}
                    data-testid={`${dataTestId}-loading`}
                  >
                    <Loading
                      message={loadingMessage}
                      fullScreen={false}
                      data-testid={`${dataTestId}-loading-status`}
                    />
                  </TableStateCell>
                </TableRow>
              ) : (
                rows.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    $clickable={!!onRowClick}
                    data-testid={`${dataTestId}-row-${rowIndex}`}
                    tabIndex={onRowClick ? 0 : undefined}
                    aria-label={
                      onRowClick ? 'Open row details' : undefined
                    }
                    onClick={(event) =>
                      handleRowClick(event, row)
                    }
                    onKeyDown={(event) =>
                      handleRowKeyDown(event, row)
                    }
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={String(column.key)}
                        data-testid={`${dataTestId}-cell-${rowIndex}-${String(
                          column.key
                        )}`}
                      >
                        {row[column.key] as ReactNode}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}

              {!hasError && !isLoading && !rows.length && (
                <TableRow data-testid={`${dataTestId}-empty-row`}>
                  <TableStateCell
                    colSpan={columns.length}
                    data-testid={`${dataTestId}-empty`}
                  >
                    {emptyMessage}
                  </TableStateCell>
                </TableRow>
              )}
            </tbody>

            {pagination && (
              <TableFooter data-testid={`${dataTestId}-footer`}>
                <tr>
                  <PaginationCell colSpan={columns.length}>
                    <PaginationWrapper
                      data-testid={`${dataTestId}-pagination`}
                    >
                      {pagination.sizeOptions?.length ? (
                        <PaginationSizeControl
                          htmlFor={paginationSizeSelectId}
                        >
                          Rows
                          <PaginationSizeSelect
                            id={paginationSizeSelectId}
                            name="rowsPerPage"
                            value={pageSize}
                            disabled={hasError || isLoading}
                            data-testid={`${dataTestId}-page-size`}
                            onChange={(event) =>
                              handlePageSizeChange(
                                Number(event.target.value)
                              )
                            }
                          >
                            {pagination.sizeOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </PaginationSizeSelect>
                        </PaginationSizeControl>
                      ) : null}
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        aria-label="Previous page"
                        title="Previous page"
                        data-testid={`${dataTestId}-previous-page`}
                        disabled={
                          hasError || isLoading || currentPage === 1
                        }
                        onClick={() =>
                          handlePageChange(currentPage - 1)
                        }
                      >
                        <ChevronLeftIcon />
                      </Button>
                      <PaginationInfo>
                        Page {currentPage}
                      </PaginationInfo>
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        aria-label="Next page"
                        title="Next page"
                        data-testid={`${dataTestId}-next-page`}
                        disabled={hasError || isLoading || !hasNextPage}
                        onClick={() =>
                          handlePageChange(currentPage + 1)
                        }
                      >
                        <ChevronRightIcon />
                      </Button>
                    </PaginationWrapper>
                  </PaginationCell>
                </tr>
              </TableFooter>
            )}
          </StyledTable>
        </TableWrapper>
      ) : (
        <EmptyMessage data-testid={`${dataTestId}-empty`}>
          {emptyMessage}
        </EmptyMessage>
      )}
    </>
  );
};
