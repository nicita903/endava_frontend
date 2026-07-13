import { useState } from 'react';

import type {
  ClaimFormErrors,
  ClaimFormValues,
} from '../types';
import {
  getDefaultClaimFormValues,
} from '../utils';
import {
  hasValidationErrors,
  validateClaimFormValues,
} from '../validation';

/**
 * Owns add-claim form values, field errors, backend error, updates, and validation.
 */
export const useClaimForm = () => {
  const [values, setValues] = useState<ClaimFormValues>(
    getDefaultClaimFormValues
  );
  const [errors, setErrors] = useState<ClaimFormErrors>({});
  const [backendError, setBackendError] = useState('');

  /**
   * Updates an add-claim form field and clears its validation error.
   */
  const updateField = (
    field: keyof ClaimFormValues,
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
   * Validates current add-claim form values and stores field errors.
   */
  const validate = () => {
    const nextErrors = validateClaimFormValues(values);

    setErrors(nextErrors);

    return !hasValidationErrors(nextErrors);
  };

  /**
   * Restores the add-claim form to its initial state.
   */
  const reset = () => {
    setValues(getDefaultClaimFormValues());
    setErrors({});
    setBackendError('');
  };

  return {
    backendError,
    errors,
    reset,
    setBackendError,
    updateField,
    validate,
    values,
  };
};
