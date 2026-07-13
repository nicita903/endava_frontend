import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { API_ERROR_MESSAGES } from '../../api/constants';
import { getApiErrorMessage } from '../../api/errors';
import { addOwner } from '../../api/owners/addOwner';
import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { Modal } from '../../components/Modal';
import { ROUTES } from '../../constants/routes';

import { OwnerDetailsForm } from './components/OwnerDetailsForm';
import { useDriverCategoryOptions } from './hooks/useDriverCategoryOptions';
import { useOwnerForm } from './hooks/useOwnerForm';
import { getSaveOwnerPayload } from './utils';

/**
 * Renders the create-owner page and coordinates submission.
 */
export const OwnerDetails = () => {
  const navigate = useNavigate();
  const {
    errors,
    updateField,
    validate,
    values: formValues,
  } = useOwnerForm();
  const {
    driverCategoryOptions,
    hasDriverCategoryOptions,
    isLoadingCategories,
  } = useDriverCategoryOptions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  /**
   * Closes the create-owner error modal.
   */
  const closeErrorModal = () => setSubmitError('');

  /**
   * Validates and submits the owner form to the API.
   */
  const submitOwner = async () => {
    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError('');

      await addOwner(getSaveOwnerPayload(formValues));
      navigate(ROUTES.OWNERS);
    } catch (error) {
      console.error(error);
      setSubmitError(
        getApiErrorMessage(error, API_ERROR_MESSAGES.ADD_OWNER)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles the owner form submit event.
   */
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    await submitOwner();
  };

  /**
   * Retries the latest create-owner request.
   */
  const handleRetry = async () => {
    closeErrorModal();
    await submitOwner();
  };

  if (isLoadingCategories || isSubmitting) {
    return (
      <div data-testid="owner-details-page">
        <Loading
          message={
            isLoadingCategories
              ? 'Loading driver categories...'
              : 'Creating owner...'
          }
        />
      </div>
    );
  }

  return (
    <div data-testid="owner-details-page">
      <Header title="Add Owner" />

      <OwnerDetailsForm
        driverCategoryOptions={driverCategoryOptions}
        errors={errors}
        formValues={formValues}
        hasDriverCategoryOptions={hasDriverCategoryOptions}
        isSubmitting={isSubmitting}
        onCancel={() => navigate(ROUTES.OWNERS)}
        onFieldChange={updateField}
        onSubmit={handleSubmit}
      />

      <Modal
        isOpen={!!submitError}
        data-testid="owner-details-error-modal"
        title={API_ERROR_MESSAGES.OWNER_CREATE_ERROR_TITLE}
        description={submitError}
        primaryCta={{
          label: 'Retry',
          onClick: handleRetry,
        }}
        secondaryCta={{
          label: 'OK',
          onClick: closeErrorModal,
        }}
        onClose={closeErrorModal}
      />
    </div>
  );
};
