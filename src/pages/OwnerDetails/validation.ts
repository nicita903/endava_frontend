import type {
  OwnerFormErrors,
  OwnerFormValues,
} from './types';
import { getBirthYear } from './utils';

/**
 * Checks whether a birthdate belongs to an adult owner.
 */
const isAtLeast18YearsOld = (birthdate: string) => {
  const [year, month, day] = birthdate
    .split('-')
    .map(Number);

  if (!year || !month || !day) {
    return false;
  }

  const today = new Date();
  const eighteenthBirthday = new Date(
    year + 18,
    month - 1,
    day
  );

  return eighteenthBirthday <= today;
};

/**
 * Returns field errors for the create-owner form.
 */
export const validateOwnerForm = (
  formValues: OwnerFormValues
): OwnerFormErrors => {
  const nextErrors: OwnerFormErrors = {};

  if (!formValues.name.trim()) {
    nextErrors.name = 'Name is required.';
  }

  if (!formValues.birthdate) {
    nextErrors.birthdate = 'Birthdate is required.';
  } else if (!isAtLeast18YearsOld(formValues.birthdate)) {
    nextErrors.birthdate =
      'Owner must be at least 18 years old.';
  }

  const birthYear = getBirthYear(formValues.birthdate);
  const licenseYear = Number(
    formValues.year_of_driver_license
  );

  if (!formValues.year_of_driver_license) {
    nextErrors.year_of_driver_license =
      'License year is required.';
  } else if (!Number.isFinite(licenseYear)) {
    nextErrors.year_of_driver_license =
      'Enter a valid license year.';
  } else if (
    birthYear !== null &&
    licenseYear <= birthYear
  ) {
    nextErrors.year_of_driver_license =
      'License year must be after birthdate.';
  }

  if (
    formValues.email.trim() &&
    !formValues.email.includes('@')
  ) {
    nextErrors.email = 'Enter a valid email address.';
  }

  return nextErrors;
};
