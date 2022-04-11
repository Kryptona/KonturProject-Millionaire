import styles from './QuestionReplacement.scss';
import React from 'react';
import {Hint, PropsHint} from '../../../shared/Promt/Hint';
import logo from '/src/img/millionaire_icon.svg';
import {initQuestionsList} from '../../../../utils/Questions';

export const QuestionReplacement: React.FC<PropsHint> = ({isActive, setIsActive, disable, questions}) => {
  const click = () => {
    initQuestionsList();
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
