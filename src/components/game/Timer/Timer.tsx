import styles from './Timer.scss';
import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';

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
    <div>
      <CircularProgressbar
        value={time}
        text={time + ''}
        maxValue={30}
        styles={{
          // Customize the root svg element
          root: {},
          // Customize the path, i.e. the "completed progress"
          path: {
            // Path color
            stroke: `rgba(249, 249, 0, ${time})`,
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',
            strokeWidth: '4',
            // Customize transition animation
            transition: 'stroke-dashoffset 0.5s ease 0s',
            // Rotate the path
            transform: 'rotate(0.0turn)',
            transformOrigin: 'center center',
          },
          // Customize the circle behind the path, i.e. the "total progress"
          trail: {
            // Trail color
            stroke: '#6600ff',
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',
            // Rotate the trail
            transform: 'rotate(0.25turn)',
            transformOrigin: 'center center',
          },
          // Customize the text
          text: {
            dominantBaseline: 'central',
            textAnchor: 'middle',
            // Text color
            fill: '#fff300',
            // Text size
            fontSize: '50px',
          },
        }}
        className={styles.root}
      />
    </div>
  );
};
