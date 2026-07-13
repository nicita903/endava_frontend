import { apiFetch } from '../client';
import { API_ENDPOINTS, API_ERROR_MESSAGES } from '../constants';
import { createApiError } from '../errors';

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const getBooleanValue = (
  data: Record<string, unknown>,
  key: string
) => {
  const value = data[key];

  return typeof value === 'boolean' ? value : undefined;
};

const parseInsuranceValidity = (data: unknown) => {
  if (typeof data === 'boolean') {
    return data;
  }

  if (!data || typeof data !== 'object') {
    return false;
  }

  const response = data as Record<string, unknown>;
  const booleanKeys = [
    'valid',
    'isValid',
    'insurance_valid',
    'insuranceValid',
    'hasActivePolicy',
    'active',
  ];

  for (const key of booleanKeys) {
    const value = getBooleanValue(response, key);

    if (value !== undefined) {
      return value;
    }
  }

  return !!response.policy;
};

export const getActivePolicy = async (
  carId: string
): Promise<boolean> => {
  try {
    const searchParams = new URLSearchParams({
      date: getCurrentDate(),
    });
    const endpoint = `${API_ENDPOINTS.CAR_INSURANCE_VALID.replace(
      ':carId',
      carId
    )}?${searchParams.toString()}`;

    const response = await apiFetch(endpoint);

    if (!response.ok) {
      throw await createApiError(
        response,
        API_ERROR_MESSAGES.GET_ACTIVE_POLICY
      );
    }

    const data: unknown = await response.json();

    return parseInsuranceValidity(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
