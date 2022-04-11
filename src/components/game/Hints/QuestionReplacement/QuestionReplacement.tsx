import styles from './QuestionReplacement.scss';
import React, {Dispatch, SetStateAction} from 'react';
import {Hint, PropsHint} from '../../../shared/Hint/Hint';
import logo from '/src/img/millionaire_icon.svg';
import {getQuestionsList, updateQuestionList} from '../../../../utils/Questions';
import {QuestionModel} from '../../../../models/QuestionModel';

interface Props {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  disable: boolean;
  setQuestionsList: (p: () => ReadonlyArray<QuestionModel>) => void;
}

export const QuestionReplacement: React.FC<Props> = ({isActive, setIsActive, disable, setQuestionsList}) => {
  const click = () => {
    updateQuestionList();
    setQuestionsList(() => getQuestionsList());
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
