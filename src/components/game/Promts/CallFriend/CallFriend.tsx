import styles from './CallFriend.scss';
import React from 'react';
import {Prompt} from '../../../shared/Promt/Prompt';
import logo from '/src/img/millionaire_icon.svg';

export const CallFriend: React.FC = () => {
  const click = () => {
    console.log('CallFriend');
  };
  return <Prompt img={logo} name={styles.root} onClick={click} />;
};
