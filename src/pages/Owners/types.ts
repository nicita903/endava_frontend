import type { ReactNode } from 'react';

import type { Owner } from '../../api/owners/types';

export interface OwnerTableRow extends Owner {
  actions: ReactNode;
}

export interface OwnerFilters {
  driverCategories: string[];
  search: string;
}
