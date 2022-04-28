import styles from './FiftyFifty.scss';
import React from 'react';
import {Hint, PropsHint} from '../../../shared/Hint/Hint';
import {activeHintsFiftyFifty, ListActiveAnswer} from '../../../../utils/ListActiveAnswers';
import {saveSessionState} from '../../../../utils/StoragesUtils';
import {faScaleBalanced} from '@fortawesome/free-solid-svg-icons';

export const FiftyFifty: React.FC<PropsHint> = ({
  isActive,
  setIsActive,
  disable,
  questions,
  isSoundActive,
  isActiveHint,
  setIsActiveHint,
}) => {
  const click = () => {
    activeHintsFiftyFifty(questions);
    saveSessionState('ListActiveAnswer', ListActiveAnswer);
    setIsActiveHint(true);
  };
  return (
    <Hint
      icon={faScaleBalanced}
      className={styles.root}
      onClick={click}
      isActive={isActive}
      setIsActive={setIsActive}
      disable={disable || isActiveHint}
      isSoundActive={isSoundActive}
      title="50/50"
    />
  );
};
