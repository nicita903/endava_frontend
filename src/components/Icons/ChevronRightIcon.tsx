import type { IconProps } from './types';

export const ChevronRightIcon = ({
  size = 16,
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
    <path d="M9 18l6-6-6-6" />
  </svg>
);
