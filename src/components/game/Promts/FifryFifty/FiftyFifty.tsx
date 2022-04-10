import styles from './FiftyFifty.scss';
import React from 'react';
import {Prompt} from '../../../shared/Promt/Prompt';
import logo from '/src/img/millionaire_icon.svg';

export const FiftyFifty: React.FC = () => {
  const click = () => {
    console.log('FiftyFifty');
  };
  return <Prompt img={logo} name={styles.root} onClick={click} />;
};
