import { useEffect, useState } from 'react';

import { getCars } from '../../api/cars/getCars';
import type { CarCategory } from '../../api/cars/types';
import { getOwners } from '../../api/owners/getOwners';
import type {
  DriverLicenseCategory,
} from '../../api/owners/types';
import {
  StatisticCard,
  SummaryCard,
} from '../../components/DashboardCards';
import type {
  SummaryItem,
} from '../../components/DashboardCards';
import { Header } from '../../components/Header';
import { ROUTES } from '../../constants/routes';

import {
  CarIcon,
  DriverIcon,
  OwnersIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
} from './icons';
import {
  DashboardGrid,
  DashboardPage,
  MoreButton,
  SummaryGrid,
} from './styles';

const CAR_CATEGORIES: CarCategory[] = [
  'EURO3',
  'EURO4',
  'EURO5',
  'EURO6',
  'HYBRID',
  'ELECTRIC',
];

const OWNER_CATEGORIES: DriverLicenseCategory[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'NONE',
];

const getCarCategoryLabel = (
  category: CarCategory
) => {
  if (category === 'HYBRID') {
    return 'Hybrid';
  }

  if (category === 'ELECTRIC') {
    return 'Electric';
  }

  return category;
};

const getOwnerCategoryLabel = (
  category: DriverLicenseCategory
) => {
  return category === 'NONE' ? 'None' : category;
};

export const Dashboard = () => {
  const [totalOwners, setTotalOwners] = useState(0);
  const [totalCars, setTotalCars] = useState(0);

  const [carCategoryItems, setCarCategoryItems] =
    useState<SummaryItem[]>(
      CAR_CATEGORIES.map((category) => ({
        label: getCarCategoryLabel(category),
        value: 0,
      }))
    );

  const [ownerCategoryItems, setOwnerCategoryItems] =
    useState<SummaryItem[]>(
      OWNER_CATEGORIES.map((category) => ({
        label: getOwnerCategoryLabel(category),
        value: 0,
      }))
    );

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchDashboardData = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const [
          ownersResponse,
          carsResponse,
          carCategoryResponses,
          ownerCategoryResponses,
        ] = await Promise.all([
          getOwners({
            page: 1,
            per_page: 1,
          }),

          getCars({
            page: 1,
            per_page: 1,
          }),

          Promise.all(
            CAR_CATEGORIES.map((category) =>
              getCars({
                page: 1,
                per_page: 1,
                category,
              })
            )
          ),

          Promise.all(
            OWNER_CATEGORIES.map((category) =>
              getOwners({
                page: 1,
                per_page: 1,
                driver_license_cat: [category],
              })
            )
          ),
        ]);

        if (!isCurrentRequest) {
          return;
        }

        setTotalOwners(ownersResponse.count);
        setTotalCars(carsResponse.count);

        setCarCategoryItems(
          CAR_CATEGORIES.map((category, index) => ({
            label: getCarCategoryLabel(category),
            value: carCategoryResponses[index].count,
          }))
        );

        setOwnerCategoryItems(
          OWNER_CATEGORIES.map((category, index) => ({
            label: getOwnerCategoryLabel(category),
            value: ownerCategoryResponses[index].count,
          }))
        );
      } catch (error) {
        console.error(error);

        if (isCurrentRequest) {
          setHasError(true);
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      isCurrentRequest = false;
    };
  }, []);

  const ownersValue = isLoading
    ? '...'
    : hasError
      ? 'N/A'
      : totalOwners;

  const carsValue = isLoading
    ? '...'
    : hasError
      ? 'N/A'
      : totalCars;

  const MOCK_INSURED_CARS = 8;
  const MOCK_UNINSURED_CARS = 2;

  return (
    <DashboardPage data-testid="dashboard-page">
      <Header
        title="Dashboard"
        description="Overview of your car insurance application"
        actions={
          <MoreButton
            type="button"
            aria-label="More dashboard options"
          >
            ⋮
          </MoreButton>
        }
      />

      <DashboardGrid>
        <StatisticCard
          title="Total Owners"
          value={ownersValue}
          icon={<OwnersIcon />}
          tone="blue"
          to={ROUTES.OWNERS}
          linkLabel="View all owners"
        />

        <StatisticCard
          title="Total Cars"
          value={carsValue}
          icon={<CarIcon />}
          tone="blue"
          to={ROUTES.CARS}
          linkLabel="View all cars"
        />

        <StatisticCard
          title="Insured Cars"
          value={MOCK_INSURED_CARS}
          icon={<ShieldCheckIcon />}
          tone="green"
          to={ROUTES.CARS}
          linkLabel="View policies"
        />

        <StatisticCard
          title="Uninsured Cars"
          value={MOCK_UNINSURED_CARS}
          icon={<ShieldAlertIcon />}
          tone="orange"
          to={ROUTES.CARS}
          linkLabel="View cars"
        />
      </DashboardGrid>

      <SummaryGrid>
        <SummaryCard
          title="Cars by Category"
          description="Number of cars"
          icon={<CarIcon />}
          tone="blue"
          items={carCategoryItems}
          to={ROUTES.CARS}
          linkLabel="View all cars"
        />

        <SummaryCard
          title="Owners by Driver's License Category"
          description="Number of owners"
          icon={<DriverIcon />}
          tone="purple"
          items={ownerCategoryItems}
          to={ROUTES.OWNERS}
          linkLabel="View all owners"
        />
      </SummaryGrid>
    </DashboardPage>
  );
};