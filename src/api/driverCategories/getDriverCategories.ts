import { apiFetch } from '../client';
import { API_ENDPOINTS, API_ERROR_MESSAGES } from '../constants';
import { createApiError } from '../errors';

export const getDriverCategories = async (): Promise<string[]> => {
  const response = await apiFetch(API_ENDPOINTS.DRIVER_CATEGORIES);

  if (!response.ok) {
    throw await createApiError(
      response,
      API_ERROR_MESSAGES.GET_DRIVER_CATEGORIES
    );
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data.filter(
    (category): category is string =>
      typeof category === 'string' && category.length > 0
  );
};
