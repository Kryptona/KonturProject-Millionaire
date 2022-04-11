import styles from './Hints.scss';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {FiftyFifty} from './FifryFifty/FiftyFifty';
import {RightToWrong} from './RightToWrong/RightToWrong';
import {HallHelp} from './HallHelp/HallHelp';
import {QuestionReplacement} from './QuestionReplacement/QuestionReplacement';
import {CallFriend} from './CallFriend/CallFriend';
import {QuestionModel} from '../../../models/QuestionModel';

interface Props {
  readonly restart: boolean;
  readonly disable: boolean;
  readonly questions: QuestionModel;
  readonly setActiveRightToWrong: Dispatch<SetStateAction<boolean>>;
  readonly setIsOpenFriedModal: Dispatch<SetStateAction<boolean>>;
  readonly setIsOpenHallHelpModal: Dispatch<SetStateAction<boolean>>;
  readonly setQuestionsList: (p: () => ReadonlyArray<QuestionModel>) => void;
}

export const Hints: React.FC<Props> = ({
  restart,
  disable,
  questions,
  setActiveRightToWrong,
  setIsOpenFriedModal,
  setIsOpenHallHelpModal,
  setQuestionsList,
}) => {
  const [activeFifty, setActiveFifty] = useState(true);
  const [visibleRightToWrong, setVisibleRightToWrong] = useState(true);
  const [activeHallHelp, setActiveHallHelp] = useState(true);
  const [activeQuestionReplacement, setActiveQuestionReplacement] = useState(true);
  const [activeCallFriend, setActiveCallFriend] = useState(true);

  useEffect(() => {
    setActiveFifty(true);
    setVisibleRightToWrong(true);
    setActiveHallHelp(true);
    setActiveQuestionReplacement(true);
    setActiveCallFriend(true);
  }, [restart]);

  return (
    <div className={styles.root}>
      <FiftyFifty isActive={activeFifty} setIsActive={setActiveFifty} disable={disable} questions={questions} />
      <RightToWrong
        isActive={visibleRightToWrong}
        setIsActive={setVisibleRightToWrong}
        disable={disable}
        setActiveRightToWrong={setActiveRightToWrong}
      />
      <HallHelp
        isActive={activeHallHelp}
        setIsActive={setActiveHallHelp}
        disable={disable}
        setIsOpenHallHelpModal={setIsOpenHallHelpModal}
      />
      <QuestionReplacement
        isActive={activeQuestionReplacement}
        setIsActive={setActiveQuestionReplacement}
        disable={disable}
        setQuestionsList={setQuestionsList}
      />
      <CallFriend
        isActive={activeCallFriend}
        setIsActive={setActiveCallFriend}
        disable={disable}
        setIsOpenFriedModal={setIsOpenFriedModal}
      />
    </div>
  );
};
