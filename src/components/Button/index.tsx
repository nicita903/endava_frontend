import { StyledButton } from './styles';
import type { ButtonProps } from './types';

export const Button = ({
  children,
  variant = 'primary',
  size = 'default',
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      {...props}
    >
      {children}
    </StyledButton>
  );
};
