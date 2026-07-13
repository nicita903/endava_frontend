export interface CarFormValues {
  vin: string;
  make: string;
  model: string;
  year_of_manufacture: string;
  power: string;
  cc: string;
  category: string;
  owner_id: string;
}

export interface AddPolicyFormValues {
  provider: string;
  startDate: string;
  endDate: string;
  paid_amount: string;
}

export interface ClaimFormValues {
  claim_date: string;
  description: string;
  amount: string;
}

export type CarFormErrors = Partial<
  Record<keyof CarFormValues, string>
>;

export type AddPolicyFormErrors = Partial<
  Record<keyof AddPolicyFormValues, string>
>;

export type ClaimFormErrors = Partial<
  Record<keyof ClaimFormValues, string>
>;

export type HistoryTableRow = {
  amount: string;
  dates: string;
  description: string;
  provider: string;
  reference: string;
  status: string;
  type: string;
};
