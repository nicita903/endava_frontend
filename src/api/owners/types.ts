import type { Car } from '../cars/types';
import type { PaginatedResponse } from '../../types/common';

export type DriverLicenseCategory =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'NONE';

export interface Owner {
  id: string;
  name: string;
  birthdate: string;
  year_of_driver_license: number;
  driver_license_cat: DriverLicenseCategory | null;
  email: string | null;
  cars?: Car[];
}

export type OwnerSummary = Pick<Owner, 'id' | 'name' | 'email'>;

export interface GetOwnersParams {
  driver_license_cat?: DriverLicenseCategory[];
  email?: string;
  page?: number;
  per_page?: number;
}

export type GetOwnersResponse = PaginatedResponse<Owner>;

export interface SaveOwnerPayload {
  name: string;
  birthdate: string;
  year_of_driver_license: number;
  driver_license_cat?: DriverLicenseCategory | null;
  email?: string | null;
}
