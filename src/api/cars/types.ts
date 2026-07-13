import type { PaginatedResponse } from '../../types/common';

export interface CarOwner {
  id: string;
  name: string;
  email: string | null;
}

export type CarCategory =
  | 'EURO3'
  | 'EURO4'
  | 'EURO5'
  | 'EURO6'
  | 'HYBRID'
  | 'ELECTRIC';

export interface Car {
  id: string;
  vin: string;
  make: string | null;
  model: string | null;
  year_of_manufacture: number;
  power: number;
  cc: number;
  category: CarCategory | null;
  owner: CarOwner;
  policy_id?: string | number;
  policy?: {
    id: string | number;
  };
}

export interface CarDetailsResponse
  extends Omit<Car, 'owner' | 'policy_id' | 'policy'> {
  owner_id: string;
}

export interface GetCarsParams {
  page?: number;
  per_page?: number;
  owner_id?: string;
  make?: string;
  model?: string;
  category?: CarCategory;
}

export type GetCarsResponse = PaginatedResponse<Car>;

export interface SaveCarPayload {
  vin: string;
  make?: string | null;
  model?: string | null;
  year_of_manufacture: number;
  category?: CarCategory | null;
  cc: number;
  power: number;
  owner_id: string;
}

export interface AddCarPolicyPayload {
  provider?: string | null;
  startDate: string;
  endDate: string;
  paid_amount: number;
}

export interface AddCarClaimPayload {
  claim_date: string;
  description: string;
  amount: number;
}

export interface CarPolicyHistoryItem {
  type: 'POLICY';
  policy_id: string;
  start_date: string;
  end_date: string;
  provider: string;
  paid_amount: string;
  status: string;
}

export interface CarClaimHistoryItem {
  type: 'CLAIM';
  claim_id: string;
  claim_date: string;
  amount: string;
  description: string;
}

export type CarHistoryItem =
  | CarPolicyHistoryItem
  | CarClaimHistoryItem;
