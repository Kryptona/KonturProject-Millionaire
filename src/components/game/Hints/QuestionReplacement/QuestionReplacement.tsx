import styles from './QuestionReplacement.scss';
import React, {Dispatch, SetStateAction} from 'react';
import {Hint} from '../../../shared/Hint/Hint';
import {getQuestionsList, updateQuestionList} from '../../../../utils/Questions';
import {QuestionModel} from '../../../../models/QuestionModel';
import {faArrowRightArrowLeft} from '@fortawesome/free-solid-svg-icons';

interface Props {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  disable: boolean;
  setQuestionsList: (p: () => ReadonlyArray<QuestionModel>) => void;
  isActiveFiftyFifty: boolean;
  isActiveRightToWrong: boolean;
  isSoundActive: boolean;
}

export const QuestionReplacement: React.FC<Props> = ({
  isActive,
  setIsActive,
  disable,
  setQuestionsList,
  isActiveFiftyFifty,
  isActiveRightToWrong,
  isSoundActive,
}) => {
  const click = () => {
    updateQuestionList();
    setQuestionsList(() => getQuestionsList(false));
  };
  return (
    <Hint
      className={styles.root}
      onClick={click}
      isActive={isActive}
      setIsActive={setIsActive}
      disable={disable || !isActiveFiftyFifty || !isActiveRightToWrong}
      icon={faArrowRightArrowLeft}
      isSoundActive={isSoundActive}
    />
  );
};
