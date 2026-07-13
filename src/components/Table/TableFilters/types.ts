import type { SelectOption } from '../../../types/common';

export type TableFilterType = 'radio' | 'multiselect';

export interface TableFilter<T extends object> {
  columnKey: keyof T;
  type: TableFilterType;
  name: string;
  label?: string;
  options: SelectOption[];
  showAllOption?: boolean;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

export interface TableFilterProps<T extends object> {
  filter: TableFilter<T>;
  'data-testid'?: string;
}
