import type { ReactNode } from "react";

export interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  required?: boolean;
  'data-testid'?: string;
}
