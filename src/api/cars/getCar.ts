import { apiFetch } from '../client';
import { API_ENDPOINTS, API_ERROR_MESSAGES } from '../constants';
import { createApiError } from '../errors';
import type { Car } from './types';

export const getCar = async (id: string): Promise<Car | null> => {
  const endpoint = API_ENDPOINTS.CAR_DETAILS.replace(':carId', id);

  try {
    const response = await apiFetch(endpoint);

    if (!response.ok) {
      throw await createApiError(
        response,
        API_ERROR_MESSAGES.GET_CAR
      );
    }

    const data: unknown = await response.json();

    if (!data || typeof data !== 'object') {
      return null;
    }

    return data as Car;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
