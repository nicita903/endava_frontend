import type { Owner } from '../../../api/owners/types';
import { Button } from '../../../components/Button';
import { Table } from '../../../components/Table';
import type { TablePaginationState } from '../../../components/Table/types';
import type { SelectOption } from '../../../types/common';

import {
  OWNER_PAGE_SIZE_OPTIONS,
  ownerColumns,
} from '../constants';
import type {
  OwnerFilters,
  OwnerTableRow,
} from '../types';

interface OwnersTableProps {
  driverCategoryOptions: SelectOption[];
  errorMessage: string;
  filters: OwnerFilters;
  hasNextOwnersPage: boolean;
  isLoading: boolean;
  owners: Owner[];
  pagination: TablePaginationState;
  onDriverCategoryFilterChange: (
    value: string | string[]
  ) => void;
  onOwnerCarsView: (owner: Owner) => void;
  onPaginationChange: (pagination: TablePaginationState) => void;
  onRetry: () => void;
}

/**
 * Renders the Owners table with page-specific filters and row actions.
 */
export const OwnersTable = ({
  driverCategoryOptions,
  errorMessage,
  filters,
  hasNextOwnersPage,
  isLoading,
  owners,
  pagination,
  onDriverCategoryFilterChange,
  onOwnerCarsView,
  onPaginationChange,
  onRetry,
}: OwnersTableProps) => {
  const tableData: OwnerTableRow[] = owners.map((owner) => ({
    ...owner,
    actions: (
      <Button
        type="button"
        variant="secondary"
        data-testid={`view-owner-cars-${owner.id}`}
        onClick={(event) => {
          event.stopPropagation();
          onOwnerCarsView(owner);
        }}
      >
        View cars
      </Button>
    ),
  }));

  return (
    <Table
      columns={ownerColumns}
      data-testid="owners-table"
      data={tableData}
      emptyMessage="No owners found."
      errorMessage={errorMessage}
      isLoading={isLoading}
      loadingMessage="Loading owners..."
      onRowClick={onOwnerCarsView}
      onRetry={onRetry}
      filters={[
        {
          columnKey: 'driver_license_cat',
          type: 'multiselect',
          name: 'driverCategories',
          label: 'Driver category',
          value: filters.driverCategories,
          options: driverCategoryOptions,
          onChange: onDriverCategoryFilterChange,
        },
      ]}
      pagination={{
        ...pagination,
        hasNextPage: hasNextOwnersPage,
        sizeOptions: OWNER_PAGE_SIZE_OPTIONS,
        onChange: onPaginationChange,
      }}
    />
  );
};
