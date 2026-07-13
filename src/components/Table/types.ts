import type { TableFilter } from './TableFilters/types';

export interface TableColumn<T> {
  key: keyof T;
  header: string;
}

export interface TablePaginationState {
  page: number;
  size: number;
}

export interface TablePagination extends TablePaginationState {
  onChange: (pagination: TablePaginationState) => void;
  sizeOptions?: number[];
  hasNextPage?: boolean;
}

export interface TableProps<T extends object> {
  columns: TableColumn<T>[];
  data?: T[];
  'data-testid'?: string;
  filters?: TableFilter<T>[];
  emptyMessage?: string;
  errorMessage?: string;
  isLoading?: boolean;
  loadingMessage?: string;
  onRowClick?: (row: T) => void;
  onRetry?: () => void;
  pagination?: TablePagination;
}
