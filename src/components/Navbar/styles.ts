import styled from 'styled-components';

export const Container = styled.nav`
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  background-color: ${({ theme }) => theme.colors.background.card};
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  min-height: 64px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 720px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
    padding: 14px 20px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: fit-content;

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 18px;
    font-weight: 700;
    line-height: 1.2;
  }
`;

export const Menu = styled.ul`
  display: flex;
  align-items: center;
  gap: 28px;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 720px) {
    gap: 18px;
    overflow-x: auto;
    width: 100%;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 720px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
`;

export const MenuItem = styled.li<{ $active?: boolean }>`
  flex: 0 0 auto;
`;

export const MenuLink = styled.a<{ $active?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 64px;
  padding: 0 2px;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text.primary : theme.colors.text.secondary};
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 700 : 600)};
  line-height: 1;
  text-decoration: none;
  transition:
    color 160ms ease,
    opacity 160ms ease;

  &::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.text.primary};
    content: '';
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transform: scaleX(${({ $active }) => ($active ? 1 : 0.72)});
    transform-origin: center;
    transition:
      opacity 160ms ease,
      transform 160ms ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};

    &::after {
      opacity: 0.42;
      transform: scaleX(1);
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.border.strong};
    outline-offset: 2px;
  }

  @media (max-width: 720px) {
    min-height: 38px;
  }
`;

export const ThemeToggleButton = styled.button`
  min-height: 36px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.background.elevated};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border.strong};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.border.strong};
    outline-offset: 2px;
  }
`;
