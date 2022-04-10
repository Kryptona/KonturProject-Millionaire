import styles from './Promts.scss';
import React from 'react';
import {FiftyFifty} from './FifryFifty/FiftyFifty';
import {RightToWrong} from './RightToWrong/RightToWrong';
import {HallHelp} from './HallHelp/HallHelp';
import {QuestionReplacement} from './QuestionReplacement/QuestionReplacement';
import {CallFriend} from './CallFriend/CallFriend';

export const Promts: React.FC = () => {
  return (
    <div className={styles.root}>
      <FiftyFifty />
      <RightToWrong />
      <HallHelp />
      <QuestionReplacement />
      <CallFriend />
    </div>
  );
};
