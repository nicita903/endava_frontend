import { apiFetch } from '../client';
import { API_ENDPOINTS, API_ERROR_MESSAGES } from '../constants';
import { createApiError } from '../errors';
import {
  appendPaginationSearchParams,
  parsePaginatedResponse,
} from '../pagination';
import type { Car, GetCarsParams, GetCarsResponse } from './types';

export const getCars = async (
  params?: GetCarsParams
): Promise<GetCarsResponse> => {
  const searchParams = new URLSearchParams();

  appendPaginationSearchParams(searchParams, params);

  if (params?.owner_id) {
    searchParams.set('owner_id', params.owner_id);
  }

  if (params?.make) {
    searchParams.set('make', params.make);
  }

  if (params?.model) {
    searchParams.set('model', params.model);
  }

  if (params?.category) {
    searchParams.set('category', params.category);
  }

  const queryString = searchParams.toString();
  const endpoint = `${API_ENDPOINTS.CARS}${
    queryString ? `?${queryString}` : ''
  }`;

  const response = await apiFetch(endpoint);

  if (!response.ok) {
    throw await createApiError(
      response,
      API_ERROR_MESSAGES.GET_CARS
    );
  }

  const data: unknown = await response.json();
  const parsedResponse = parsePaginatedResponse<Car>(data);

  if (!parsedResponse) {
    throw new Error(API_ERROR_MESSAGES.INVALID_CARS_RESPONSE);
  }

  return parsedResponse;
};
