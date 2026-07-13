import type { Owner } from '../../api/owners/types';
import type { SelectOption } from '../../types/common';

/**
 * Splits a stored owner driver category string into category values.
 */
const getOwnerDriverCategories = (category?: string | null) =>
  category
    ? category
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

/**
 * Builds driver category filter options from loaded owner rows when the category endpoint is empty.
 */
export const getFallbackDriverCategoryOptions = (
  owners?: Owner[]
): SelectOption[] => {
  const categories = new Set<string>();

  if (owners === undefined) {
    return [];
  }

  owners.forEach((owner) => {
    getOwnerDriverCategories(owner?.driver_license_cat).forEach(
      (category) => categories.add(category)
    );
  });

  return [...categories].sort().map((category) => ({
    label: category,
    value: category,
  }));
};

/**
 * Converts API driver categories into select options.
 */
export const getDriverCategoryOptions = (
  categories: string[]
): SelectOption[] =>
  categories.map((category) => ({
    label: category,
    value: category,
  }));

/**
 * Maps the owner search input into an email API query param.
 */
export const getOwnerSearchParams = (search: string) => {
  if (!search) {
    return {};
  }

  return { email: search };
};
