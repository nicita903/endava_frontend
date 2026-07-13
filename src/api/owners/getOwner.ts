import { apiFetch } from '../client';
import { API_ENDPOINTS, API_ERROR_MESSAGES } from '../constants';
import { createApiError } from '../errors';
import type { OwnerSummary } from './types';

const fetchOwnerEndpoint = async (
  endpoint: string
): Promise<OwnerSummary | null> => {
  try {
    const response = await apiFetch(endpoint);

    if (!response.ok) {
      throw await createApiError(
        response,
        API_ERROR_MESSAGES.GET_OWNER
      );
    }

    const data: unknown = await response.json();

    return data as OwnerSummary;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOwner = async (
  id: string
): Promise<OwnerSummary | null> => {
  const endpoint = API_ENDPOINTS.OWNER_DETAILS.replace(':id', id);

  return fetchOwnerEndpoint(endpoint);
};
