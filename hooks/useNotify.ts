'use client';

import { toast } from 'react-toastify';

export function useNotify() {
  return {
    success: (msg: string) => toast.success(msg),
    error:   (msg: string) => toast.error(msg),
    info:    (msg: string) => toast.info(msg),
    warn:    (msg: string) => toast.warn(msg),
  };
}
