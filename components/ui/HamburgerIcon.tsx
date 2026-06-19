// Hamburger menu icon — uses the project-supplied "hamburger-menu-broken" SVG.
// Inherits color from `currentColor` so we can tint with text-[#e8c96a] etc.
import type { SVGProps } from 'react';

interface HamburgerIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export default function HamburgerIcon({ size = 24, ...rest }: HamburgerIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...rest}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M4 7h3m13 0h-9m9 10h-3M4 17h9m-9-5h16"
      />
    </svg>
  );
}
