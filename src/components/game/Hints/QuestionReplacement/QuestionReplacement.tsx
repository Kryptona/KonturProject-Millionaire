import styles from './QuestionReplacement.scss';
import React from 'react';
import {Hint, PropsHint} from '../../../shared/Promt/Hint';
import logo from '/src/img/millionaire_icon.svg';

export const QuestionReplacement: React.FC<PropsHint> = ({isActive, setIsActive, disable, questions}) => {
  const click = () => {
    console.log('questionReplacement');
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
