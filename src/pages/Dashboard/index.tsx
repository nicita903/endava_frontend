import { useEffect, useState } from 'react';

import { getCars } from '../../api/cars/getCars';
import { getOwners } from '../../api/owners/getOwners';
import {
  StatisticCard,
  SummaryCard,
} from '../../components/DashboardCards';
import { Header } from '../../components/Header';
import { ROUTES } from '../../constants/routes';

import { DashboardGrid } from './styles';
import type { CarCategory } from '../../api/cars/types';


const CAR_CATEGORIES: {
  label: string;
  value: CarCategory;
}[] = [
  {
    label: 'EURO3',
    value: 'EURO3',
  },
  {
    label: 'EURO4',
    value: 'EURO4',
  },
  {
    label: 'EURO5',
    value: 'EURO5',
  },
  {
    label: 'EURO6',
    value: 'EURO6',
  },
  {
    label: 'Hybrid',
    value: 'HYBRID',
  },
  {
    label: 'Electric',
    value: 'ELECTRIC',
  },
];

const INITIAL_CARS_BY_CATEGORY: Record<CarCategory, number> = {
  EURO3: 0,
  EURO4: 0,
  EURO5: 0,
  EURO6: 0,
  HYBRID: 0,
  ELECTRIC: 0,
};

export const Dashboard = () => {
  const [totalOwners, setTotalOwners] = useState(0);
  const [totalCars, setTotalCars] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [carsByCategory, setCarsByCategory] = useState<
  Record<CarCategory, number>
>(INITIAL_CARS_BY_CATEGORY);

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchDashboardStatistics = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const [
  ownersResponse,
  carsResponse,
  categoryResponses,
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
        category: category.value,
      })
    )
  ),
]);

        if (!isCurrentRequest) {
          return;
        }

        setTotalOwners(ownersResponse.count);
        setTotalCars(carsResponse.count);
        const nextCarsByCategory = {
  ...INITIAL_CARS_BY_CATEGORY,
};

categoryResponses.forEach((response, index) => {
  const category = CAR_CATEGORIES[index];

  nextCarsByCategory[category.value] = response.count;
});

setCarsByCategory(nextCarsByCategory);
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

    fetchDashboardStatistics();

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

  return (
    <div data-testid="dashboard-page">
      <Header
        title="Dashboard"
        description="Overview of car insurance data."
      />

      <DashboardGrid>
        <StatisticCard
          title="Total Owners"
          value={ownersValue}
          icon="👤"
          to={ROUTES.OWNERS}
        />

        <StatisticCard
          title="Total Cars"
          value={carsValue}
          icon="🚗"
          to={ROUTES.CARS}
        />

        <StatisticCard
          title="Insured Cars"
          value="N/A"
          icon="✓"
        />

        <StatisticCard
          title="Uninsured Cars"
          value="N/A"
          icon="!"
        />

        <SummaryCard
          title="Insurance Summary"
          icon="📊"
          items={[
            {
              label: 'Insured Cars',
              value: 'N/A',
            },
            {
              label: 'Uninsured Cars',
              value: 'N/A',
            },
          ]}
        />
        <SummaryCard
  title="Cars by Category"
  icon="🚘"
  to={ROUTES.CARS}
  items={CAR_CATEGORIES.map((category) => ({
    label: category.label,
    value: isLoading
      ? '...'
      : hasError
        ? 'N/A'
        : carsByCategory[category.value],
  }))}
/>
      </DashboardGrid>
    </div>
  );
};