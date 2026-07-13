import { apiFetch } from '../client';
import { API_ENDPOINTS, API_ERROR_MESSAGES } from '../constants';
import { createApiError } from '../errors';
import type { Owner, SaveOwnerPayload } from './types';

export const addOwner = async (
  payload: SaveOwnerPayload
): Promise<Owner> => {
  const response = await apiFetch(API_ENDPOINTS.OWNERS, {
    method: 'POST',
    jsonBody: payload,
  });

  if (!response.ok) {
    throw await createApiError(
      response,
      API_ERROR_MESSAGES.ADD_OWNER
    );
  }

  return response.json() as Promise<Owner>;
};
