export type FieldChangeHandler<T extends object> = (
  field: keyof T,
  value: string
) => void;
