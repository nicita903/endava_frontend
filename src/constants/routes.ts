export const ROUTE_PATHS = {
  HOME: '/',
  OWNERS: '/',
  ADD_OWNER: '/owners/add',
  OWNER_CARS: '/owners/:ownerId/cars',
  CARS: '/cars',
  ADD_CAR: '/cars/add',
  VIEW_CAR: '/cars/:carId/view',
  ABOUT: '/about',
  DASHBOARD: '/dashboard',
} as const;

export const ROUTES = {
  HOME: '/',
  OWNERS: '/',
  ADD_OWNER: '/owners/add',
  OWNER_CARS: (ownerId: number | string) =>
    `/owners/${ownerId}/cars`,
  CARS: '/cars',
  ADD_CAR: '/cars/add',
  VIEW_CAR: (carId: number | string) => `/cars/${carId}/view`,
  ABOUT: '/about',
  DASHBOARD: '/dashboard',
} as const;
