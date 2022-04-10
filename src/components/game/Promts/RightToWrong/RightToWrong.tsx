import styles from './RightToWrong.scss';
import React from 'react';
import {Prompt} from '../../../shared/Promt/Prompt';
import logo from '/src/img/millionaire_icon.svg';

export const RightToWrong: React.FC = () => {
  const click = () => {
    console.log('RightToWrong');
  };
  return <Prompt img={logo} name={styles.root} onClick={click} />;
};
