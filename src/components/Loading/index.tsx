import { LoadingWrapper, Spinner } from './styles';
import type { LoadingProps } from './types';

export const Loading = ({
  message = 'Loading...',
  fullScreen = true,
  'data-testid': dataTestId = 'loading',
}: LoadingProps) => {
  return (
    <LoadingWrapper
      role="status"
      aria-live="polite"
      $fullScreen={fullScreen}
      data-testid={dataTestId}
    >
      <Spinner
        aria-hidden="true"
        data-testid={`${dataTestId}-spinner`}
      />
      <span data-testid={`${dataTestId}-message`}>{message}</span>
    </LoadingWrapper>
  );
};
