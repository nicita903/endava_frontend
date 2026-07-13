import type { ReactNode } from 'react';

import type { Car } from '../../api/cars/types';

export type { Car };

export interface CarTableRow extends Car {
  actions: ReactNode;
}
