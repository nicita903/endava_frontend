import { useEffect, useId, useState } from 'react';
import {
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { addCar } from '../../api/cars/addCar';
import { addCarClaim } from '../../api/cars/addCarClaim';
import { addCarPolicy } from '../../api/cars/addCarPolicy';
import { getCar } from '../../api/cars/getCar';
import { getCarCategories } from '../../api/cars/getCarCategories';
import { getCarHistory } from '../../api/cars/getCarHistory';
import type { CarHistoryItem } from '../../api/cars/types';
import { API_ERROR_MESSAGES } from '../../api/constants';
import { getApiErrorMessage } from '../../api/errors';
import { getActivePolicy } from '../../api/policy/getActivePolicy';
import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { Modal } from '../../components/Modal';
import type { SelectOption } from '../../types/common';

import { EMPTY_CATEGORY_OPTION } from './constants';
import { AddPolicyModalForm } from './components/AddPolicyModalForm';
import { CarDetailsForm } from './components/CarDetailsForm';
import { ClaimModalForm } from './components/ClaimModalForm';
import { HistoryModalContent } from './components/HistoryModalContent';
import { PolicyPanelSection } from './components/PolicyPanelSection';
import { useCarForm } from './hooks/useCarForm';
import { useClaimForm } from './hooks/useClaimForm';
import { usePolicyForm } from './hooks/usePolicyForm';
import {
  CarDetailsErrorType,
  CarDetailsModalType,
  CarDetailsSubmittingType,
  getErrorModalContent,
} from './state';
import type {
  CarDetailsErrorType as CarDetailsErrorValue,
  CarDetailsModalType as CarDetailsModalValue,
  CarDetailsSubmittingType as CarDetailsSubmittingValue,
} from './state';
import {
  getAddClaimPayload,
  getAddPolicyPayload,
  getCarCategoryOptions,
  getCarFormValues,
  getCategoryFieldOptions,
  getHistoryTableRows,
  getSaveCarPayload,
} from './utils';

/**
 * Coordinates car creation and car detail workflows.
 */
export const CarDetails = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const [searchParams] = useSearchParams();
  const policyTitleId = useId();
  const isViewMode = !!carId;
  const ownerId = searchParams.get('owner_id') || '';
  const {
    errors,
    setValues: setFormValues,
    updateField,
    validate: validateForm,
    values: formValues,
  } = useCarForm(ownerId);
  const {
    errors: policyErrors,
    reset: resetPolicyForm,
    setSubmitError: setPolicySubmitError,
    submitError: policySubmitError,
    updateField: updatePolicyField,
    validate: validatePolicyForm,
    values: policyFormValues,
  } = usePolicyForm();
  const {
    backendError: claimBackendError,
    errors: claimErrors,
    reset: resetClaimForm,
    setBackendError: setClaimBackendError,
    updateField: updateClaimField,
    validate: validateClaimForm,
    values: claimFormValues,
  } = useClaimForm();
  const [categoryOptions, setCategoryOptions] = useState<
    SelectOption[]
  >([EMPTY_CATEGORY_OPTION]);
  const [isLoadingCategories, setIsLoadingCategories] =
    useState(!isViewMode);
  const [isLoadingData, setIsLoadingData] = useState(isViewMode);
  const [hasActivePolicy, setHasActivePolicy] = useState(false);
  const [historyItems, setHistoryItems] = useState<
    CarHistoryItem[]
  >([]);
  const [modalType, setModalType] = useState<CarDetailsModalValue>(
    CarDetailsModalType.Hidden
  );
  const [submittingType, setSubmittingType] =
    useState<CarDetailsSubmittingValue>(
      CarDetailsSubmittingType.None
    );
  const [errorType, setErrorType] =
    useState<CarDetailsErrorValue>(CarDetailsErrorType.None);
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Navigates back to the previous route.
   */
  const goBack = () => navigate(-1);

  /**
   * Opens the add-policy modal.
   */
  const openAddPolicyModal = () =>
    setModalType(CarDetailsModalType.AddPolicy);

  /**
   * Opens the history modal.
   */
  const openHistoryModal = () =>
    setModalType(CarDetailsModalType.History);

  /**
   * Clears the current error modal state.
   */
  const hideErrorModal = () => {
    setErrorType(CarDetailsErrorType.None);
    setErrorMessage('');
  };

  /**
   * Hides any open car details modal.
   */
  const hideModal = () => setModalType(CarDetailsModalType.Hidden);
  const isSubmissionInProgress =
    submittingType !== CarDetailsSubmittingType.None;

  useEffect(() => {
    if (isViewMode) {
      return;
    }

    let isCurrentRequest = true;

    /**
     * Loads emission categories for the add-car form.
     */
    const fetchCategories = async () => {
      setIsLoadingCategories(true);

      try {
        const categories = await getCarCategories();

        if (!isCurrentRequest) {
          return;
        }

        setCategoryOptions(getCarCategoryOptions(categories));
      } catch (error) {
        console.error(error);

        if (isCurrentRequest) {
          setCategoryOptions(getCarCategoryOptions([]));
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoadingCategories(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isCurrentRequest = false;
    };
  }, [isViewMode]);

  useEffect(() => {
    if (!isViewMode || !carId) {
      return;
    }

    let isCurrentRequest = true;

    /**
     * Loads car details, active policy status, and history in view mode.
     */
    const fetchData = async () => {
      setIsLoadingData(true);

      try {
        const [carResult, policyResult, historyResult] =
          await Promise.allSettled([
            getCar(carId),
            getActivePolicy(carId),
            getCarHistory(carId),
          ]);

        if (!isCurrentRequest) {
          return;
        }

        if (carResult.status === 'fulfilled') {
          if (carResult.value) {
            setFormValues(getCarFormValues(carResult.value));
          }
        } else {
          console.error(carResult.reason);
        }

        if (policyResult.status === 'fulfilled') {
          setHasActivePolicy(policyResult.value);
        } else {
          console.error(policyResult.reason);
          setHasActivePolicy(false);
        }

        if (historyResult.status === 'fulfilled') {
          setHistoryItems(historyResult.value);
        } else {
          console.error(historyResult.reason);
          setHistoryItems([]);
        }

        if (carResult.status === 'rejected') {
          setErrorMessage(
            getApiErrorMessage(
              carResult.reason,
              API_ERROR_MESSAGES.GET_CAR
            )
          );
          setErrorType(CarDetailsErrorType.LoadCar);
        } else if (
          policyResult.status === 'rejected' ||
          historyResult.status === 'rejected'
        ) {
          const policyError =
            policyResult.status === 'rejected'
              ? policyResult.reason
              : historyResult.status === 'rejected'
                ? historyResult.reason
                : undefined;

          setErrorMessage(
            getApiErrorMessage(
              policyError,
              API_ERROR_MESSAGES.LOAD_POLICY
            )
          );
          setErrorType(CarDetailsErrorType.LoadPolicy);
        } else {
          setErrorMessage('');
          setErrorType(CarDetailsErrorType.None);
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoadingData(false);
        }
      }
    };

    fetchData();

    return () => {
      isCurrentRequest = false;
    };
  }, [carId, isViewMode, setFormValues]);

  /**
   * Closes the add-policy modal unless a submission is running.
   */
  const closeAddPolicyModal = () => {
    if (isSubmissionInProgress) {
      return;
    }

    hideModal();
    resetPolicyForm();
  };

  /**
   * Closes the add-claim modal unless a submission is running.
   */
  const closeClaimModal = () => {
    if (isSubmissionInProgress) {
      return;
    }

    hideModal();
    resetClaimForm();
  };

  /**
   * Creates a policy and refreshes policy/history data.
   */
  const submitAddPolicy = async () => {
    if (!carId || !validatePolicyForm()) {
      return;
    }

    try {
      setSubmittingType(CarDetailsSubmittingType.Policy);
      setPolicySubmitError('');

      await addCarPolicy(
        carId,
        getAddPolicyPayload(policyFormValues)
      );

      const [policyResult, historyResult] =
        await Promise.allSettled([
          getActivePolicy(carId),
          getCarHistory(carId),
        ]);

      if (policyResult.status === 'fulfilled') {
        setHasActivePolicy(policyResult.value);
      } else {
        console.error(policyResult.reason);
        setErrorMessage(
          getApiErrorMessage(
            policyResult.reason,
            API_ERROR_MESSAGES.LOAD_POLICY
          )
        );
        setErrorType(CarDetailsErrorType.LoadPolicy);
      }

      if (historyResult.status === 'fulfilled') {
        setHistoryItems(historyResult.value);
      } else {
        console.error(historyResult.reason);
        setHistoryItems([]);
        setErrorMessage(
          getApiErrorMessage(
            historyResult.reason,
            API_ERROR_MESSAGES.LOAD_POLICY
          )
        );
        setErrorType(CarDetailsErrorType.LoadPolicy);
      }

      hideModal();
      resetPolicyForm();
    } catch (error) {
      console.error(error);
      setPolicySubmitError(
        getApiErrorMessage(error, API_ERROR_MESSAGES.ADD_CAR_POLICY)
      );
    } finally {
      setSubmittingType(CarDetailsSubmittingType.None);
    }
  };

  /**
   * Handles add-policy form submission.
   */
  const handleAddPolicySubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    submitAddPolicy();
  };

  /**
   * Creates a claim and refreshes car history.
   */
  const submitClaim = async () => {
    if (!carId || !validateClaimForm()) {
      return;
    }

    setSubmittingType(CarDetailsSubmittingType.Claim);
    setClaimBackendError('');

    try {
      await addCarClaim(
        carId,
        getAddClaimPayload(claimFormValues)
      );
    } catch (error) {
      console.error(error);
      setClaimBackendError(
        getApiErrorMessage(error, API_ERROR_MESSAGES.ADD_CAR_CLAIM)
      );
      setSubmittingType(CarDetailsSubmittingType.None);

      return;
    }

    try {
      const history = await getCarHistory(carId);

      setHistoryItems(history);
    } catch (error) {
      console.error(error);
      setHistoryItems([]);
      setErrorMessage(
        getApiErrorMessage(error, API_ERROR_MESSAGES.LOAD_POLICY)
      );
      setErrorType(CarDetailsErrorType.LoadPolicy);
    } finally {
      setSubmittingType(CarDetailsSubmittingType.None);
      hideModal();
      resetClaimForm();
    }
  };

  /**
   * Handles add-claim form submission.
   */
  const handleClaimSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    submitClaim();
  };

  /**
   * Opens the add-claim modal when the car has an active policy.
   */
  const handleClaim = () => {
    if (!carId || !hasActivePolicy) {
      return;
    }

    setModalType(CarDetailsModalType.Claim);
  };

  /**
   * Handles add-car form submission.
   */
  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isViewMode) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    /**
     * Creates a car from the current form values.
     */
    const submitCar = async () => {
      try {
        setSubmittingType(CarDetailsSubmittingType.Car);
        setErrorType(CarDetailsErrorType.None);
        await addCar(getSaveCarPayload(formValues));
        goBack();
      } catch (error) {
        console.error(error);
        setErrorMessage(
          getApiErrorMessage(error, API_ERROR_MESSAGES.ADD_CAR)
        );
        setErrorType(CarDetailsErrorType.CreateCar);
      } finally {
        setSubmittingType(CarDetailsSubmittingType.None);
      }
    };

    submitCar();
  };

  const errorModalContent = getErrorModalContent(
    errorType,
    errorMessage
  );
  const historyTableData = getHistoryTableRows(historyItems);
  const categoryFieldOptions = getCategoryFieldOptions(
    formValues.category,
    categoryOptions
  );
  const modalContent =
    modalType === CarDetailsModalType.AddPolicy
      ? {
          title: 'Add Policy',
          description: (
            <AddPolicyModalForm
              values={policyFormValues}
              errors={policyErrors}
              submitError={policySubmitError}
              onFieldChange={updatePolicyField}
              onSubmit={handleAddPolicySubmit}
            />
          ),
          primaryCta: {
            label:
              submittingType === CarDetailsSubmittingType.Policy
                ? 'Saving...'
                : 'Save',
            form: 'add-car-policy-form',
            type: 'submit' as const,
            disabled: isSubmissionInProgress,
          },
          secondaryCta: {
            label: 'Cancel',
            onClick: closeAddPolicyModal,
            disabled: isSubmissionInProgress,
            variant: 'secondary' as const,
          },
          onClose: closeAddPolicyModal,
        }
      : modalType === CarDetailsModalType.Claim
        ? {
            title: 'Add Claim',
            description: (
              <ClaimModalForm
                values={claimFormValues}
                errors={claimErrors}
                backendError={claimBackendError}
                isDisabled={isSubmissionInProgress}
                onFieldChange={updateClaimField}
                onSubmit={handleClaimSubmit}
              />
            ),
            primaryCta: {
              label:
                submittingType === CarDetailsSubmittingType.Claim
                  ? 'Saving...'
                  : 'Save',
              form: 'add-car-claim-form',
              type: 'submit' as const,
              disabled: isSubmissionInProgress,
            },
            secondaryCta: {
              label: 'Cancel',
              onClick: closeClaimModal,
              disabled: isSubmissionInProgress,
              variant: 'secondary' as const,
            },
            onClose: closeClaimModal,
          }
      : modalType === CarDetailsModalType.History
        ? {
            title: 'History',
            width: '960px',
            description: <HistoryModalContent data={historyTableData} />,
            secondaryCta: {
              label: 'Cancel',
              onClick: hideModal,
              variant: 'secondary' as const,
            },
            onClose: hideModal,
          }
      : null;
  const modalTestId =
    modalType === CarDetailsModalType.AddPolicy
      ? 'add-policy-modal'
      : modalType === CarDetailsModalType.Claim
        ? 'add-claim-modal'
        : modalType === CarDetailsModalType.History
          ? 'history-modal'
          : 'car-details-modal';

  return (
    <div data-testid="car-details-page">
      <Header title={isViewMode ? 'View Car' : 'Add Car'} />

      {isLoadingData ? (
        <Loading message="Loading data..." />
      ) : (
        <>
          {isViewMode && (
            <PolicyPanelSection
              policyTitleId={policyTitleId}
              hasActivePolicy={hasActivePolicy}
              hasHistoryItems={!!historyItems.length}
              onAddClaim={handleClaim}
              onSeeHistory={openHistoryModal}
              onAddPolicy={openAddPolicyModal}
            />
          )}

          <CarDetailsForm
            formValues={formValues}
            errors={errors}
            categoryFieldOptions={categoryFieldOptions}
            isViewMode={isViewMode}
            isSubmissionInProgress={isSubmissionInProgress}
            isLoadingCategories={isLoadingCategories}
            isCreatingCar={
              submittingType === CarDetailsSubmittingType.Car
            }
            onFieldChange={updateField}
            onSubmit={handleSubmit}
            onBack={goBack}
          />
        </>
      )}

      <Modal
        isOpen={!!modalContent}
        data-testid={modalTestId}
        title={modalContent?.title ?? ''}
        width={modalContent?.width}
        description={modalContent?.description}
        primaryCta={modalContent?.primaryCta}
        secondaryCta={modalContent?.secondaryCta}
        onClose={modalContent?.onClose}
      />

      <Modal
        isOpen={!!errorModalContent}
        data-testid="car-details-error-modal"
        title={errorModalContent?.title ?? ''}
        description={errorModalContent?.description ?? ''}
        primaryCta={{
          label: 'OK',
          onClick: hideErrorModal,
        }}
        onClose={hideErrorModal}
      />
    </div>
  );
};
