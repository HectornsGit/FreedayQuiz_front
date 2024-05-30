'use client'
import { useEffect, useState } from 'react';

//TODO: ver porqué no se puede usar localStorage aqui, da error:"ReferenceError: localStorage is not defined"

const useLocalStorage = (key, defaultValue) => {
  const localStorageValue = localStorage.getItem(key);
  const [state, setState] = useState(
    localStorageValue ? JSON.parse(localStorageValue) : defaultValue
  );
  useEffect(() => {
    if (state) {
    localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
};
export default useLocalStorage;