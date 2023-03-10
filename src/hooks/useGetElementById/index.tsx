import { useEffect, useState } from 'react';

export function useGetElementById<T>(elementId: string) {
  const [element, setElement] = useState<T>();

  useEffect(() => {
    if (!element) {
      const foundedElement = document.getElementById(elementId);

      if (foundedElement) {
        setElement(foundedElement as T);
      }
    }
  }, [element, elementId])

  return element;
}
