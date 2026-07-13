import { useNavigate } from 'react-router-dom';

import type { Owner } from '../../api/owners/types';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { ROUTES } from '../../constants/routes';

import { OwnersTable } from './components/OwnersTable';
import { useOwnersData } from './hooks/useOwnersData';
import { SearchWrapper, Wrapper } from './styles';

/**
 * Renders the Owners page with server-backed search, filters, and pagination.
 */
export const Owners = () => {
  const navigate = useNavigate();
  const {
    driverCategoryOptions,
    errorMessage,
    filters,
    handleDriverCategoryFilterChange,
    handlePaginationChange,
    hasNextOwnersPage,
    isLoading,
    owners,
    pagination,
    retryOwnersRequest,
    searchValue,
    setSearchValue,
  } = useOwnersData();

  /**
   * Navigates to the selected owner's cars page.
   */
  const viewOwnerCars = (owner: Owner) =>
    navigate(ROUTES.OWNER_CARS(owner.id));

  return (
    <div data-testid="owners-page">
      <Wrapper>
        <Header title="Owners" />
        <Button
          type="button"
          data-testid="add-owner-button"
          onClick={() => navigate(ROUTES.ADD_OWNER)}
        >
          Add Owner
        </Button>
      </Wrapper>

      <SearchWrapper
        role="search"
        data-testid="owners-search"
      >
        <Input
          name="ownerSearch"
          label="Search"
          value={searchValue}
          placeholder="Search by email"
          data-testid="owners-search-input"
          onChange={setSearchValue}
        />
      </SearchWrapper>

      <OwnersTable
        driverCategoryOptions={driverCategoryOptions}
        errorMessage={errorMessage}
        filters={filters}
        hasNextOwnersPage={hasNextOwnersPage}
        isLoading={isLoading}
        owners={owners}
        pagination={pagination}
        onDriverCategoryFilterChange={
          handleDriverCategoryFilterChange
        }
        onOwnerCarsView={viewOwnerCars}
        onPaginationChange={handlePaginationChange}
        onRetry={retryOwnersRequest}
      />
    </div>
  );
};
