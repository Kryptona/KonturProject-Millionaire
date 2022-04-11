import styles from './FiftyFifty.scss';
import React from 'react';
import {Hint, PropsHint} from '../../../shared/Promt/Hint';
import logo from '/src/img/millionaire_icon.svg';
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
