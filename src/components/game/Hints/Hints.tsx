import styles from './Hints.scss';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {FiftyFifty} from './FifryFifty/FiftyFifty';
import {RightToWrong} from './RightToWrong/RightToWrong';
import {HallHelp} from './HallHelp/HallHelp';
import {QuestionReplacement} from './QuestionReplacement/QuestionReplacement';
import {CallFriend} from './CallFriend/CallFriend';
import {QuestionModel} from '../../../models/QuestionModel';
import {questions} from '../../../resources/questions';

interface Props {
  readonly restart: boolean;
  readonly disable: boolean;
  readonly questions: QuestionModel;
}

export const Hints: React.FC<Props> = ({restart, disable, questions}) => {
  const [activeFifty, setActiveFifty] = useState(true);
  const [activeRightToWrong, setActiveRightToWrong] = useState(true);
  const [activeHallHelp, setActiveHallHelp] = useState(true);
  const [activeQuestionReplacement, setActiveQuestionReplacement] = useState(true);
  const [activeCallFriend, setActiveCallFriend] = useState(true);

  useEffect(() => {
    setActiveFifty(true);
    setActiveRightToWrong(true);
    setActiveHallHelp(true);
    setActiveQuestionReplacement(true);
    setActiveCallFriend(true);
  }, [restart]);

  return (
    <div className={styles.root}>
      <FiftyFifty isActive={activeFifty} setIsActive={setActiveFifty} disable={disable} questions={questions} />
      <RightToWrong
        isActive={activeRightToWrong}
        setIsActive={setActiveRightToWrong}
        disable={disable}
        questions={questions}
      />
      <HallHelp isActive={activeHallHelp} setIsActive={setActiveHallHelp} disable={disable} questions={questions} />
      <QuestionReplacement
        isActive={activeQuestionReplacement}
        setIsActive={setActiveQuestionReplacement}
        disable={disable}
        questions={questions}
      />
      <CallFriend
        isActive={activeCallFriend}
        setIsActive={setActiveCallFriend}
        disable={disable}
        questions={questions}
      />
    </div>
  );
};
