import type { FormEventHandler } from 'react';

import { Button } from '../../../components/Button';
import { CalendarInput } from '../../../components/CalendarInput';
import { Dropdown } from '../../../components/Dropdown';
import { Input } from '../../../components/Input';
import { Loading } from '../../../components/Loading';
import type { SelectOption } from '../../../types/common';

import {
  CAR_FORM_PLACEHOLDERS,
  EMISSION_CATEGORY_LABEL,
} from '../constants';
import { Actions, Form } from '../styles';
import type {
  CarFormErrors,
  CarFormValues,
} from '../types';
import type { FieldChangeHandler } from './types';

interface CarDetailsFormProps {
  categoryFieldOptions: SelectOption[];
  errors: CarFormErrors;
  formValues: CarFormValues;
  isCreatingCar: boolean;
  isLoadingCategories: boolean;
  isSubmissionInProgress: boolean;
  isViewMode: boolean;
  onBack: () => void;
  onFieldChange: FieldChangeHandler<CarFormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  ownerFieldOptions: SelectOption[];
  isLoadingOwners: boolean;
}

/**
 * Renders the add/view car form while delegating state updates upward.
 */
export const CarDetailsForm = ({
  categoryFieldOptions,
  errors,
  formValues,
  isCreatingCar,
  isLoadingCategories,
  isSubmissionInProgress,
  isViewMode,
  ownerFieldOptions,
  isLoadingOwners,
  onBack,
  onFieldChange,
  onSubmit,
}: CarDetailsFormProps) => (
  <Form
    data-testid={isViewMode ? 'view-car-form' : 'add-car-form'}
    onSubmit={onSubmit}
    noValidate
  >
    {isViewMode ? (
  <Input
    name="owner_id"
    label="Owner ID"
    value={formValues.owner_id}
    placeholder={CAR_FORM_PLACEHOLDERS.owner_id}
    disabled
    required
    error={errors.owner_id}
    onChange={(value) => onFieldChange('owner_id', value)}
  />
) : (
  <Dropdown
    name="owner_id"
    label="Owner"
    value={formValues.owner_id}
    options={ownerFieldOptions}
    disabled={isSubmissionInProgress || isLoadingOwners}
    required
    error={errors.owner_id}
    onChange={(value) => onFieldChange('owner_id', value)}
  />
)}

    <Input
      name="vin"
      label="VIN"
      value={formValues.vin}
      placeholder={CAR_FORM_PLACEHOLDERS.vin}
      disabled={isViewMode || isSubmissionInProgress}
      required
      error={errors.vin}
      onChange={(value) => onFieldChange('vin', value)}
    />

    <Input
      name="make"
      label="Make"
      value={formValues.make}
      placeholder={CAR_FORM_PLACEHOLDERS.make}
      disabled={isViewMode || isSubmissionInProgress}
      error={errors.make}
      onChange={(value) => onFieldChange('make', value)}
    />

    <Input
      name="model"
      label="Model"
      value={formValues.model}
      placeholder={CAR_FORM_PLACEHOLDERS.model}
      disabled={isViewMode || isSubmissionInProgress}
      error={errors.model}
      onChange={(value) => onFieldChange('model', value)}
    />

    <CalendarInput
      name="year_of_manufacture"
      label="Year of Manufacture"
      mode="year"
      value={formValues.year_of_manufacture}
      placeholder={CAR_FORM_PLACEHOLDERS.year_of_manufacture}
      disabled={isViewMode || isSubmissionInProgress}
      required
      error={errors.year_of_manufacture}
      onChange={(value) =>
        onFieldChange('year_of_manufacture', value)
      }
    />

    <Input
      name="power"
      label="Power"
      type="number"
      value={formValues.power}
      placeholder={CAR_FORM_PLACEHOLDERS.power}
      disabled={isViewMode || isSubmissionInProgress}
      required
      error={errors.power}
      onChange={(value) => onFieldChange('power', value)}
    />

    <Input
      name="cc"
      label="CC"
      type="number"
      value={formValues.cc}
      placeholder={CAR_FORM_PLACEHOLDERS.cc}
      disabled={isViewMode || isSubmissionInProgress}
      required
      error={errors.cc}
      onChange={(value) => onFieldChange('cc', value)}
    />

    {isViewMode ? (
      <Input
        name="category"
        label={EMISSION_CATEGORY_LABEL}
        value={formValues.category}
        placeholder={CAR_FORM_PLACEHOLDERS.category}
        disabled
        error={errors.category}
        onChange={(value) => onFieldChange('category', value)}
      />
    ) : (
      <Dropdown
        name="category"
        label={EMISSION_CATEGORY_LABEL}
        value={formValues.category}
        options={categoryFieldOptions}
        disabled={isSubmissionInProgress || isLoadingCategories}
        error={errors.category}
        onChange={(value) => onFieldChange('category', value)}
      />
    )}

    <Actions>
      {!isViewMode && (
        <Button
          type="submit"
          data-testid="create-car-button"
          disabled={isSubmissionInProgress}
        >
          {isCreatingCar ? 'Creating...' : 'Create'}
        </Button>
      )}
      <Button
        type="button"
        variant="secondary"
        data-testid={
          isViewMode ? 'back-button' : 'cancel-car-button'
        }
        disabled={isSubmissionInProgress}
        onClick={onBack}
      >
        {isViewMode ? 'Back' : 'Cancel'}
      </Button>
    </Actions>
    {isCreatingCar && <Loading message="Creating car..." />}
  </Form>
);
