import styles from './Hint.scss';
import React, {Dispatch, SetStateAction} from 'react';
import cn from 'classnames';
import {QuestionModel} from '../../../models/QuestionModel';
import audioFile from '/src/sounds/selectHint.mp3';
import useSound from 'use-sound';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconDefinition} from '@fortawesome/free-solid-svg-icons';

interface Props {
  className: string;
  onClick: () => void;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  disable: boolean;
  icon: IconDefinition;
  isSoundActive: boolean;
  title: string;
}

export interface PropsHint {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  disable: boolean;
  questions: QuestionModel;
  isSoundActive: boolean;
  isActiveHint: boolean;
  setIsActiveHint: Dispatch<boolean>;
}

export const Hint: React.FC<Props> = ({
  className,
  onClick,
  isActive,
  setIsActive,
  disable,
  icon,
  isSoundActive,
  title,
}) => {
  const [soundHintClick] = useSound(audioFile, {volume: 1});
  const handleClick = () => {
    if (isActive && !disable) {
      if (isSoundActive) soundHintClick();
      setIsActive(false);
      onClick();
    }
  };
  return (
    <button
      className={cn(styles.root, {[styles.isActive]: isActive, [styles.isNotActive]: !isActive}, className)}
      onClick={handleClick}
      title={title}>
      <FontAwesomeIcon icon={icon} color={'yellow'} size={'lg'} />
    </button>
  );
};
