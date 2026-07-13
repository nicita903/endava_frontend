import type { TableColumn } from '../../components/Table/types';
import { DEFAULT_PAGE_SIZE_OPTIONS } from '../../constants/pagination';

import type { OwnerFilters, OwnerTableRow } from './types';

export const DEFAULT_OWNER_FILTERS: OwnerFilters = {
  driverCategories: [],
  search: '',
};

export const OWNER_PAGE_SIZE_OPTIONS = DEFAULT_PAGE_SIZE_OPTIONS;

export const ownerColumns: TableColumn<OwnerTableRow>[] = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'birthdate',
    header: 'Birthdate',
  },
  {
    key: 'year_of_driver_license',
    header: 'License Year',
  },
  {
    key: 'driver_license_cat',
    header: 'License Category',
  },
  {
    key: 'email',
    header: 'Email',
  },
  {
    key: 'actions',
    header: 'Actions',
  },
];
