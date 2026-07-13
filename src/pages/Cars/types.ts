import type { ReactNode } from 'react';

import type { Car, CarCategory } from '../../api/cars/types';

export interface CarsFilters {
  make: string;
  model: string;
  category: CarCategory | '';
}

export interface CarsTableRow extends Car {
  ownerName: string;
  actions: ReactNode;
}
