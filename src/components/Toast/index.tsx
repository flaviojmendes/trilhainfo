import * as RadixToast from '@radix-ui/react-toast';
import { RiCloseLine } from 'react-icons/ri';
import { ToastProps } from './types';

const classByStatus = {
  success: 'bg-green',
  error: 'bg-red',
  warning: 'bg-yellow',
  info: 'bg-blue',
};

export interface ToastComponentProps extends ToastProps {
  toastOpen?: boolean;
  onOpenChange?: (value: boolean) => void;
}

export function Toast({
  status = 'success',
  title,
  message,
  closable = true,
  toastOpen,
  onOpenChange,
  duration,
  type = 'foreground',
}: ToastComponentProps) {
  const hasMessageOnly = !title && message;
  return (
    <RadixToast.Root
      type={type}
      duration={duration}
      open={toastOpen}
      onOpenChange={onOpenChange}
      className={`${classByStatus[status]} relative grid flex-col items-center rounded-md border-2 border-dark-red p-4 shadow-lg data-[state='open']:animate-slideInLeft data-[state='closed']:animate-hide`}
    >
      {title && (
        <RadixToast.Title className={`${message ? 'mb-1' : ''} font-medium text-[black]`}>
          {title}
        </RadixToast.Title>
      )}
      {message && (
        <RadixToast.Description className="m-0 text-sm leading-snug text-[black]">
          {message}
        </RadixToast.Description>
      )}
      {closable && (
        <RadixToast.Close>
          <span
            className={`absolute rounded-md p-1 hover:bg-dark-brown/10 
              ${hasMessageOnly ? 'top-[13px] right-[13px]' : 'top-4 right-4'}
            `}
          >
            <RiCloseLine />
          </span>
        </RadixToast.Close>
      )}
    </RadixToast.Root>
  );
}
