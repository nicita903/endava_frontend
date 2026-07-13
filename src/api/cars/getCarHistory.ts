import { apiFetch } from '../client';
import { API_ENDPOINTS, API_ERROR_MESSAGES } from '../constants';
import { createApiError } from '../errors';
import type { CarHistoryItem } from './types';

export const getCarHistory = async (
  carId: string
): Promise<CarHistoryItem[]> => {
  const endpoint = API_ENDPOINTS.CAR_HISTORY.replace(
    ':carId',
    carId
  );

  try {
    const response = await apiFetch(endpoint);

    if (!response.ok) {
      throw await createApiError(
        response,
        API_ERROR_MESSAGES.GET_CAR_HISTORY
      );
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data as CarHistoryItem[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
