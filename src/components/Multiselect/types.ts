import type { BaseControlledFieldProps, SelectOption } from "../../types/common";

export interface MultiSelectProps extends BaseControlledFieldProps<string[]> {
  options: SelectOption[];
  showSelectAll?: boolean;
  onChange: (value: string[]) => void;
}
