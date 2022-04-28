import styles from './RightToWrong.scss';
import React, {Dispatch, SetStateAction} from 'react';
import {Hint} from '../../../shared/Hint/Hint';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

interface Props {
  readonly setActiveRightToWrong: Dispatch<SetStateAction<boolean>>;
  readonly isActive: boolean;
  readonly setIsActive: Dispatch<SetStateAction<boolean>>;
  readonly disable: boolean;
  readonly isSoundActive: boolean;
  readonly isActiveHint: boolean;
  readonly setIsActiveHint: Dispatch<boolean>;
}

export const RightToWrong: React.FC<Props> = ({
  setActiveRightToWrong,
  isActive,
  setIsActive,
  disable,
  isSoundActive,
  isActiveHint,
  setIsActiveHint,
}) => {
  const onClick = () => {
    setActiveRightToWrong(true);
    setIsActiveHint(true);
  };
  return (
    <Hint
      icon={faXmark}
      className={styles.root}
      onClick={onClick}
      isActive={isActive}
      setIsActive={setIsActive}
      disable={disable || isActiveHint}
      isSoundActive={isSoundActive}
      title="Право на ошибку"
    />
  );
};
