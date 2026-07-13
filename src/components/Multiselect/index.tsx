import {
  Checkbox,
  Container,
  OptionLabel,
  OptionsWrapper,
  Separator,
} from './styles';
import { Label } from '../Label';
import type { MultiSelectProps } from './types';

export const MultiSelect = ({
  name,
  label,
  value,
  options,
  disabled,
  showSelectAll = false,
  'data-testid': dataTestId,
  onChange,
}: MultiSelectProps) => {
  const fieldTestId = dataTestId ?? `${name}-multiselect`;
  const optionValues = options.map((option) => option.value);
  const hasOptions = optionValues.length > 0;
  const isAllSelected =
    hasOptions &&
    optionValues.every((optionValue) =>
      value.includes(optionValue)
    );

  const handleChange = (optionValue: string) => {
    const isSelected = value.includes(optionValue);

    if (isSelected) {
      onChange(value.filter((item) => item !== optionValue));
      return;
    }

    onChange([...value, optionValue]);
  };
  const handleSelectAll = () => {
    onChange(isAllSelected ? [] : optionValues);
  };

  return (
    <Container data-testid={`${fieldTestId}-container`}>
      {label && (
        <Label data-testid={`${fieldTestId}-label`}>
          {label}
        </Label>
      )}

      <OptionsWrapper data-testid={`${fieldTestId}-options`}>
        {showSelectAll && hasOptions && (
          <>
            <OptionLabel>
              <Checkbox
                type="checkbox"
                name={`${name}-select-all`}
                checked={isAllSelected}
                disabled={disabled}
                data-testid={`${fieldTestId}-select-all`}
                onChange={handleSelectAll}
              />
              Select all
            </OptionLabel>
            <Separator />
          </>
        )}

        {options.map((option) => (
          <OptionLabel key={option.value}>
            <Checkbox
              type="checkbox"
              name={name}
              value={option.value}
              checked={value.includes(option.value)}
              disabled={disabled}
              data-testid={`${fieldTestId}-option-${option.value}`}
              onChange={() => handleChange(option.value)}
            />
            {option.label}
          </OptionLabel>
        ))}
      </OptionsWrapper>
    </Container>
  );
};
