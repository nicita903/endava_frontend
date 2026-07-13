import type { TableColumn } from '../../components/Table/types';

import type { Car, CarTableRow } from './types';

export const carColumns: TableColumn<CarTableRow>[] = [
  {
    key: 'vin',
    header: 'VIN',
  },
  {
    key: 'make',
    header: 'Make',
  },
  {
    key: 'model',
    header: 'Model',
  },
  {
    key: 'year_of_manufacture',
    header: 'Year',
  },
  {
    key: 'power',
    header: 'Power',
  },
  {
    key: 'cc',
    header: 'CC',
  },
  {
    key: 'category',
    header: 'Emission category',
  },
  {
    key: 'actions',
    header: 'Actions',
  },
];

export const cars: Car[] = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    vin: 'JTDBR32E720012345',
    make: 'Toyota',
    model: 'Corolla',
    year_of_manufacture: 2021,
    power: 132,
    cc: 1798,
    category: 'EURO6',
    owner: {
      id: '6fe61055-c2f9-4cc0-9d69-df946e529d1e',
      name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
    },
  },
  {
    id: '9aab47ea-baf1-4f67-8c95-ee80c2da1f34',
    vin: 'WVWZZZ1KZ9W123456',
    make: 'Volkswagen',
    model: 'Golf',
    year_of_manufacture: 2019,
    power: 150,
    cc: 1498,
    category: 'EURO5',
    owner: {
      id: '6fe61055-c2f9-4cc0-9d69-df946e529d1e',
      name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
    },
  },
  {
    id: 'a4ce15d8-9171-4a08-92fd-5ab006b65064',
    vin: '1FADP3F20FL123456',
    make: 'Ford',
    model: 'Focus',
    year_of_manufacture: 2020,
    power: 125,
    cc: 999,
    category: 'EURO5',
    owner: {
      id: '8d380846-48e7-44c4-a9c6-b7633c7b658d',
      name: 'Jamie Taylor',
      email: 'jamie.taylor@example.com',
    },
  },
  {
    id: '650fb21c-3d38-40ad-84b9-22247337d304',
    vin: 'WD3PE7CD5JP123456',
    make: 'Mercedes-Benz',
    model: 'Sprinter',
    year_of_manufacture: 2018,
    power: 163,
    cc: 2143,
    category: 'EURO6',
    owner: {
      id: 'c77f41a2-f592-4a95-84dc-6f92677c24c7',
      name: 'Sam Rivera',
      email: 'sam.rivera@example.com',
    },
  },
  {
    id: 'b1c8763f-4361-43ac-b89b-f0b86b3998c0',
    vin: 'UU1HSDACN65012345',
    make: 'Dacia',
    model: 'Duster',
    year_of_manufacture: 2022,
    power: 130,
    cc: 1332,
    category: 'HYBRID',
    owner: {
      id: '1114e667-2a7e-4c99-8027-b770542137b4',
      name: 'Mina Popescu',
      email: 'mina.popescu@example.com',
    },
  },
];
