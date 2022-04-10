import styles from './QuestionReplacement.scss';
import React from 'react';
import {Prompt} from '../../../shared/Promt/Prompt';
import logo from '/src/img/millionaire_icon.svg';

export const QuestionReplacement: React.FC = () => {
  const click = () => {
    console.log('questionReplacement');
  };
  return <Prompt img={logo} name={styles.root} onClick={click} />;
};
