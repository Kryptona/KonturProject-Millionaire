import styles from './FiftyFifty.scss';
import React from 'react';
import {Hint, PropsHint} from '../../../shared/Hint/Hint';
import logo from '/src/img/fiftyFifty.png';
import {activeHintsFiftyFifty} from '../../../../utils/ListActiveAnswers';

export const FiftyFifty: React.FC<PropsHint> = ({isActive, setIsActive, disable, questions}) => {
  const click = () => {
    activeHintsFiftyFifty(questions);
    console.log('FiftyFifty');
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
