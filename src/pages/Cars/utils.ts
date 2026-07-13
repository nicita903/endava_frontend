import type { Car } from '../../api/cars/types';
import type { SelectOption } from '../../types/common';

/**
 * Builds sorted unique filter options from loaded car rows.
 */
export const getCarOptions = (
  cars: Car[],
  field: 'make' | 'model' | 'category'
): SelectOption[] =>
  [
    ...new Set(
      cars
        .map((car) => car[field])
        .filter((value): value is string => !!value)
    ),
  ]
    .sort()
    .map((value) => ({
      label: value,
      value,
    }));
