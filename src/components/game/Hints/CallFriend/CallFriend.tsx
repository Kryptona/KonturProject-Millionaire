import styles from './CallFriend.scss';
import React, {Dispatch, SetStateAction} from 'react';
import {Hint} from '../../../shared/Hint/Hint';
import logo from '/src/img/millionaire_icon.svg';

interface Props {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  disable: boolean;
  setIsOpenFriedModal: Dispatch<SetStateAction<boolean>>;
}

export const CallFriend: React.FC<Props> = ({isActive, setIsActive, disable, setIsOpenFriedModal}) => {
  const clickHint = () => {
    setIsOpenFriedModal(true);
    console.log('CallFriend');
  };
  return (
    <div className={styles.root}>
      <Hint
        img={logo}
        name={styles.hint}
        onClick={clickHint}
        isActive={isActive}
        setIsActive={setIsActive}
        disable={disable}
      />
    </div>
  );
};
