import { useEffect, useId, useRef, useState } from 'react';

import {
  CloseButton,
  FilterButton,
  FilterPopover,
  FilterWrapper,
  PopoverHeader,
  PopoverTitle,
} from './styles';

import type { TableFilterProps } from './types';
import { RadioGroup } from '../../Radiogroup';
import { MultiSelect } from '../../Multiselect';
import { FilterIcon } from '../../Icons';
import type { SelectOption } from '../../../types/common';

const ALL_OPTION: SelectOption = {
  label: 'All',
  value: '',
};

const hasActiveFilterValue = (value: string | string[]) =>
  Array.isArray(value)
    ? value.some((item) => item.trim() !== '')
    : value.trim() !== '';

export const TableFilter = <T extends object>({
  filter,
  'data-testid': dataTestId,
}: TableFilterProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverId = useId();
  const isFilterActive = hasActiveFilterValue(filter.value);
  const label = filter.label ?? 'Filter';
  const filterTestId = dataTestId ?? `${filter.name}-filter`;
  const radioOptions = filter.showAllOption
    ? [ALL_OPTION, ...filter.options]
    : filter.options;

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <FilterWrapper
      ref={filterRef}
      data-testid={`${filterTestId}-wrapper`}
    >
      <FilterButton
        type="button"
        $active={isFilterActive}
        data-testid={filterTestId}
        aria-expanded={isOpen}
        aria-controls={isOpen ? popoverId : undefined}
        aria-haspopup="dialog"
        aria-label={`${label} filter${
          isFilterActive ? ' applied' : ''
        }`}
        title="Filter"
        onClick={() => setIsOpen((value) => !value)}
      >
        <FilterIcon />
      </FilterButton>

      {isOpen && (
        <FilterPopover
          id={popoverId}
          role="dialog"
          aria-label={`${label} filter options`}
          data-testid={`${filterTestId}-popover`}
        >
          <PopoverHeader data-testid={`${filterTestId}-header`}>
            <PopoverTitle data-testid={`${filterTestId}-title`}>
              {label}
            </PopoverTitle>

            <CloseButton
              type="button"
              aria-label={`Close ${label} filter`}
              data-testid={`${filterTestId}-close`}
              onClick={() => setIsOpen(false)}
            >
              ✕
            </CloseButton>
          </PopoverHeader>

          {filter.type === 'radio' ? (
            <RadioGroup
              name={filter.name}
              value={filter.value as string}
              options={radioOptions}
              data-testid={`${filterTestId}-radio-group`}
              onChange={filter.onChange}
            />
          ) : (
            <MultiSelect
              name={filter.name}
              value={filter.value as string[]}
              options={filter.options}
              showSelectAll
              data-testid={`${filterTestId}-multiselect`}
              onChange={filter.onChange}
            />
          )}
        </FilterPopover>
      )}
    </FilterWrapper>
  );
};
