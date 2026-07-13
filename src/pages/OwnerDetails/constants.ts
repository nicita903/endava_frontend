import type { SelectOption } from '../../types/common';

import type { OwnerFormValues } from './types';

export const DEFAULT_OWNER_FORM_VALUES: OwnerFormValues = {
  name: '',
  birthdate: '',
  year_of_driver_license: '',
  driver_license_cat: '',
  email: '',
};

export const EMPTY_DRIVER_CATEGORY_OPTION: SelectOption = {
  label: 'Select category',
  value: '',
};

export const OWNER_FORM_PLACEHOLDERS: Record<
  keyof OwnerFormValues,
  string
> = {
  name: 'e.g. Alex Morgan',
  birthdate: 'YYYY-MM-DD',
  year_of_driver_license: 'e.g. 2020',
  driver_license_cat: '',
  email: 'e.g. user@example.com',
};
