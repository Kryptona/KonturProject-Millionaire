import styles from './HallHelp.scss';
import React from 'react';
import {Prompt} from '../../../shared/Promt/Prompt';
import logo from '/src/img/millionaire_icon.svg';

export const HallHelp: React.FC = () => {
  const click = () => {
    console.log('HallHelp');
  };
  return <Prompt img={logo} name={styles.root} onClick={click} />;
};
