import styles from './Timer.scss';
import React, {Dispatch, SetStateAction, useEffect} from 'react';

interface PropsTimer {
  time: number;
  setCounter: Dispatch<SetStateAction<number>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  isOpenModal: boolean;
  isDisable: boolean;
}

export const Timer: React.FC<PropsTimer> = ({time, setOpenModal, setCounter, isOpenModal, isDisable}) => {
  useEffect(() => {
    const timer = Number(time > 0 && window.setInterval(() => setCounter(time - 1), 1000));
    if (isDisable || isOpenModal) {
      clearInterval(timer);
    }
    if (time == 0 && !isDisable) {
      setOpenModal(true);
      setCounter(0);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [time]);

  return (
    <div className={styles.root}>
      <div> Осталось времени: {time} сек.</div>
    </div>
  );
};
