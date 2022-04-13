import styles from './Hints.scss';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {FiftyFifty} from './FifryFifty/FiftyFifty';
import {RightToWrong} from './RightToWrong/RightToWrong';
import {HallHelp} from './HallHelp/HallHelp';
import {QuestionReplacement} from './QuestionReplacement/QuestionReplacement';
import {CallFriend} from './CallFriend/CallFriend';
import {QuestionModel} from '../../../models/QuestionModel';
import {loadState, saveState} from '../../../utils/localStogageUtils';

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
  const [activeFifty, setActiveFifty] = useState(loadState('activeFifty', true));
  const [visibleRightToWrong, setVisibleRightToWrong] = useState(loadState('visibleRightToWrong', true));
  const [activeHallHelp, setActiveHallHelp] = useState(loadState('activeHallHelp', true));
  const [activeQuestionReplacement, setActiveQuestionReplacement] = useState(
    loadState('activeQuestionReplacement', true),
  );
  const [activeCallFriend, setActiveCallFriend] = useState(loadState('activeCallFriend', true));

  useEffect(() => {
    setActiveFifty(loadState('activeFifty', true));
    setVisibleRightToWrong(loadState('visibleRightToWrong', true));
    setActiveHallHelp(loadState('activeHallHelp', true));
    setActiveQuestionReplacement(loadState('activeQuestionReplacement', true));
    setActiveCallFriend(loadState('activeCallFriend', true));
  }, [restart]);

  useEffect(() => {
    saveState('activeFifty', activeFifty);
    saveState('visibleRightToWrong', visibleRightToWrong);
    saveState('activeHallHelp', activeHallHelp);
    saveState('activeQuestionReplacement', activeQuestionReplacement);
    saveState('activeCallFriend', activeCallFriend);
  }, [activeFifty, visibleRightToWrong, activeHallHelp, activeQuestionReplacement, activeCallFriend]);

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
