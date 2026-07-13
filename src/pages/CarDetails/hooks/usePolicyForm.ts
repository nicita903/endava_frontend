import { useState } from 'react';

import { DEFAULT_ADD_POLICY_FORM_VALUES } from '../constants';
import type {
  AddPolicyFormErrors,
  AddPolicyFormValues,
} from '../types';
import {
  hasValidationErrors,
  validatePolicyFormValues,
} from '../validation';

/**
 * Owns add-policy form values, field errors, submit error, updates, and validation.
 */
export const usePolicyForm = () => {
  const [values, setValues] = useState<AddPolicyFormValues>(
    DEFAULT_ADD_POLICY_FORM_VALUES
  );
  const [errors, setErrors] =
    useState<AddPolicyFormErrors>({});
  const [submitError, setSubmitError] = useState('');

  /**
   * Updates an add-policy form field and clears its validation error.
   */
  const updateField = (
    field: keyof AddPolicyFormValues,
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
   * Validates current add-policy form values and stores field errors.
   */
  const validate = () => {
    const nextErrors = validatePolicyFormValues(values);

    setErrors(nextErrors);

    return !hasValidationErrors(nextErrors);
  };

  /**
   * Restores the add-policy form to its initial state.
   */
  const reset = () => {
    setValues(DEFAULT_ADD_POLICY_FORM_VALUES);
    setErrors({});
    setSubmitError('');
  };

  return {
    errors,
    reset,
    setSubmitError,
    submitError,
    updateField,
    validate,
    values,
  };
};
