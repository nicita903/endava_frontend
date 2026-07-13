import type {
  DriverLicenseCategory,
  SaveOwnerPayload,
} from '../../api/owners/types';
import type { SelectOption } from '../../types/common';

import { EMPTY_DRIVER_CATEGORY_OPTION } from './constants';
import type { OwnerFormValues } from './types';

/**
 * Converts API driver categories into dropdown options for the owner form.
 */
export const getDriverCategoryOptions = (
  categories: string[]
): SelectOption[] => [
  EMPTY_DRIVER_CATEGORY_OPTION,
  ...categories.map((category) => ({
    label: category,
    value: category,
  })),
];

/**
 * Returns the year part from a birthdate field value.
 */
export const getBirthYear = (birthdate: string) => {
  if (!birthdate) {
    return null;
  }

  const [year] = birthdate.split('-').map(Number);

  return Number.isFinite(year) ? year : null;
};

/**
 * Builds the API payload for creating an owner.
 */
export const getSaveOwnerPayload = (
  formValues: OwnerFormValues
): SaveOwnerPayload => ({
  name: formValues.name.trim(),
  birthdate: formValues.birthdate,
  year_of_driver_license:
    Number(formValues.year_of_driver_license) || 0,
  driver_license_cat:
    (formValues.driver_license_cat as DriverLicenseCategory) ||
    null,
  email: formValues.email.trim() || null,
});
