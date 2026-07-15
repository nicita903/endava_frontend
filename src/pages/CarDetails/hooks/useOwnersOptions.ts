import { useEffect, useState } from 'react';

import { getOwners } from '../../../api/owners/getOwners';

type SelectOption = {
  label: string;
  value: string;
};

export const useOwnersOptions = (enable:boolean) => {
  const [ownerOptions, setOwnerOptions] = useState<SelectOption[]>([]);
  const [isLoadingOwners, setIsLoadingOwners] = useState<boolean>(true);

  useEffect(() => {
   
    if(!enable){
        return;
    };
    const loadOwners = async () => {
      try {
        const response = await getOwners({
          page: 1,
          per_page: 100,
        });

        const options = response.items.map((owner) => ({
          label: `${owner.name} (${owner.email ?? 'No email'})`,
          value: owner.id,
        }));

        setOwnerOptions(options);
      } finally {
        setIsLoadingOwners(false);
      }
    };

    loadOwners();
  }, [enable]);

  return {
    ownerOptions,
    isLoadingOwners,
  };
};