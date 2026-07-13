import type { FormEventHandler } from 'react';

import { Button } from '../../../components/Button';
import { CalendarInput } from '../../../components/CalendarInput';
import { Dropdown } from '../../../components/Dropdown';
import { Input } from '../../../components/Input';
import type { SelectOption } from '../../../types/common';

import { OWNER_FORM_PLACEHOLDERS } from '../constants';
import { Actions, Form } from '../styles';
import type {
  OwnerFormErrors,
  OwnerFormValues,
} from '../types';

interface OwnerDetailsFormProps {
  driverCategoryOptions: SelectOption[];
  errors: OwnerFormErrors;
  formValues: OwnerFormValues;
  hasDriverCategoryOptions: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
  onFieldChange: (
    field: keyof OwnerFormValues,
    value: string
  ) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

/**
 * Renders the create-owner form while delegating state updates upward.
 */
export const OwnerDetailsForm = ({
  driverCategoryOptions,
  errors,
  formValues,
  hasDriverCategoryOptions,
  isSubmitting,
  onCancel,
  onFieldChange,
  onSubmit,
}: OwnerDetailsFormProps) => {
  const maxBirthdate = new Date().toISOString().split('T')[0];
  const maxLicenseYear = new Date().getFullYear();

  return (
    <Form
      data-testid="owner-form"
      onSubmit={onSubmit}
      noValidate
    >
      <Input
        name="name"
        label="Name"
        value={formValues.name}
        placeholder={OWNER_FORM_PLACEHOLDERS.name}
        required
        error={errors.name}
        onChange={(value) => onFieldChange('name', value)}
      />

      <CalendarInput
        name="birthdate"
        label="Birthdate"
        mode="date"
        min="1900-01-01"
        max={maxBirthdate}
        value={formValues.birthdate}
        placeholder={OWNER_FORM_PLACEHOLDERS.birthdate}
        required
        error={errors.birthdate}
        onChange={(value) => onFieldChange('birthdate', value)}
      />

      <CalendarInput
        name="year_of_driver_license"
        label="License Year"
        mode="year"
        min="1900"
        max={maxLicenseYear}
        value={formValues.year_of_driver_license}
        placeholder={
          OWNER_FORM_PLACEHOLDERS.year_of_driver_license
        }
        required
        error={errors.year_of_driver_license}
        onChange={(value) =>
          onFieldChange('year_of_driver_license', value)
        }
      />

      <Dropdown
        name="driver_license_cat"
        label="Driver License Category"
        value={formValues.driver_license_cat}
        options={driverCategoryOptions}
        disabled={!hasDriverCategoryOptions}
        error={errors.driver_license_cat}
        onChange={(value) =>
          onFieldChange('driver_license_cat', value)
        }
      />

      <Input
        name="email"
        label="Email"
        type="email"
        value={formValues.email}
        placeholder={OWNER_FORM_PLACEHOLDERS.email}
        error={errors.email}
        onChange={(value) => onFieldChange('email', value)}
      />

      <Actions>
        <Button
          type="submit"
          data-testid="create-owner-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          data-testid="cancel-owner-button"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Actions>
    </Form>
  );
};
