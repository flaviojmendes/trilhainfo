import { forwardRef } from 'react';
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const { 'aria-label': ariaLabel, icon, className, ...rest } = { ...props };

  return (
    <button
      {...rest}
      className={`inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-md bg-[#EDF2F7] transition-colors hover:bg-[#E2E8F0] disabled:cursor-not-allowed disabled:bg-[#E2E8F0]/40 disabled:hover:bg-[#E2E8F0]/40 ${className}`}
      ref={ref}
    >
      {ariaLabel && <span className="sr-only">{ariaLabel}</span>}
      {icon}
    </button>
  );
});

IconButton.displayName = 'IconButton';

export default IconButton;
