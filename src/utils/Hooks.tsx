import {useEffect, useState} from 'react';
import {loadState, saveState} from './localStogageUtils';

function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    let init = loadState(key, initialValue);
    if (key === 'timer' && init > 0) {
      init = init - 1;
    }
    return init;
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
