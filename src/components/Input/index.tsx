
import { Error } from '../Error';
import { Label } from '../Label';
import { Container, StyledInput } from './styles';
import type { InputProps } from './types';

export const Input = ({
  id,
  name,
  label,
  type = 'text',
  value,
  placeholder,
  error,
  disabled,
  required,
  'data-testid': dataTestId,
  onChange,
}: InputProps) => {
  const fieldTestId = dataTestId ?? `${name}-input`;

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

      <StyledInput
        id={id ?? name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        $error={!!error}
        data-testid={fieldTestId}
        onChange={(e) => onChange(e.target.value)}
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
