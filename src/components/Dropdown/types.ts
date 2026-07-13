
import type { BaseControlledFieldProps } from "../../types/common";

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps
  extends BaseControlledFieldProps<string> {
  options: DropdownOption[];
}