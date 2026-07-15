import type { FormEventHandler } from "react";

import { CalendarInput } from "../../../components/CalendarInput";
import { Input } from "../../../components/Input";

import { ADD_POLICY_FORM_PLACEHOLDERS } from "../constants";
import { ModalForm, SubmitError } from "../styles";
import type { AddPolicyFormErrors, AddPolicyFormValues } from "../types";
import type { FieldChangeHandler } from "./types";

interface AddPolicyModalFormProps {
  errors: AddPolicyFormErrors;
  submitError: string;
  values: AddPolicyFormValues;
  onFieldChange: FieldChangeHandler<AddPolicyFormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

/**
 * Renders the add-policy form shown inside the car details modal.
 */
export const AddPolicyModalForm = ({
  errors,
  submitError,
  values,
  onFieldChange,
  onSubmit,
}: AddPolicyModalFormProps) => (
  <ModalForm
    id="add-car-policy-form"
    data-testid="add-car-policy-form"
    onSubmit={onSubmit}
    noValidate
  >
    <Input
      name="provider"
      label="Provider"
      value={values.provider}
      placeholder={ADD_POLICY_FORM_PLACEHOLDERS.provider}
      error={errors.provider}
      onChange={(value) => onFieldChange("provider", value)}
    />
    <CalendarInput
      name="startDate"
      label="Start Date"
      mode="date"
      value={values.startDate}
      placeholder={ADD_POLICY_FORM_PLACEHOLDERS.startDate}
      required
      error={errors.startDate}
      onChange={(value) => onFieldChange("startDate", value)}
    />
    <CalendarInput
      name="endDate"
      label="End Date"
      mode="date"
      value={values.endDate}
      placeholder={ADD_POLICY_FORM_PLACEHOLDERS.endDate}
      required
      error={errors.endDate}
      onChange={(value) => onFieldChange("endDate", value)}
    />
    <Input
      name="paid_amount"
      label="Paid Amount"
      type="number"
      value={values.paid_amount}
      placeholder={ADD_POLICY_FORM_PLACEHOLDERS.paid_amount}
      required
      error={errors.paid_amount}
      onChange={(value) => onFieldChange("paid_amount", value)}
    />
    {submitError && <SubmitError>{submitError}</SubmitError>}
  </ModalForm>
);
