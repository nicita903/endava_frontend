import type { IconProps } from './types';

export const FilterIcon = ({
  size = 14,
  title,
  ...props
}: IconProps) => (
  <svg
    aria-hidden={title ? undefined : true}
    role={title ? 'img' : undefined}
    focusable="false"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M4 5h16l-6 7v5l-4 2v-7L4 5z" />
  </svg>
);
