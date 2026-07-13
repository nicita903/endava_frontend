import type { MouseEvent } from 'react';

import type { NavbarProps } from './types';
import {
  Container,
  Content,
  LogoContainer,
  Menu,
  MenuItem,
  MenuLink,
  RightSection,
  ThemeToggleButton,
} from './styles';

export const Navbar = ({
  logo,
  items,
  activeItem,
  onThemeToggle,
  onItemClick,
  themeToggleLabel = 'Toggle theme',
  'data-testid': dataTestId = 'navbar',
}: NavbarProps) => {
  const handleItemClick = (
    event: MouseEvent<HTMLAnchorElement>,
    item: NavbarProps['items'][number]
  ) => {
    if (!onItemClick) {
      return;
    }

    event.preventDefault();
    onItemClick(item);
  };

  return (
    <Container data-testid={dataTestId}>
      <Content data-testid={`${dataTestId}-content`}>
        <LogoContainer data-testid={`${dataTestId}-logo`}>
          {logo}
        </LogoContainer>

        <RightSection data-testid={`${dataTestId}-right-section`}>
          <Menu data-testid={`${dataTestId}-menu`}>
            {items.map((item, itemIndex) => {
              const isActive = activeItem === item.href;
              const itemTestId = `${dataTestId}-item-${
                item.testId ?? itemIndex
              }`;

              return (
                <MenuItem
                  key={item.href}
                  $active={isActive}
                  data-testid={itemTestId}
                >
                  <MenuLink
                    href={item.href}
                    $active={isActive}
                    aria-current={isActive ? 'page' : undefined}
                    data-testid={`${itemTestId}-link`}
                    onClick={(event) =>
                      handleItemClick(event, item)
                    }
                  >
                    {item.label}
                  </MenuLink>
                </MenuItem>
              );
            })}
          </Menu>

          {onThemeToggle && (
            <ThemeToggleButton
              type="button"
              data-testid={`${dataTestId}-theme-toggle`}
              onClick={onThemeToggle}
            >
              {themeToggleLabel}
            </ThemeToggleButton>
          )}
        </RightSection>
      </Content>
    </Container>
  );
};
