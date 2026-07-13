import { render, screen } from '../../test-utils';
import { Label } from './index';

describe('Label', () => {
  it('renders label text', () => {
    render(<Label data-testid="name-label">Name</Label>);

    expect(screen.getByTestId('name-label')).toHaveTextContent(
      'Name'
    );
  });

  it('renders required indicator', () => {
    render(
      <Label required data-testid="email-label">
        Email
      </Label>
    );

    expect(
      screen.getByTestId('email-label-required')
    ).toHaveTextContent('*');
  });

  it('applies htmlFor attribute', () => {
    render(
      <>
        <Label htmlFor="email" data-testid="email-label">
          Email
        </Label>
        <input id="email" />
      </>
    );

    expect(screen.getByTestId('email-label')).toHaveAttribute(
      'for',
      'email'
    );
  });
});
