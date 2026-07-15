import type {
  PropsWithChildren,
  SVGProps,
} from 'react';

type IconProps = PropsWithChildren<
  SVGProps<SVGSVGElement>
>;

const Icon = ({ children, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

export const OwnersIcon = () => (
  <Icon>
    <circle cx="9" cy="8" r="3" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V19" />
    <path d="M15 14h1.5a4 4 0 0 1 4 4v1" />
  </Icon>
);

export const CarIcon = () => (
  <Icon>
    <path d="m4 15 1.5-6h13l1.5 6" />
    <path d="M3 15h18v4H3z" />
    <circle cx="7" cy="17" r="1" />
    <circle cx="17" cy="17" r="1" />
    <path d="M6 9 8 5h8l2 4" />
  </Icon>
);

export const ShieldCheckIcon = () => (
  <Icon>
    <path d="M12 3 5 6v5c0 4.5 2.8 8.1 7 10 4.2-1.9 7-5.5 7-10V6z" />
    <path d="m9 12 2 2 4-5" />
  </Icon>
);

export const ShieldAlertIcon = () => (
  <Icon>
    <path d="M12 3 5 6v5c0 4.5 2.8 8.1 7 10 4.2-1.9 7-5.5 7-10V6z" />
    <path d="M12 8v5" />
    <path d="M12 16h.01" />
  </Icon>
);

export const DriverIcon = () => (
  <Icon>
    <circle cx="12" cy="8" r="3" />
    <path d="M5 20v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" />
  </Icon>
);