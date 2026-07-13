import { useEffect, useState } from 'react';

import { API_ERROR_MESSAGES } from '../../../api/constants';
import { getDriverCategories } from '../../../api/driverCategories/getDriverCategories';
import { getApiErrorMessage } from '../../../api/errors';
import { getOwners } from '../../../api/owners/getOwners';
import type {
  DriverLicenseCategory,
  Owner,
} from '../../../api/owners/types';
import { usePagination } from '../../../hooks/usePagination';
import type { SelectOption } from '../../../types/common';

import { DEFAULT_OWNER_FILTERS } from '../constants';
import type { OwnerFilters } from '../types';
import {
  getDriverCategoryOptions,
  getFallbackDriverCategoryOptions,
  getOwnerSearchParams,
} from '../utils';

/**
 * Owns Owners page list data, search, filters, pagination, and loading state.
 */
export const useOwnersData = () => {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [filters, setFilters] = useState<OwnerFilters>(
    DEFAULT_OWNER_FILTERS
  );
  const [searchValue, setSearchValue] = useState(
    DEFAULT_OWNER_FILTERS.search
  );
  const [driverCategoryOptions, setDriverCategoryOptions] =
    useState<SelectOption[]>([]);
  const {
    pagination,
    resetPagination,
    updatePagination,
  } = usePagination();
  const [hasNextOwnersPage, setHasNextOwnersPage] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [retryRequestKey, setRetryRequestKey] = useState(0);
  const driverCategoryFilterKey =
    filters.driverCategories.join('|');

  useEffect(() => {
    let isCurrentRequest = true;

    /**
     * Loads driver category filter options.
     */
    const fetchDriverCategories = async () => {
      try {
        const categories = await getDriverCategories();

        if (isCurrentRequest) {
          setDriverCategoryOptions(
            categories.length
              ? getDriverCategoryOptions(categories)
              : []
          );
        }
      } catch (error) {
        console.error(error);

        if (isCurrentRequest) {
          setDriverCategoryOptions([]);
        }
      }
    };

    fetchDriverCategories();

    return () => {
      isCurrentRequest = false;
    };
  }, []);

  useEffect(() => {
    const nextSearch = searchValue.trim();

    if (nextSearch === filters.search) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setFilters((previousFilters) => ({
        ...previousFilters,
        search: nextSearch,
      }));
      resetPagination();
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [filters.search, resetPagination, searchValue]);

  useEffect(() => {
    let isCurrentRequest = true;

    /**
     * Loads owners with the current filters, search, and pagination.
     */
    const fetchOwnersData = async () => {
      setIsLoading(true);
      setErrorMessage('');
      const driverCategories = driverCategoryFilterKey
        ? driverCategoryFilterKey.split('|')
        : [];
      const ownerSearchParams = getOwnerSearchParams(
        filters.search
      );

      try {
        const ownersResponse = await getOwners({
          driver_license_cat:
            driverCategories as DriverLicenseCategory[],
          ...ownerSearchParams,
          page: pagination.page,
          per_page: pagination.size,
        });

        if (!isCurrentRequest) {
          return;
        }

        const ownersData = ownersResponse.items;

        setOwners(ownersData);
        setHasNextOwnersPage(!!ownersResponse.nextPage);
        setDriverCategoryOptions((previousOptions) =>
          previousOptions.length
            ? previousOptions
            : getFallbackDriverCategoryOptions(ownersData)
        );
      } catch (error) {
        console.error(error);

        if (!isCurrentRequest) {
          return;
        }

        setOwners([]);
        setHasNextOwnersPage(false);
        setErrorMessage(
          getApiErrorMessage(error, API_ERROR_MESSAGES.GET_OWNERS)
        );
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    };

    fetchOwnersData();

    return () => {
      isCurrentRequest = false;
    };
  }, [
    driverCategoryFilterKey,
    filters.search,
    pagination.page,
    pagination.size,
    retryRequestKey,
  ]);

  /**
   * Applies a driver category filter and resets pagination.
   */
  const handleDriverCategoryFilterChange = (
    value: string | string[]
  ) => {
    const driverCategories = Array.isArray(value)
      ? value
      : [value].filter(Boolean);

    setFilters((previousFilters) => ({
      ...previousFilters,
      driverCategories,
    }));
    resetPagination();
  };

  /**
   * Retries the latest owners request.
   */
  const retryOwnersRequest = () =>
    setRetryRequestKey((previousKey) => previousKey + 1);

  return {
    driverCategoryOptions,
    errorMessage,
    filters,
    handleDriverCategoryFilterChange,
    handlePaginationChange: updatePagination,
    hasNextOwnersPage,
    isLoading,
    owners,
    pagination,
    retryOwnersRequest,
    searchValue,
    setSearchValue,
  };
};
