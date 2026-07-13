
import { Error } from '../Error';
import { Label } from '../Label';
import { Container, Select } from './styles';
import type { DropdownProps } from './types';

export const Dropdown = ({
  id,
  name,
  label,
  value,
  options,
  error,
  disabled,
  required,
  'data-testid': dataTestId,
  onChange,
}: DropdownProps) => {
  const fieldTestId = dataTestId ?? `${name}-select`;

  return (
    <Container data-testid={`${fieldTestId}-container`}>
      {label && (
        <Label
          htmlFor={id ?? name}
          required={required}
          data-testid={`${fieldTestId}-label`}
        >
          {label}
        </Label>
      )}

      <Select
        id={id ?? name}
        name={name}
        value={value}
        disabled={disabled}
        required={required}
        $error={!!error}
        data-testid={fieldTestId}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            data-testid={`${fieldTestId}-option-${
              option.value || 'empty'
            }`}
          >
            {option.label}
          </option>
        ))}
      </Select>

      {error && (
        <Error
          message={error}
          data-testid={`${fieldTestId}-error`}
        />
      )}
    </Container>
  );
};
