export const BASE_URL =
  'http://ec2-63-178-240-141.eu-central-1.compute.amazonaws.com/api';

const API_BASE_URL = import.meta.env?.DEV ? '/api' : BASE_URL;

export const API_ENDPOINTS = {
  DRIVER_CATEGORIES: `${API_BASE_URL}/licenses`,
  OWNERS: `${API_BASE_URL}/owners`,
  OWNER_DETAILS: `${API_BASE_URL}/owners/:id`,
  CARS: `${API_BASE_URL}/cars`,
  CAR_CATEGORIES: `${API_BASE_URL}/cars/cars-categories`,
  CAR_DETAILS: `${API_BASE_URL}/cars/:carId`,
  CAR_HISTORY: `${API_BASE_URL}/cars/:carId/history`,
  CAR_CLAIMS: `${API_BASE_URL}/cars/:carId/claims`,
  CAR_POLICIES: `${API_BASE_URL}/cars/:carId/policies`,
  CAR_INSURANCE_VALID: `${API_BASE_URL}/cars/:carId/insurance-valid`,
} as const;

export const API_ERROR_MESSAGES = {
  ADD_CAR: 'Could not create car. Please try again.',
  ADD_CAR_CLAIM: 'Could not create claim. Please try again.',
  ADD_CAR_POLICY: 'Could not create policy. Please try again.',
  ADD_OWNER: 'Could not create owner. Please try again.',
  GET_ACTIVE_POLICY: 'Failed to fetch active policy.',
  GET_CAR: 'Could not load car details. Please try again.',
  GET_CAR_CATEGORIES: 'Could not load car categories.',
  GET_CAR_HISTORY: 'Failed to fetch policy data.',
  GET_CARS: 'Could not load cars.',
  GET_DRIVER_CATEGORIES: 'Could not load driver categories.',
  GET_OWNER: 'Could not load owner details. Please try again.',
  GET_OWNER_CARS: 'Could not load owner cars. Please try again.',
  GET_OWNERS: 'Could not load owners.',
  INVALID_CARS_RESPONSE: 'Received an invalid cars response.',
  INVALID_OWNERS_RESPONSE: 'Received an invalid owners response.',
  LOAD_POLICY: 'Could not load policy data. Please try again.',
  OWNER_CARS_UNAVAILABLE_TITLE: 'Owner cars unavailable',
  OWNER_CREATE_ERROR_TITLE: 'Could not create owner',
  OWNER_NOT_FOUND_TITLE: 'Owner not found',
  DELETE_CAR: 'Could not delete car. Please try again.',
} as const;
