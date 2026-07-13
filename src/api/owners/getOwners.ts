import { apiFetch } from '../client';
import { API_ENDPOINTS, API_ERROR_MESSAGES } from '../constants';
import { createApiError } from '../errors';
import {
  appendPaginationSearchParams,
  parsePaginatedResponse,
} from '../pagination';
import type {
  GetOwnersParams,
  GetOwnersResponse,
  Owner,
} from './types';

const fetchOwnersEndpoint = async (
  endpoint: string
): Promise<GetOwnersResponse> => {
  const response = await apiFetch(endpoint);

  if (!response.ok) {
    throw await createApiError(
      response,
      API_ERROR_MESSAGES.GET_OWNERS
    );
  }

  const data: unknown = await response.json();
  const parsedResponse = parsePaginatedResponse<Owner>(data);

  if (!parsedResponse) {
    throw new Error(API_ERROR_MESSAGES.INVALID_OWNERS_RESPONSE);
  }

  return parsedResponse;
};

export const getOwners = async (
  params?: GetOwnersParams
): Promise<GetOwnersResponse> => {
  const searchParams = new URLSearchParams();

  appendPaginationSearchParams(searchParams, params);

  params?.driver_license_cat?.forEach((category) => {
    searchParams.append('category', category);
  });

  if (params?.email) {
    searchParams.set('email', params.email);
  }

  const queryString = searchParams.toString();
  const endpoint = `${API_ENDPOINTS.OWNERS}${
    queryString ? `?${queryString}` : ''
  }`;

  return fetchOwnersEndpoint(endpoint);
};
