/* eslint-disable react-refresh/only-export-components */

import type { ReactElement, ReactNode } from 'react';
import {
  render as rtlRender,
  type RenderOptions,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { lightTheme } from './theme/theme';

const AllProviders = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
);

const render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) =>
  rtlRender(ui, {
    wrapper: AllProviders,
    ...options,
  });

export * from '@testing-library/react';
export { render };
