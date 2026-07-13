import type { TableColumn } from '../../components/Table/types';
import { API_ERROR_MESSAGES } from '../../api/constants';
import type { SelectOption } from '../../types/common';
import type {
  AddPolicyFormValues,
  CarFormValues,
  ClaimFormValues,
  HistoryTableRow,
} from './types';

export const DEFAULT_CAR_FORM_VALUES: CarFormValues = {
  vin: '',
  make: '',
  model: '',
  year_of_manufacture: '',
  power: '',
  cc: '',
  category: '',
  owner_id: '',
};

export const EMPTY_CATEGORY_OPTION: SelectOption = {
  label: 'Select emission category',
  value: '',
};

export const EMISSION_CATEGORY_LABEL = 'Emission category';

export const CAR_DETAILS_ERROR_MODAL_CONTENT = {
  createCar: {
    title: 'Could not create car',
    description: API_ERROR_MESSAGES.ADD_CAR,
  },
  loadCar: {
    title: 'Could not load car',
    description: API_ERROR_MESSAGES.GET_CAR,
  },
  loadPolicy: {
    title: 'Could not load policy data',
    description: API_ERROR_MESSAGES.LOAD_POLICY,
  },
} as const;

export const HISTORY_COLUMNS: TableColumn<HistoryTableRow>[] = [
  { key: 'type', header: 'Type' },
  { key: 'reference', header: 'Reference' },
  { key: 'dates', header: 'Dates' },
  { key: 'provider', header: 'Provider' },
  { key: 'amount', header: 'Amount' },
  { key: 'status', header: 'Status' },
  { key: 'description', header: 'Description' },
];

export const CAR_FORM_PLACEHOLDERS: Record<
  keyof CarFormValues,
  string
> = {
  vin: 'e.g. JTDBR32E720012345',
  make: 'e.g. Toyota',
  model: 'e.g. Corolla',
  year_of_manufacture: 'e.g. 2021',
  power: 'e.g. 132',
  cc: 'e.g. 1798',
  category: 'e.g. EURO6',
  owner_id: 'Owner ID',
};

export const DEFAULT_ADD_POLICY_FORM_VALUES: AddPolicyFormValues = {
  provider: '',
  startDate: '',
  endDate: '',
  paid_amount: '',
};

export const ADD_POLICY_FORM_PLACEHOLDERS: Record<
  keyof AddPolicyFormValues,
  string
> = {
  provider: 'e.g. Allianz',
  startDate: 'Policy start date',
  endDate: 'Policy end date',
  paid_amount: 'e.g. 500',
};

export const DEFAULT_CLAIM_FORM_VALUES: ClaimFormValues = {
  claim_date: '',
  description: '',
  amount: '',
};

export const CLAIM_FORM_PLACEHOLDERS: Record<
  keyof ClaimFormValues,
  string
> = {
  claim_date: 'Claim date',
  description: 'e.g. Minor front bumper damage',
  amount: 'e.g. 1200',
};
