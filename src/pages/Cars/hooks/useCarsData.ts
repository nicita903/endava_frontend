import { useEffect, useState } from "react";

import { getCars } from "../../../api/cars/getCars";
import type { Car, CarCategory } from "../../../api/cars/types";
import { API_ERROR_MESSAGES } from "../../../api/constants";
import { getApiErrorMessage } from "../../../api/errors";
import { usePagination } from "../../../hooks/usePagination";
import type { SelectOption } from "../../../types/common";

import { DEFAULT_CARS_FILTERS } from "../constants";
import type { CarsFilters } from "../types";
import { getCarOptions } from "../utils";

/**
 * Owns Cars page list data, filters, pagination, and loading state.
 */
export const useCarsData = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filters, setFilters] = useState<CarsFilters>(DEFAULT_CARS_FILTERS);
  const [makeOptions, setMakeOptions] = useState<SelectOption[]>([]);
  const [modelOptions, setModelOptions] = useState<SelectOption[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
  const { pagination, resetPagination, updatePagination } = usePagination();
  const [hasNextCarsPage, setHasNextCarsPage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [retryRequestKey, setRetryRequestKey] = useState(0);

  useEffect(() => {
    let isCurrentRequest = true;

    /**
     * Loads cars with the current filters and pagination.
     */
    const fetchCarsData = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const carsResponse = await getCars({
          page: pagination.page,
          per_page: pagination.size,
          make: filters.make || undefined,
          model: filters.model || undefined,
          category: filters.category || undefined,
        });

        if (!isCurrentRequest) {
          return;
        }

        const carsData = carsResponse.items;

        setCars(carsData);
        setHasNextCarsPage(!!carsResponse.nextPage);
        setMakeOptions((previousOptions) =>
          previousOptions.length
            ? previousOptions
            : getCarOptions(carsData, "make"),
        );
        setModelOptions((previousOptions) =>
          previousOptions.length
            ? previousOptions
            : getCarOptions(carsData, "model"),
        );
        setCategoryOptions((previousOptions) =>
          previousOptions.length
            ? previousOptions
            : getCarOptions(carsData, "category"),
        );
      } catch (error) {
        console.error(error);

        if (!isCurrentRequest) {
          return;
        }

        setCars([]);
        setHasNextCarsPage(false);
        setErrorMessage(getApiErrorMessage(error, API_ERROR_MESSAGES.GET_CARS));
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    };

    fetchCarsData();

    return () => {
      isCurrentRequest = false;
    };
  }, [
    filters.category,
    filters.make,
    filters.model,
    pagination.page,
    pagination.size,
    retryRequestKey,
  ]);

  /**
   * Applies a table filter and resets pagination to the first page.
   */
  const handleFilterChange = (
    filterName: keyof CarsFilters,
    value: string | string[],
  ) => {
    const nextValue = Array.isArray(value) ? (value[0] ?? "") : value;

    setFilters((previousFilters) => ({
      ...previousFilters,
      [filterName]:
        filterName === "category" ? (nextValue as CarCategory | "") : nextValue,
    }));
    resetPagination();
  };

  /**
   * Retries the latest cars request.
   */
  const retryCarsRequest = () =>
    setRetryRequestKey((previousKey) => previousKey + 1);

  return {
    cars,
    categoryOptions,
    errorMessage,
    filters,
    handleFilterChange,
    handlePaginationChange: updatePagination,
    hasNextCarsPage,
    isLoading,
    makeOptions,
    modelOptions,
    pagination,
    refreshCars: retryCarsRequest,
    retryCarsRequest,
  };
};
