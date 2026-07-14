import {
  StatisticCard,
  SummaryCard,
} from '../../components/DashboardCards';
import { Header } from '../../components/Header';
import { ROUTES } from '../../constants/routes';

import { DashboardGrid } from './styles';

export const Dashboard = () => {
  return (
    <div data-testid="dashboard-page">
      <Header
        title="Dashboard"
        description="Overview of car insurance data."
      />

      <DashboardGrid>
        <StatisticCard
          title="Cars"
          value={0}
          icon="🚗"
          to={ROUTES.CARS}
        />

        <StatisticCard
          title="Owners"
          value={0}
          icon="👤"
          to={ROUTES.OWNERS}
        />

        <SummaryCard
          title="Summary"
          icon="📊"
          items={[
            {
              label: 'Cars',
              value: 0,
            },
            {
              label: 'Owners',
              value: 0,
            },
          ]}
        />
      </DashboardGrid>
    </div>
  );
};