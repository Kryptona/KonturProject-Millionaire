import {useEffect, useState} from 'react';
import {loadState, saveState} from './localStogageUtils';

function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    return loadState(key, initialValue);
  });
  const setValue = (value: any) => {
    setStoredValue(value);
  };

  useEffect(() => {
    saveState(key, storedValue);
  }, [storedValue]);

  return [storedValue, setValue];
}

export {useLocalStorage};
