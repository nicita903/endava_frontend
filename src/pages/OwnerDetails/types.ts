import type { SaveOwnerPayload } from '../../api/owners/types';

export type OwnerFormValues = Omit<
  SaveOwnerPayload,
  'driver_license_cat' | 'email' | 'year_of_driver_license'
> & {
  driver_license_cat: string;
  email: string;
  year_of_driver_license: string;
};

export type OwnerFormErrors = Partial<
  Record<keyof OwnerFormValues, string>
>;
