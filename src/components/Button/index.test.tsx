import { render, screen } from '../../test-utils';

import { Button } from './index';

describe('Button', () => {
  it('renders button text', () => {
    render(
      <Button>
        Save
      </Button>
    );

    expect(
      screen.getByRole('button')
    ).toHaveTextContent('Save');
  });
});
