export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
  enabledLabel?: string;
  disabledLabel?: string;
  'data-testid'?: string;
}
