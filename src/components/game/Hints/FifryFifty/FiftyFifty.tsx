import styles from './FiftyFifty.scss';
import React from 'react';
import {Hint, PropsHint} from '../../../shared/Hint/Hint';
import logo from '/src/img/fiftyFifty.png';
import {activeHintsFiftyFifty, ListActiveAnswer} from '../../../../utils/ListActiveAnswers';
import {saveState} from '../../../../utils/localStogageUtils';

export const FiftyFifty: React.FC<PropsHint> = ({isActive, setIsActive, disable, questions}) => {
  const click = () => {
    activeHintsFiftyFifty(questions);
    console.log('FiftyFifty');
    saveState('ListActiveAnswer', ListActiveAnswer);
  };
  return (
    <Hint
      img={logo}
      className={styles.root}
      onClick={click}
      isActive={isActive}
      setIsActive={setIsActive}
      disable={disable}
    />
  );
};
