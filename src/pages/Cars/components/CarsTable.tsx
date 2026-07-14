import type { Car } from '../../../api/cars/types';
import { Button } from '../../../components/Button';
import { Table } from '../../../components/Table';
import type { TablePaginationState } from '../../../components/Table/types';
import type { SelectOption } from '../../../types/common';
import { TableActions } from '../styles';

import {
  CAR_PAGE_SIZE_OPTIONS,
  carColumns,
} from '../constants';
import type {
  CarsFilters,
  CarsTableRow,
} from '../types';

interface CarsTableProps {
  cars: Car[];
  categoryOptions: SelectOption[];
  errorMessage: string;
  filters: CarsFilters;
  hasNextCarsPage: boolean;
  isLoading: boolean;
  makeOptions: SelectOption[];
  modelOptions: SelectOption[];
  pagination: TablePaginationState;
  onFilterChange: (
    filterName: keyof CarsFilters,
    value: string | string[]
  ) => void;
  onPaginationChange: (pagination: TablePaginationState) => void;
  onRetry: () => void;
  onDeleteCar: (car: Car) => void;
  onViewCar: (car: Car) => void;
}

/**
 * Renders the Cars table with page-specific columns, filters, and actions.
 */
export const CarsTable = ({
  cars,
  categoryOptions,
  errorMessage,
  filters,
  hasNextCarsPage,
  isLoading,
  makeOptions,
  modelOptions,
  pagination,
  onFilterChange,
  onPaginationChange,
  onDeleteCar,
  onRetry,
  onViewCar,
}: CarsTableProps) => {
  const tableData: CarsTableRow[] = cars.map((car) => ({
    ...car,
    ownerName: car.owner.name,
    actions: (
  <TableActions>
    <Button
      type="button"
      variant="secondary"
      data-testid={`view-car-${car.id}`}
      onClick={(event) => {
        event.stopPropagation();
        onViewCar(car);
      }}
    >
      View
    </Button>

    <Button
      type="button"
      variant="secondary"
      data-testid={`delete-car-${car.id}`}
      onClick={(event) => {
        event.stopPropagation();
        onDeleteCar(car);
      }}
    >
      Delete
    </Button>
  </TableActions>
),
  }));

  return (
    <Table
      columns={carColumns}
      data-testid="cars-table"
      data={tableData}
      emptyMessage="No cars found."
      errorMessage={errorMessage}
      isLoading={isLoading}
      loadingMessage="Loading cars..."
      onRowClick={onViewCar}
      onRetry={onRetry}
      filters={[
        {
          columnKey: 'make',
          type: 'radio',
          name: 'make',
          label: 'Manufacturer/Brand',
          value: filters.make,
          options: makeOptions,
          showAllOption: true,
          onChange: (value) => onFilterChange('make', value),
        },
        {
          columnKey: 'model',
          type: 'radio',
          name: 'model',
          label: 'Model',
          value: filters.model,
          options: modelOptions,
          showAllOption: true,
          onChange: (value) => onFilterChange('model', value),
        },
        {
          columnKey: 'category',
          type: 'radio',
          name: 'category',
          label: 'Emission category',
          value: filters.category,
          options: categoryOptions,
          showAllOption: true,
          onChange: (value) =>
            onFilterChange('category', value),
        },
      ]}
      pagination={{
        ...pagination,
        hasNextPage: hasNextCarsPage,
        sizeOptions: CAR_PAGE_SIZE_OPTIONS,
        onChange: onPaginationChange,
      }}
    />
  );
};
