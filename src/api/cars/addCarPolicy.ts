import { apiFetch } from '../client';
import { API_ENDPOINTS, API_ERROR_MESSAGES } from '../constants';
import { createApiError } from '../errors';
import type { AddCarPolicyPayload } from './types';

export const addCarPolicy = async (
  carId: string,
  payload: AddCarPolicyPayload
) => {
  const endpoint = API_ENDPOINTS.CAR_POLICIES.replace(
    ':carId',
    carId
  );

  const response = await apiFetch(endpoint, {
    method: 'POST',
    jsonBody: payload,
  });

  if (!response.ok) {
    throw await createApiError(
      response,
      API_ERROR_MESSAGES.ADD_CAR_POLICY
    );
  }
};
