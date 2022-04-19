import styles from './RightToWrong.scss';
import React, {Dispatch, SetStateAction} from 'react';
import {Hint} from '../../../shared/Hint/Hint';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

interface Props {
  readonly setActiveRightToWrong: Dispatch<SetStateAction<boolean>>;
  readonly isActive: boolean;
  readonly setIsActive: Dispatch<SetStateAction<boolean>>;
  readonly disable: boolean;
  isSoundActive: boolean;
}

export const RightToWrong: React.FC<Props> = ({
  setActiveRightToWrong,
  isActive,
  setIsActive,
  disable,
  isSoundActive,
}) => {
  const onClick = () => {
    setActiveRightToWrong(true);
  };
  return (
    <Hint
      icon={faXmark}
      className={styles.root}
      onClick={onClick}
      isActive={isActive}
      setIsActive={setIsActive}
      disable={disable}
      isSoundActive={isSoundActive}
    />
  );
};
