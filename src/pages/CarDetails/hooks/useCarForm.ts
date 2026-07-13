import { useState } from 'react';

import { DEFAULT_CAR_FORM_VALUES } from '../constants';
import type {
  CarFormErrors,
  CarFormValues,
} from '../types';
import {
  hasValidationErrors,
  validateCarForm,
} from '../validation';

/**
 * Owns add/view car form values, field errors, updates, and validation.
 */
export const useCarForm = (ownerId: string) => {
  const [values, setValues] = useState<CarFormValues>(() => ({
    ...DEFAULT_CAR_FORM_VALUES,
    owner_id: ownerId,
  }));
  const [errors, setErrors] = useState<CarFormErrors>({});

  /**
   * Updates a car form field and clears its validation error.
   */
  const updateField = (
    field: keyof CarFormValues,
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
   * Validates current car form values and stores field errors.
   */
  const validate = () => {
    const nextErrors = validateCarForm(values);

    setErrors(nextErrors);

    return !hasValidationErrors(nextErrors);
  };

  return {
    errors,
    setValues,
    updateField,
    validate,
    values,
  };
};
