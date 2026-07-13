import { useLocation } from 'react-router-dom';

import { ROUTE_PATHS } from '../../constants/routes';
import { Navbar } from '../Navbar';

import { Main, Page } from './styles';
import type { LayoutProps } from './types';

export const Layout = ({
  children,
  onThemeToggle,
  themeMode,
}: LayoutProps) => {
  const { pathname } = useLocation();
  const themeToggleLabel =
    themeMode === 'dark' ? 'Light mode' : 'Dark mode';
  const navItems = [
    {
      label: 'Owners',
      href: ROUTE_PATHS.OWNERS,
      testId: 'owners',
    },
    {
      label: 'Cars',
      href: ROUTE_PATHS.CARS,
      testId: 'cars',
    },
    {
      label: 'About',
      href: ROUTE_PATHS.ABOUT,
      testId: 'about',
    },
  ];
  const activeItem = pathname.startsWith('/cars')
    ? ROUTE_PATHS.CARS
    : pathname.startsWith('/owners') || pathname === ROUTE_PATHS.OWNERS
      ? ROUTE_PATHS.OWNERS
      : navItems.find((item) => item.href === pathname)?.href;

  return (
    <Page>
      <Navbar
        logo={<strong>Car Policy</strong>}
        items={navItems}
        activeItem={activeItem}
        themeToggleLabel={themeToggleLabel}
        onThemeToggle={onThemeToggle}
      />

      <Main>{children}</Main>
    </Page>
  );
};
