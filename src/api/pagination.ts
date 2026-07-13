import type { PaginatedResponse } from '../types/common';

export interface PaginationParams {
  page?: number;
  per_page?: number;
}

export const appendPaginationSearchParams = (
  searchParams: URLSearchParams,
  params?: PaginationParams
) => {
  if (params?.page !== undefined) {
    searchParams.set('page', String(params.page));
  }

  if (params?.per_page !== undefined) {
    searchParams.set('per_page', String(params.per_page));
  }
};

export const parsePaginatedResponse = <T>(
  data: unknown
): PaginatedResponse<T> | null => {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const response = data as {
    count?: unknown;
    items?: unknown;
    next_page?: unknown;
    previous_page?: unknown;
  };

  if (
    typeof response.count !== 'number' ||
    !Number.isFinite(response.count) ||
    response.count < 0 ||
    !Array.isArray(response.items) ||
    !isNullableString(response.next_page) ||
    !isNullableString(response.previous_page)
  ) {
    return null;
  }

  return {
    count: response.count,
    items: response.items as T[],
    nextPage: response.next_page ?? null,
    previousPage: response.previous_page ?? null,
  };
};

const isNullableString = (value: unknown) =>
  value == null || typeof value === 'string';
