import type {
  AddPolicyFormErrors,
  AddPolicyFormValues,
  CarFormErrors,
  CarFormValues,
  ClaimFormErrors,
  ClaimFormValues,
} from './types';

/**
 * Validates that a required numeric form field is greater than zero.
 */
const validatePositiveNumber = (
  value: string,
  fieldLabel: string
) => {
  const numberValue = Number(value);

  if (!value) {
    return `${fieldLabel} is required.`;
  }

  if (!Number.isFinite(numberValue) || numberValue <= 0) {
    return `${fieldLabel} must be greater than 0.`;
  }

  return '';
};

/**
 * Returns field errors for the add-car form.
 */
export const validateCarForm = (
  formValues: CarFormValues
): CarFormErrors => {
  const nextErrors: CarFormErrors = {};

  if (!formValues.vin.trim()) {
    nextErrors.vin = 'VIN is required.';
  }

  const manufactureYearError = validatePositiveNumber(
    formValues.year_of_manufacture,
    'Year of manufacture'
  );

  if (manufactureYearError) {
    nextErrors.year_of_manufacture = manufactureYearError;
  } else if (
    Number(formValues.year_of_manufacture) >
    new Date().getFullYear()
  ) {
    nextErrors.year_of_manufacture =
      'Year of manufacture cannot be in the future.';
  }

  const powerError = validatePositiveNumber(
    formValues.power,
    'Power'
  );

  if (powerError) {
    nextErrors.power = powerError;
  }

  const ccError = validatePositiveNumber(formValues.cc, 'CC');

  if (ccError) {
    nextErrors.cc = ccError;
  }

  if (!formValues.owner_id.trim()) {
    nextErrors.owner_id = 'Owner is required.';
  }

  return nextErrors;
};

/**
 * Returns field errors for the add-policy form.
 */
export const validatePolicyFormValues = (
  policyFormValues: AddPolicyFormValues
): AddPolicyFormErrors => {
  const nextErrors: AddPolicyFormErrors = {};

  if (!policyFormValues.startDate) {
    nextErrors.startDate = 'Start date is required.';
  }

  if (!policyFormValues.endDate) {
    nextErrors.endDate = 'End date is required.';
  } else if (
    policyFormValues.startDate &&
    new Date(policyFormValues.endDate) <
      new Date(policyFormValues.startDate)
  ) {
    nextErrors.endDate =
      'End date must be after start date.';
  }

  const paidAmount = Number(policyFormValues.paid_amount);

  if (!policyFormValues.paid_amount) {
    nextErrors.paid_amount = 'Paid amount is required.';
  } else if (!Number.isFinite(paidAmount) || paidAmount < 0) {
    nextErrors.paid_amount =
      'Paid amount must be 0 or greater.';
  }

  return nextErrors;
};

/**
 * Returns field errors for the add-claim form.
 */
export const validateClaimFormValues = (
  claimFormValues: ClaimFormValues
): ClaimFormErrors => {
  const nextErrors: ClaimFormErrors = {};

  if (!claimFormValues.claim_date) {
    nextErrors.claim_date = 'Claim date is required.';
  }

  if (!claimFormValues.description.trim()) {
    nextErrors.description = 'Description is required.';
  }

  const amount = Number(claimFormValues.amount);

  if (!claimFormValues.amount) {
    nextErrors.amount = 'Amount is required.';
  } else if (!Number.isFinite(amount) || amount < 0) {
    nextErrors.amount = 'Amount must be 0 or greater.';
  }

  return nextErrors;
};

/**
 * Checks whether a validation result contains at least one field error.
 */
export const hasValidationErrors = (
  errors: Record<string, string | undefined>
) => Object.keys(errors).length > 0;
