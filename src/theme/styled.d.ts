import 'styled-components';
import type { AppTheme } from './theme';

declare module 'styled-components' {
  // Styled-components extends DefaultTheme through declaration merging.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
