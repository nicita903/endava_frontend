import type { ButtonHTMLAttributes, ReactNode } from 'react';

import type { ButtonVariant } from '../Button/types';

export interface ModalCta {
  'data-testid'?: string;
  disabled?: boolean;
  form?: string;
  label: string;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  variant?: ButtonVariant;
}

export interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: ReactNode;
  width?: string;
  primaryCta?: ModalCta;
  secondaryCta?: ModalCta;
  onClose?: () => void;
  'data-testid'?: string;
}
