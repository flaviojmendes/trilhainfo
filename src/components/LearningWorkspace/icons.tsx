type IconProps = { className?: string };

export function AISymbol({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true" fill="none">
      <path d="M10 2 12.3 7.7 18 10l-5.7 2.3L10 18l-2.3-5.7L2 10l5.7-2.3L10 2Z" />
    </svg>
  );
}

export function CheckIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true" fill="none">
      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

export function FlagIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true" fill="none">
      <path d="M5 18V3m0 1h9.5l-2 3.5 2 3.5H5" />
    </svg>
  );
}

export function SummitIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true" fill="none">
      <path d="m2 17 5.5-9 3 4.5L13 9l5 8H2Z" />
      <path d="M13 9V3.5h3.5L15.5 5l1 1.5H13" />
    </svg>
  );
}

export function BranchIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true" fill="none">
      <circle cx="5.5" cy="4.5" r="2" />
      <circle cx="5.5" cy="15.5" r="2" />
      <circle cx="14.5" cy="7.5" r="2" />
      <path d="M5.5 6.5v7M14.5 9.5c0 3-4 2.5-7.5 4.6" />
    </svg>
  );
}

export function MapIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true" fill="none">
      <path d="M4 5.5c3-3 5 3 8 0s4 0 4 0M4 10c3-3 5 3 8 0s4 0 4 0M4 14.5c3-3 5 3 8 0s4 0 4 0" />
    </svg>
  );
}

export function BookIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true" fill="none">
      <path d="M10 5.5C8.5 4 6 3.5 3 4v11.5c3-.5 5.5 0 7 1.5m0-11.5C11.5 4 14 3.5 17 4v11.5c-3-.5-5.5 0-7 1.5m0-11.5V17" />
    </svg>
  );
}

export function ListIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true" fill="none">
      <path d="M7.5 5H17M7.5 10H17M7.5 15H17" />
      <circle cx="3.75" cy="5" r=".75" />
      <circle cx="3.75" cy="10" r=".75" />
      <circle cx="3.75" cy="15" r=".75" />
    </svg>
  );
}
