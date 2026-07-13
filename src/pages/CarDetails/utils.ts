import type {
  AddCarClaimPayload,
  AddCarPolicyPayload,
  Car,
  CarCategory,
  CarHistoryItem,
  SaveCarPayload,
} from '../../api/cars/types';
import type { SelectOption } from '../../types/common';

import {
  DEFAULT_CLAIM_FORM_VALUES,
  EMPTY_CATEGORY_OPTION,
} from './constants';
import type {
  AddPolicyFormValues,
  CarFormValues,
  ClaimFormValues,
  HistoryTableRow,
} from './types';

/**
 * Formats today's date as an ISO date string for date inputs.
 */
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * Builds the initial claim form values with today's date prefilled.
 */
export const getDefaultClaimFormValues =
  (): ClaimFormValues => ({
    ...DEFAULT_CLAIM_FORM_VALUES,
    claim_date: getCurrentDate(),
  });

/**
 * Converts API emission categories into dropdown options.
 */
export const getCarCategoryOptions = (
  categories: string[]
): SelectOption[] => [
  EMPTY_CATEGORY_OPTION,
  ...categories.map((category) => ({
    label: category,
    value: category,
  })),
];

/**
 * Adds the selected category to dropdown options when loaded car data has a category outside the fetched list.
 */
export const getCategoryFieldOptions = (
  category: string,
  categoryOptions: SelectOption[]
): SelectOption[] =>
  category &&
  !categoryOptions.some((option) => option.value === category)
    ? [
        ...categoryOptions,
        {
          label: category,
          value: category,
        },
      ]
    : categoryOptions;

/**
 * Maps a loaded car response into editable form values.
 */
export const getCarFormValues = (car: Car): CarFormValues => ({
  vin: car.vin,
  make: car.make ?? '',
  model: car.model ?? '',
  year_of_manufacture: String(car.year_of_manufacture),
  power: String(car.power),
  cc: String(car.cc),
  category: car.category ?? '',
  owner_id: car.owner.id,
});

/**
 * Builds the create-car API payload from form values.
 */
export const getSaveCarPayload = (
  formValues: CarFormValues
): SaveCarPayload => {
  const category = formValues.category.trim();

  return {
    vin: formValues.vin.trim(),
    make: formValues.make.trim() || null,
    model: formValues.model.trim() || null,
    year_of_manufacture: Number(
      formValues.year_of_manufacture
    ),
    category: category ? (category as CarCategory) : null,
    cc: Number(formValues.cc),
    power: Number(formValues.power),
    owner_id: formValues.owner_id.trim(),
  };
};

/**
 * Builds the add-policy API payload from form values.
 */
export const getAddPolicyPayload = (
  policyFormValues: AddPolicyFormValues
): AddCarPolicyPayload => ({
  provider: policyFormValues.provider.trim() || null,
  startDate: policyFormValues.startDate,
  endDate: policyFormValues.endDate,
  paid_amount: Number(policyFormValues.paid_amount),
});

/**
 * Builds the add-claim API payload from form values.
 */
export const getAddClaimPayload = (
  claimFormValues: ClaimFormValues
): AddCarClaimPayload => ({
  claim_date: claimFormValues.claim_date,
  description: claimFormValues.description.trim(),
  amount: Number(claimFormValues.amount),
});

/**
 * Converts policy and claim history items into table rows.
 */
export const getHistoryTableRows = (
  historyItems: CarHistoryItem[]
): HistoryTableRow[] =>
  historyItems.map((historyItem) => {
    if (historyItem.type === 'POLICY') {
      return {
        type: historyItem.type,
        reference: historyItem.policy_id,
        dates: `${historyItem.start_date} - ${historyItem.end_date}`,
        provider: historyItem.provider,
        amount: historyItem.paid_amount,
        status: historyItem.status,
        description: '-',
      };
    }

    return {
      type: historyItem.type,
      reference: historyItem.claim_id,
      dates: historyItem.claim_date,
      provider: '-',
      amount: historyItem.amount,
      status: '-',
      description: historyItem.description,
    };
  });
