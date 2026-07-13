import { apiFetch } from '../client';
import { API_ENDPOINTS, API_ERROR_MESSAGES } from '../constants';
import { createApiError } from '../errors';
import type {
  CarDetailsResponse,
  SaveCarPayload,
} from './types';

export const addCar = async (
  payload: SaveCarPayload
): Promise<CarDetailsResponse> => {
  const response = await apiFetch(API_ENDPOINTS.CARS, {
    method: 'POST',
    jsonBody: payload,
  });

  if (!response.ok) {
    throw await createApiError(
      response,
      API_ERROR_MESSAGES.ADD_CAR
    );
  }

  return response.json() as Promise<CarDetailsResponse>;
};
