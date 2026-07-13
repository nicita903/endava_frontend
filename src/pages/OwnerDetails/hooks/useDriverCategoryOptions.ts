import { useEffect, useState } from 'react';

import { getDriverCategories } from '../../../api/driverCategories/getDriverCategories';
import type { SelectOption } from '../../../types/common';

import { getDriverCategoryOptions } from '../utils';

/**
 * Loads driver category dropdown options for the owner form.
 */
export const useDriverCategoryOptions = () => {
  const [driverCategoryOptions, setDriverCategoryOptions] =
    useState<SelectOption[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] =
    useState(true);

  useEffect(() => {
    let isCurrentRequest = true;

    /**
     * Loads driver categories and keeps the empty option available.
     */
    const fetchDriverCategories = async () => {
      setIsLoadingCategories(true);

      try {
        const categories = await getDriverCategories();

        if (isCurrentRequest) {
          setDriverCategoryOptions(
            getDriverCategoryOptions(categories)
          );
        }
      } catch (error) {
        console.error(error);

        if (isCurrentRequest) {
          setDriverCategoryOptions(getDriverCategoryOptions([]));
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoadingCategories(false);
        }
      }
    };

    fetchDriverCategories();

    return () => {
      isCurrentRequest = false;
    };
  }, []);

  return {
    driverCategoryOptions,
    hasDriverCategoryOptions: driverCategoryOptions.length > 1,
    isLoadingCategories,
  };
};
