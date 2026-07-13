import type { BaseControlledFieldProps } from '../../types/common';

export type CalendarInputMode = 'date' | 'year';

export interface CalendarInputProps
  extends BaseControlledFieldProps<string> {
  max?: string | number;
  min?: string | number;
  mode?: CalendarInputMode;
  placeholder?: string;
}
