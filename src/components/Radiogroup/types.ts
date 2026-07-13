import type { BaseControlledFieldProps, SelectOption } from "../../types/common";


export interface RadioGroupProps
  extends BaseControlledFieldProps<string> {
  options: SelectOption[];
}