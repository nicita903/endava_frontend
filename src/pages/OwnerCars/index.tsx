import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { Table } from '../../components/Table';
import { ROUTES } from '../../constants/routes';
import { API_ERROR_MESSAGES } from '../../api/constants';
import { getApiErrorMessage } from '../../api/errors';
import { getCars } from '../../api/cars/getCars';
import type { Car } from '../../api/cars/types';
import { getOwner } from '../../api/owners/getOwner';
import type { OwnerSummary } from '../../api/owners/types';
import { deleteCar } from '../../api/cars/deleteCar';
import { Modal } from '../../components/Modal';

import { carColumns } from './constants';
import { Actions, TableActions, Wrapper } from './styles';
import type { CarTableRow } from './types';

export const OwnerCars = () => {
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const selectedOwnerId = ownerId ?? '';
  const [owner, setOwner] = useState<OwnerSummary | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [loadError, setLoadError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);
const [isDeleting, setIsDeleting] = useState(false);
const [deleteError, setDeleteError] = useState('');

const openDeleteModal = (car: Car) => {
  setDeleteError('');
  setCarToDelete(car);
};

const closeDeleteModal = () => {
  if (isDeleting) {
    return;
  }

  setCarToDelete(null);
  setDeleteError('');
};

const confirmDeleteCar = async () => {
  if (!carToDelete) {
    return;
  }

  try {
    setIsDeleting(true);
    setDeleteError('');

    await deleteCar(carToDelete.id);

    setCars((currentCars) =>
      currentCars.filter(
        (car) => car.id !== carToDelete.id
      )
    );

    setCarToDelete(null);
  } catch (error) {
    console.error(error);

    setDeleteError(
      getApiErrorMessage(
        error,
        API_ERROR_MESSAGES.DELETE_CAR
      )
    );
  } finally {
    setIsDeleting(false);
  }
};

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchOwnerCars = async () => {
      setIsLoading(true);
      setLoadError('');

      if (!selectedOwnerId) {
        setOwner(null);
        setCars([]);
        setIsLoading(false);
        return;
      }

      try {
        const carsResponse = await getCars({
          owner_id: selectedOwnerId,
        });

        if (!isCurrentRequest) {
          return;
        }

        const carsData = carsResponse.items;

        setCars(carsData);

        if (carsData.length) {
          setOwner(carsData[0].owner);
          return;
        }

        const ownerData = await getOwner(selectedOwnerId);

        if (!isCurrentRequest) {
          return;
        }

        setOwner(
          ownerData
            ? {
                id: ownerData.id,
                name: ownerData.name,
                email: ownerData.email,
              }
            : null
        );
      } catch (error) {
        console.error(error);

        if (!isCurrentRequest) {
          return;
        }

        setOwner(null);
        setCars([]);
        setLoadError(
          getApiErrorMessage(
            error,
            API_ERROR_MESSAGES.GET_OWNER_CARS
          )
        );
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    };

    fetchOwnerCars();

    return () => {
      isCurrentRequest = false;
    };
  }, [selectedOwnerId]);

  if (isLoading) {
    return <Loading message="Loading owner cars..." />;
  }

  if (!owner) {
    return (
      <div data-testid="owner-cars-page">
        <Wrapper>
          <Header
            title={
              loadError
                ? API_ERROR_MESSAGES.OWNER_CARS_UNAVAILABLE_TITLE
                : API_ERROR_MESSAGES.OWNER_NOT_FOUND_TITLE
            }
            description={loadError || undefined}
          />
          <Button
            type="button"
            variant="secondary"
            data-testid="back-to-owners-button"
            onClick={() => navigate(ROUTES.OWNERS)}
          >
            Back to owners
          </Button>
        </Wrapper>
      </div>
    );
  }

  const tableData: CarTableRow[] = cars.map((car) => ({
    ...car,
    actions: (
  <TableActions>
    <Button
      type="button"
      variant="secondary"
      data-testid={`view-owner-car-${car.id}`}
      onClick={() => navigate(ROUTES.VIEW_CAR(car.id))}
    >
      View more
    </Button>

    <Button
      type="button"
      variant="danger"
      data-testid={`delete-owner-car-${car.id}`}
      onClick={() => openDeleteModal(car)}
    >
      Delete
    </Button>
  </TableActions>
),
  }));

  return (
    <div data-testid="owner-cars-page">
      <Wrapper>
        <Header
          title={`${owner.name}'s Cars`}
          description={owner.email ?? undefined}
        />
        <Actions>
          <Button
            type="button"
            variant="secondary"
            data-testid="back-to-owners-button"
            onClick={() => navigate(ROUTES.OWNERS)}
          >
            Back
          </Button>
          <Button
            type="button"
            data-testid="add-owner-car-button"
            onClick={() =>
              navigate(
                `${ROUTES.ADD_CAR}?owner_id=${encodeURIComponent(
                  owner.id
                )}`
              )
            }
          >
            Add Car
          </Button>
        </Actions>
      </Wrapper>

      <Table
        columns={carColumns}
        data-testid="owner-cars-table"
        data={tableData}
        emptyMessage="No cars found for this owner."
      />
      <Modal
  isOpen={!!carToDelete}
  data-testid="delete-owner-car-modal"
  title="Delete car"
  description={
    deleteError ||
    `Are you sure you want to delete ${
      carToDelete?.vin ?? 'this car'
    }?`
  }
  primaryCta={{
    label: isDeleting ? 'Deleting...' : 'Yes',
    disabled: isDeleting,
    onClick: confirmDeleteCar,
  }}
  secondaryCta={{
    label: 'Cancel',
    disabled: isDeleting,
    onClick: closeDeleteModal,
  }}
  onClose={closeDeleteModal}
/>
    </div>
  );
};
