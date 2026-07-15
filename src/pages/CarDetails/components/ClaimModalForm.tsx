import type { FormEventHandler } from "react";

import { CalendarInput } from "../../../components/CalendarInput";
import { Input } from "../../../components/Input";

import { CLAIM_FORM_PLACEHOLDERS } from "../constants";
import { ModalForm, SubmitError } from "../styles";
import type { ClaimFormErrors, ClaimFormValues } from "../types";
import type { FieldChangeHandler } from "./types";

interface ClaimModalFormProps {
  backendError: string;
  errors: ClaimFormErrors;
  isDisabled: boolean;
  values: ClaimFormValues;
  onFieldChange: FieldChangeHandler<ClaimFormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

/**
 * Renders the add-claim form shown inside the car details modal.
 */
export const ClaimModalForm = ({
  backendError,
  errors,
  isDisabled,
  values,
  onFieldChange,
  onSubmit,
}: ClaimModalFormProps) => (
  <ModalForm
    id="add-car-claim-form"
    data-testid="add-car-claim-form"
    onSubmit={onSubmit}
    noValidate
  >
    <CalendarInput
      name="claim_date"
      label="Claim Date"
      mode="date"
      value={values.claim_date}
      placeholder={CLAIM_FORM_PLACEHOLDERS.claim_date}
      disabled={isDisabled}
      required
      error={errors.claim_date}
      onChange={(value) => onFieldChange("claim_date", value)}
    />
    <Input
      name="description"
      label="Description"
      value={values.description}
      placeholder={CLAIM_FORM_PLACEHOLDERS.description}
      disabled={isDisabled}
      required
      error={errors.description}
      onChange={(value) => onFieldChange("description", value)}
    />
    <Input
      name="amount"
      label="Amount"
      type="number"
      value={values.amount}
      placeholder={CLAIM_FORM_PLACEHOLDERS.amount}
      disabled={isDisabled}
      required
      error={errors.amount}
      onChange={(value) => onFieldChange("amount", value)}
    />
    {backendError && (
      <SubmitError data-testid="claim-backend-error">
        {backendError}
      </SubmitError>
    )}
  </ModalForm>
);
