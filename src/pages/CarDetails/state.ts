import { CAR_DETAILS_ERROR_MODAL_CONTENT } from './constants';

export const CarDetailsErrorType = {
  None: 'none',
  CreateCar: 'createCar',
  LoadCar: 'loadCar',
  LoadPolicy: 'loadPolicy',
} as const;

export type CarDetailsErrorType =
  (typeof CarDetailsErrorType)[keyof typeof CarDetailsErrorType];

export const CarDetailsModalType = {
  Hidden: 'hidden',
  AddPolicy: 'addPolicy',
  Claim: 'claim',
  History: 'history',
} as const;

export type CarDetailsModalType =
  (typeof CarDetailsModalType)[keyof typeof CarDetailsModalType];

export const CarDetailsSubmittingType = {
  None: 'none',
  Policy: 'policy',
  Claim: 'claim',
  Car: 'car',
} as const;

export type CarDetailsSubmittingType =
  (typeof CarDetailsSubmittingType)[keyof typeof CarDetailsSubmittingType];

type ErrorModalContent = {
  title: string;
  description: string;
};

/**
 * Returns the modal copy for a car details error state.
 */
export const getErrorModalContent = (
  errorType: CarDetailsErrorType,
  description?: string
): ErrorModalContent | null => {
  if (errorType === CarDetailsErrorType.None) {
    return null;
  }

  return {
    ...CAR_DETAILS_ERROR_MODAL_CONTENT[errorType],
    description:
      description?.trim() ||
      CAR_DETAILS_ERROR_MODAL_CONTENT[errorType].description,
  };
};
