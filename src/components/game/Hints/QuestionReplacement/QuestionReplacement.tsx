import styles from './QuestionReplacement.scss';
import React, {Dispatch, SetStateAction} from 'react';
import {Hint} from '../../../shared/Hint/Hint';
import logo from '/src/img/changeQuestion.png';
import {getQuestionsList, updateQuestionList} from '../../../../utils/Questions';
import {QuestionModel} from '../../../../models/QuestionModel';

interface Props {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  disable: boolean;
  setQuestionsList: (p: () => ReadonlyArray<QuestionModel>) => void;
  isActiveFiftyFifty: boolean;
  isActiveRightToWrong: boolean;
}

export const QuestionReplacement: React.FC<Props> = ({
  isActive,
  setIsActive,
  disable,
  setQuestionsList,
  isActiveFiftyFifty,
  isActiveRightToWrong,
}) => {
  const click = () => {
    updateQuestionList();
    setQuestionsList(() => getQuestionsList(false));
  };
  return (
    <Hint
      img={logo}
      className={styles.root}
      onClick={click}
      isActive={isActive}
      setIsActive={setIsActive}
      disable={disable || !isActiveFiftyFifty || !isActiveRightToWrong}
    />
  );
};
