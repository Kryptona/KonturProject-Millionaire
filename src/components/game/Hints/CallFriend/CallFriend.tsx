import styles from './CallFriend.scss';
import React from 'react';
import {Hint, PropsHint} from '../../../shared/Promt/Hint';
import logo from '/src/img/millionaire_icon.svg';

export const CallFriend: React.FC<PropsHint> = ({isActive, setIsActive, disable, questions}) => {
  const click = () => {
    console.log('CallFriend');
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
