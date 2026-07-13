import { useEffect, useId } from 'react';

import { Button } from '../Button';

import {
  Actions,
  CloseButton,
  Description,
  Dialog,
  Header,
  Overlay,
  Title,
} from './styles';
import type { ModalProps } from './types';

export const Modal = ({
  isOpen,
  title,
  description,
  width,
  primaryCta,
  secondaryCta,
  onClose,
  'data-testid': dataTestId = 'modal',
}: ModalProps) => {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen || !onClose) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const hasActions = !!primaryCta || !!secondaryCta;

  return (
    <Overlay
      data-testid={`${dataTestId}-overlay`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        data-testid={dataTestId}
        $width={width}
      >
        <Header>
          <Title id={titleId}>{title}</Title>
          {onClose && (
            <CloseButton
              type="button"
              aria-label="Close modal"
              data-testid={`${dataTestId}-close`}
              onClick={onClose}
            >
              x
            </CloseButton>
          )}
        </Header>

        {description && (
          <Description
            id={descriptionId}
            data-testid={`${dataTestId}-description`}
          >
            {description}
          </Description>
        )}

        {hasActions && (
          <Actions data-testid={`${dataTestId}-actions`}>
            {secondaryCta && (
              <Button
                type={secondaryCta.type ?? 'button'}
                disabled={secondaryCta.disabled}
                form={secondaryCta.form}
                variant={secondaryCta.variant ?? 'secondary'}
                data-testid={
                  secondaryCta['data-testid'] ??
                  `${dataTestId}-secondary`
                }
                onClick={secondaryCta.onClick}
              >
                {secondaryCta.label}
              </Button>
            )}
            {primaryCta && (
              <Button
                type={primaryCta.type ?? 'button'}
                disabled={primaryCta.disabled}
                form={primaryCta.form}
                variant={primaryCta.variant ?? 'primary'}
                data-testid={
                  primaryCta['data-testid'] ??
                  `${dataTestId}-primary`
                }
                onClick={primaryCta.onClick}
              >
                {primaryCta.label}
              </Button>
            )}
          </Actions>
        )}
      </Dialog>
    </Overlay>
  );
};
