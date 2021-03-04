export interface VueToast {
  open: (options: ToastOptions) => void;
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  default: (message: string, options?: ToastOptions) => void;
}

export interface ToastOptions {
  message?: string;
  type?: string;
  position?: string;
  duration?: number;
  dismissable?: boolean;
  onClick?: Function;
  onClose?: Function;
  queue?: boolean;
}
