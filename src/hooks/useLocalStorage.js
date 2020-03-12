import { useState } from "react";
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    return window.localStorage.getItem(key)
      ? JSON.parse(window.localStorage.getItem(key))
      : window.localStorage.setItem(key, JSON.stringify(initialValue));
    /*     return initialValue;
     */
  });
  const setValue = value => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };
  return [storedValue, setValue];
};
