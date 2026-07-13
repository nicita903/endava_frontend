import type { TableColumn } from '../../components/Table/types';
import { DEFAULT_PAGE_SIZE_OPTIONS } from '../../constants/pagination';

import type { CarsFilters, CarsTableRow } from './types';

export const DEFAULT_CARS_FILTERS: CarsFilters = {
  make: '',
  model: '',
  category: '',
};

export const CAR_PAGE_SIZE_OPTIONS = DEFAULT_PAGE_SIZE_OPTIONS;

export const carColumns: TableColumn<CarsTableRow>[] = [
  {
    key: 'vin',
    header: 'VIN',
  },
  {
    key: 'make',
    header: 'Manufacturer/Brand',
  },
  {
    key: 'model',
    header: 'Model',
  },
  {
    key: 'category',
    header: 'Emission category',
  },
  {
    key: 'ownerName',
    header: 'Owner',
  },
  {
    key: 'actions',
    header: 'Actions',
  },
];
