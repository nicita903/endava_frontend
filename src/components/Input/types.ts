import type { HTMLInputTypeAttribute } from 'react';

import type { BaseControlledFieldProps } from "../../types/common";

export interface InputProps
  extends BaseControlledFieldProps<string> {
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}
