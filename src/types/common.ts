export interface BaseComponentProps {
  id?: string;
  disabled?: boolean;
  'data-testid'?: string;
}

export interface BaseFieldProps extends BaseComponentProps {
  name: string;
  label?: string;
  required?: boolean;
  error?: string;
}

export interface BaseControlledFieldProps<T>
  extends BaseFieldProps {
  value: T;
  onChange: (value: T) => void;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface PaginatedResponse<T> {
  count: number;
  items: T[];
  nextPage: string | null;
  previousPage: string | null;
}
