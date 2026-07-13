import { useState } from 'react';

import { DEFAULT_OWNER_FORM_VALUES } from '../constants';
import type {
  OwnerFormErrors,
  OwnerFormValues,
} from '../types';
import { validateOwnerForm } from '../validation';

/**
 * Owns owner form values, field errors, updates, and validation.
 */
export const useOwnerForm = () => {
  const [values, setValues] = useState<OwnerFormValues>(
    DEFAULT_OWNER_FORM_VALUES
  );
  const [errors, setErrors] = useState<OwnerFormErrors>({});

  /**
   * Updates an owner form field and clears its validation error.
   */
  const updateField = (
    field: keyof OwnerFormValues,
    value: string
  ) => {
    setErrors((previousErrors) => ({
      ...previousErrors,
      [field]: undefined,
    }));
    setValues((previousValues) => ({
      ...previousValues,
      [field]: value,
    }));
  };

  /**
   * Validates current owner form values and stores field errors.
   */
  const validate = () => {
    const nextErrors = validateOwnerForm(values);

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  return {
    errors,
    updateField,
    validate,
    values,
  };
};
