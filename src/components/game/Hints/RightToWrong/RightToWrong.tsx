import styles from './RightToWrong.scss';
import React, {Dispatch, SetStateAction} from 'react';
import {Hint} from '../../../shared/Promt/Hint';
import logo from '/src/img/millionaire_icon.svg';

interface Props {
  readonly setActiveRightToWrong: Dispatch<SetStateAction<boolean>>;
  readonly isActive: boolean;
  readonly setIsActive: Dispatch<SetStateAction<boolean>>;
  readonly disable: boolean;
}

export const RightToWrong: React.FC<Props> = ({setActiveRightToWrong, isActive, setIsActive, disable}) => {
  const click = () => {
    setActiveRightToWrong(true);
    console.log('RightToWrong');
  };
  return (
    <Hint
      img={logo}
      name={styles.root}
      onClick={click}
      isActive={isActive}
      setIsActive={setIsActive}
      disable={disable}
    />
  );
};
