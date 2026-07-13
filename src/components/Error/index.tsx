import { StyledError } from './styles';
import type { ErrorProps } from './types';

export const Error = ({
  message,
  'data-testid': dataTestId,
}: ErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <StyledError role="alert" data-testid={dataTestId}>
      {message}
    </StyledError>
  );
};
