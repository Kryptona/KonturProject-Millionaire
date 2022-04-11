import styles from './Timre.scss';
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';

interface PropsTimer {
  time: number;
  setCounter: Dispatch<SetStateAction<number>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  isOpenModal: boolean;
  isDisable: boolean;
}
export const Timer: React.FC<PropsTimer> = ({time, setOpenModal, setCounter, isOpenModal, isDisable}) => {
  useEffect(() => {
    const timer = time > 0 && setInterval(() => setCounter(time - 1), 1000);
    if (isDisable || isOpenModal) {
      clearInterval(timer as NodeJS.Timeout);
    }
    if (time == 0) {
      setOpenModal(true);
      setCounter(0);
      clearInterval(timer as NodeJS.Timeout);
    }
    return () => clearInterval(timer as NodeJS.Timeout);
  }, [time]);

  return (
    <div className={styles.root}>
      <div> Осталось времени: {time} сек.</div>
    </div>
  );
};