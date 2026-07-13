import { render, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { Navbar } from './index';

describe('Navbar', () => {
  const items = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About',
      href: '/about',
    },
  ];

  it('renders navigation items', () => {
    render(<Navbar items={items} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('calls onItemClick', async () => {
    const onItemClick = vi.fn();

    render(
      <Navbar
        items={items}
        onItemClick={onItemClick}
      />
    );

    await userEvent.click(screen.getByText('About'));

    expect(onItemClick).toHaveBeenCalledWith(items[1]);
  });
});
