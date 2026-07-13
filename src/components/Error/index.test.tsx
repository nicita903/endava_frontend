import { render, screen } from '../../test-utils';
import { Error } from './index';

describe('Error', () => {
  it('renders message', () => {
    render(
      <Error
        message="Required field"
        data-testid="error-message"
      />
    );

    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'Required field'
    );
    expect(screen.getByTestId('error-message')).toHaveAttribute(
      'role',
      'alert'
    );
  });

  it('renders nothing when message is missing', () => {
    const { container } = render(<Error />);

    expect(container.firstChild).toBeNull();
  });
});
