import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Car } from "../../api/cars/types";
import { Header } from "../../components/Header";
import { ROUTES } from "../../constants/routes";

import { CarsTable } from "./components/CarsTable";
import { useCarsData } from "./hooks/useCarsData";
import { Wrapper } from "./styles";

import { deleteCar } from "../../api/cars/deleteCar";
import { API_ERROR_MESSAGES } from "../../api/constants";
import { getApiErrorMessage } from "../../api/errors";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";

/**
 * Renders the paginated Cars table with server-backed filters.
 */
export const Cars = () => {
  const navigate = useNavigate();
  const {
    cars,
    categoryOptions,
    errorMessage,
    filters,
    handleFilterChange,
    handlePaginationChange,
    hasNextCarsPage,
    isLoading,
    makeOptions,
    modelOptions,
    pagination,
    retryCarsRequest,
  } = useCarsData();

  /**
   * Navigates to the selected car details page.
   */

  const [carToDelete, setCarToDelete] = useState<Car | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const viewCar = (car: Car) => navigate(ROUTES.VIEW_CAR(car.id));

  const openDeleteModal = (car: Car) => {
    setDeleteError("");
    setCarToDelete(car);
  };

  const closeDeleteModal = () => {
    if (isDeleting) {
      return;
    }

    setCarToDelete(null);
    setDeleteError("");
  };

  const confirmDeleteCar = async () => {
    if (!carToDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      setDeleteError("");

      await deleteCar(carToDelete.id);

      setCarToDelete(null);
      retryCarsRequest();
    } catch (error) {
      console.error(error);

      setDeleteError(getApiErrorMessage(error, API_ERROR_MESSAGES.DELETE_CAR));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div data-testid="cars-page">
      <Wrapper>
        <Header title="Cars" />
        <Button
          type="button"
          data-testid="add-car-buttons"
          onClick={() => navigate(ROUTES.ADD_CAR)}
        >
          Add Car
        </Button>
      </Wrapper>

      <CarsTable
        cars={cars}
        categoryOptions={categoryOptions}
        errorMessage={errorMessage}
        filters={filters}
        hasNextCarsPage={hasNextCarsPage}
        isLoading={isLoading}
        makeOptions={makeOptions}
        modelOptions={modelOptions}
        pagination={pagination}
        onFilterChange={handleFilterChange}
        onPaginationChange={handlePaginationChange}
        onRetry={retryCarsRequest}
        onDeleteCar={openDeleteModal}
        onViewCar={viewCar}
      />
      <Modal
        isOpen={!!carToDelete}
        data-testid="delete-car-modal"
        title="Delete car"
        description={
          deleteError ||
          `Are you sure you want to delete ${carToDelete?.vin ?? "this car"}?`
        }
        primaryCta={{
          label: isDeleting ? "Deleting..." : "Yes",
          disabled: isDeleting,
          onClick: confirmDeleteCar,
        }}
        secondaryCta={{
          label: "Cancel",
          disabled: isDeleting,
          onClick: closeDeleteModal,
        }}
        onClose={closeDeleteModal}
      />
    </div>
  );
};
