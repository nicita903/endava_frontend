import { useCallback, useState } from 'react';

import type { TablePaginationState } from '../components/Table/types';
import { DEFAULT_PAGINATION } from '../constants/pagination';

/**
 * Owns reusable pagination state and common pagination updates.
 */
export const usePagination = (
  initialPagination = DEFAULT_PAGINATION
) => {
  const [pagination, setPagination] =
    useState<TablePaginationState>(initialPagination);

  /**
   * Applies pagination changes while avoiding no-op state updates.
   */
  const updatePagination = useCallback(
    (nextPagination: TablePaginationState) => {
      setPagination((previousPagination) => {
        if (
          previousPagination.page === nextPagination.page &&
          previousPagination.size === nextPagination.size
        ) {
          return previousPagination;
        }

        return nextPagination;
      });
    },
    []
  );

  /**
   * Resets pagination to the first page.
   */
  const resetPagination = useCallback(
    () => {
      setPagination((previousPagination) => {
        if (previousPagination.page === 1) {
          return previousPagination;
        }

        return {
          ...previousPagination,
          page: 1,
        };
      });
    },
    []
  );

  return {
    pagination,
    resetPagination,
    updatePagination,
  };
};
