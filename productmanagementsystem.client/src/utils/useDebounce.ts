import { useCallback, useRef } from 'react';

export const useDebounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const debounced = useCallback(
    (...args: Parameters<F>) => {
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
      timeoutRef.current = setTimeout(() => func(...args), waitFor);
    },
    [func, waitFor],
  );
  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};
