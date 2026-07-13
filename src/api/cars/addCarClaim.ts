import { apiFetch } from '../client';
import { API_ENDPOINTS, API_ERROR_MESSAGES } from '../constants';
import { createApiError } from '../errors';
import type { AddCarClaimPayload } from './types';

export const addCarClaim = async (
  carId: string,
  payload: AddCarClaimPayload
) => {
  const endpoint = API_ENDPOINTS.CAR_CLAIMS.replace(
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
      API_ERROR_MESSAGES.ADD_CAR_CLAIM
    );
  }
};
