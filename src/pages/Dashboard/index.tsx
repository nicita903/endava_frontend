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


export const Dashboard = () => {
  const [totalOwners, setTotalOwners] = useState(0);
  const [totalCars, setTotalCars] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchDashboardStatistics = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const [ownersResponse, carsResponse] =
          await Promise.all([
            getOwners({
              page: 1,
              per_page: 1,
            }),
            getCars({
              page: 1,
              per_page: 1,
            }),
          ]);

        if (!isCurrentRequest) {
          return;
        }

        setTotalOwners(ownersResponse.count);
        setTotalCars(carsResponse.count);
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
      </DashboardGrid>
    </div>
  );
};