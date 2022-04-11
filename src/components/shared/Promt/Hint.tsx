import styles from './Hint.scss';
import React, {Dispatch, SetStateAction, useState} from 'react';
import cn from 'classnames';
import {QuestionModel} from '../../../models/QuestionModel';

interface Props {
  name: string;
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

export const Hint: React.FC<Props> = ({name, img, onClick, isActive, setIsActive, disable}) => {
  const handleClick = () => {
    if (isActive && !disable) {
      setIsActive(false);
      onClick();
    }
  };
  return (
    <div
      className={cn(styles.root, {[styles.isActive]: isActive, [styles.isNotActive]: !isActive})}
      onClick={handleClick}>
      <img className={styles.img} src={img} alt="img" />
    </div>
  );
};
