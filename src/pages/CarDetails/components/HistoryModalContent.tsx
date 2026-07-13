import { Table } from '../../../components/Table';

import { HISTORY_COLUMNS } from '../constants';
import { HistoryTableWrapper } from '../styles';
import type { HistoryTableRow } from '../types';

interface HistoryModalContentProps {
  data: HistoryTableRow[];
}

/**
 * Renders the car policy and claim history table for the history modal.
 */
export const HistoryModalContent = ({
  data,
}: HistoryModalContentProps) => (
  <HistoryTableWrapper>
    <Table
      columns={HISTORY_COLUMNS}
      data-testid="car-history-table"
      data={data}
      emptyMessage="No history found."
    />
  </HistoryTableWrapper>
);
