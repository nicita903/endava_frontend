import { Required, StyledLabel } from "./styles";
import type { LabelProps } from "./types";

export const Label = ({
  htmlFor,
  children,
  required = false,
  'data-testid': dataTestId,
}: LabelProps) => {
  return (
    <StyledLabel htmlFor={htmlFor} data-testid={dataTestId}>
      {children}
      {required && (
        <Required
          aria-hidden="true"
          data-testid={
            dataTestId ? `${dataTestId}-required` : undefined
          }
        >
          *
        </Required>
      )}
    </StyledLabel>
  );
};
