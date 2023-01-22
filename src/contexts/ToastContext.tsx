import { createContext, useState } from 'react';
import {
  ToastProvider as RadixToastProvider,
  Viewport,
} from '@radix-ui/react-toast';
import { Toast } from '../components/Toast';
import { ToastProps } from '../components/Toast/types';

const classByPosition = {
  'top-right': 'top-0 right-0',
  top: 'top-0 left-1/2 transform -translate-x-1/2',
  'top-left': 'top-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  bottom: 'bottom-0 left-1/2 transform -translate-x-1/2',
  'bottom-left': 'bottom-0 left-0',
};

const DEFAULT_CLOSE_TIMEOUT = 2000;
const DEFAULT_POSITION = 'top-right';

interface ToastContextData {
  addToast: (props: ToastProps) => void;
}

export const ToastContext = createContext<ToastContextData>(
  {} as ToastContextData
);

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<ToastProps[]>([] as ToastProps[]);
  const [toastPosition, setToastPosition] =
    useState<NonNullable<ToastProps['position']>>(DEFAULT_POSITION);

  function addToast({
    title,
    message,
    position,
    status,
    closable = true,
    duration = DEFAULT_CLOSE_TIMEOUT,
    type = 'foreground',
  }: ToastProps) {
    setToasts((prev) => {
      return [
        ...prev,
        { title, message, position, status, closable, duration, type },
      ];
    });

    setToastPosition(position ?? DEFAULT_POSITION);
  }

  return (
    <RadixToastProvider>
      <ToastContext.Provider value={{ addToast }}>
        {children}

        {toasts.map((toast, index) => (
          <Toast
            key={`${toast.title || toast.message || ''}-${index}`}
            {...toast}
          />
        ))}

        <Viewport
          className={`fixed ${classByPosition[toastPosition]} flex flex-col p-4 gap-4 w-96 max-w-full m-0 list-none z-50 outline-none`}
        />
      </ToastContext.Provider>
    </RadixToastProvider>
  );
}
