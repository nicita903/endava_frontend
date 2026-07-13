
import { Container, GroupLabel, Option } from './styles';
import { Error } from '../Error';
import type { RadioGroupProps } from './types';

export const RadioGroup = ({
  name,
  label,
  value,
  options,
  error,
  disabled,
  'data-testid': dataTestId,
  onChange,
}: RadioGroupProps) => {
  const fieldTestId = dataTestId ?? `${name}-radio-group`;

  return (
    <Container data-testid={`${fieldTestId}-container`}>
      {label && (
        <GroupLabel data-testid={`${fieldTestId}-label`}>
          {label}
        </GroupLabel>
      )}

      {options.map((option) => (
        <Option
          key={option.value}
          data-testid={`${fieldTestId}-option-${option.value || 'empty'}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            disabled={disabled}
            data-testid={`${fieldTestId}-input-${
              option.value || 'empty'
            }`}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </Option>
      ))}

      {error && (
        <Error
          message={error}
          data-testid={`${fieldTestId}-error`}
        />
      )}
    </Container>
  );
};
