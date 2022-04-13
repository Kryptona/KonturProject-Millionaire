import styles from './Hint.scss';
import React, {Dispatch, SetStateAction} from 'react';
import cn from 'classnames';
import {QuestionModel} from '../../../models/QuestionModel';

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
  const handleClick = () => {
    if (isActive && !disable) {
      setIsActive(false);
      onClick();
    }
  };
  return (
    <div
      className={cn(styles.root, {[styles.isActive]: isActive, [styles.isNotActive]: !isActive}, className)}
      onClick={handleClick}>
      <img className={styles.img} src={img} alt="img" />
    </div>
  );
};