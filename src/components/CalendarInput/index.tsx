import { Error } from '../Error';
import { Label } from '../Label';

import { Container, StyledCalendarInput } from './styles';
import type { CalendarInputProps } from './types';

export const CalendarInput = ({
  id,
  name,
  label,
  mode = 'date',
  value,
  placeholder,
  error,
  disabled,
  required,
  min,
  max,
  'data-testid': dataTestId,
  onChange,
}: CalendarInputProps) => {
  const inputId = id ?? name;
  const isYearMode = mode === 'year';
  const fieldTestId = dataTestId ?? `${name}-input`;

  return (
    <Container data-testid={`${fieldTestId}-container`}>
      {label && (
        <Label
          htmlFor={inputId}
          required={required}
          data-testid={`${fieldTestId}-label`}
        >
          {label}
        </Label>
      )}

      <StyledCalendarInput
        id={inputId}
        name={name}
        type={isYearMode ? 'number' : 'date'}
        inputMode={isYearMode ? 'numeric' : undefined}
        min={min}
        max={max}
        step={isYearMode ? 1 : undefined}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        $error={!!error}
        data-testid={fieldTestId}
        onChange={(event) => onChange(event.target.value)}
      />

      {error && (
        <Error
          message={error}
          data-testid={`${fieldTestId}-error`}
        />
      )}
    </Container>
  );
};
