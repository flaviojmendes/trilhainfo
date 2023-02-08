export type ToastPosition =
  | 'top-right'
  | 'top'
  | 'top-left'
  | 'bottom-right'
  | 'bottom'
  | 'bottom-left';

export type ToastStatus = 'success' | 'error' | 'warning' | 'info';
export type ToastType = 'background' | 'foreground';

export interface ToastProps {
  message?: string;
  title?: string;
  status?: ToastStatus;
  type?: ToastType;
  closable?: boolean;
  position?: ToastPosition;
  duration?: number;
}
