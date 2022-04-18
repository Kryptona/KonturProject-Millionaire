import styles from './Hint.scss';
import React, {Dispatch, SetStateAction} from 'react';
import cn from 'classnames';
import {QuestionModel} from '../../../models/QuestionModel';
import audioFile from '/src/sounds/selectHint.mp3';
import useSound from 'use-sound';

interface Props {
  className: string;
  img: string;
  onClick: () => void;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  disable: boolean;
}

export interface PropsHint {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  disable: boolean;
  questions: QuestionModel;
}

export const Hint: React.FC<Props> = ({className, img, onClick, isActive, setIsActive, disable}) => {
  const [soundHintClick] = useSound(audioFile, {volume: 1});
  const handleClick = () => {
    if (isActive && !disable) {
      soundHintClick();
      setIsActive(false);
      onClick();
    }
  };
  return (
    <button
      className={cn(styles.root, {[styles.isActive]: isActive, [styles.isNotActive]: !isActive}, className)}
      onClick={handleClick}>
      <img className={styles.img} src={img} alt="img" />
    </button>
  );
};
