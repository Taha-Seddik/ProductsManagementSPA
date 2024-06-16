import { toast } from 'react-toastify';

type ToastType = 'SUCCESS' | 'FAIL' | 'WARNING' | 'INFO' | 'Error';

export const Notify = (message: string, type: ToastType) => {
  switch (type) {
    case 'SUCCESS': {
      return toast.success(message, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    case 'INFO': {
      return toast.info(message, {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
    case 'FAIL': {
      return toast.error(message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    case 'Error': {
      return toast.error(message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    case 'WARNING': {
      return toast.warn(message);
    }
    default: {
      return null;
    }
  }
};

export const clearAllToasts = () => {
  toast.dismiss();
};
