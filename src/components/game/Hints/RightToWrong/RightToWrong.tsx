import styles from './RightToWrong.scss';
import React, {Dispatch, SetStateAction} from 'react';
import {Hint} from '../../../shared/Hint/Hint';
import logo from '/src/img/rightToWrong.png';

interface Props {
  readonly setActiveRightToWrong: Dispatch<SetStateAction<boolean>>;
  readonly isActive: boolean;
  readonly setIsActive: Dispatch<SetStateAction<boolean>>;
  readonly disable: boolean;
}

export const RightToWrong: React.FC<Props> = ({setActiveRightToWrong, isActive, setIsActive, disable}) => {
  const onClick = () => {
    setActiveRightToWrong(true);
  };
  return (
    <Hint
      img={logo}
      className={styles.root}
      onClick={onClick}
      isActive={isActive}
      setIsActive={setIsActive}
      disable={disable}
    />
  );
};
