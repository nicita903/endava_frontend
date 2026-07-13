import {
  SwitchButton,
  SwitchContainer,
  SwitchLabel,
  SwitchText,
  SwitchThumb,
  SwitchTrack,
} from './styles';
import type { SwitchProps } from './types';

export const Switch = ({
  checked,
  onChange,
  id,
  name,
  label,
  disabled,
  enabledLabel = 'Enabled',
  disabledLabel = 'Disabled',
  'data-testid': dataTestId = 'switch',
}: SwitchProps) => {
  const switchId = id ?? name;
  const stateLabel = checked ? enabledLabel : disabledLabel;

  return (
    <SwitchContainer data-testid={`${dataTestId}-container`}>
      {label && (
        <SwitchLabel htmlFor={switchId}>{label}</SwitchLabel>
      )}
      <SwitchButton
        id={switchId}
        name={name}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label ?? stateLabel}
        disabled={disabled}
        $checked={checked}
        onClick={() => onChange(!checked)}
        data-testid={dataTestId}
      >
        <SwitchTrack $checked={checked} aria-hidden="true">
          <SwitchThumb $checked={checked} />
        </SwitchTrack>
        <SwitchText>{stateLabel}</SwitchText>
      </SwitchButton>
    </SwitchContainer>
  );
};
