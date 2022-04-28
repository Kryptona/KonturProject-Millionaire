import styles from './Hints.scss';
import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {FiftyFifty} from './FifryFifty/FiftyFifty';
import {RightToWrong} from './RightToWrong/RightToWrong';
import {HallHelp} from './HallHelp/HallHelp';
import {QuestionReplacement} from './QuestionReplacement/QuestionReplacement';
import {CallFriend} from './CallFriend/CallFriend';
import {QuestionModel} from '../../../models/QuestionModel';
import {useSessionStorage} from '../../../utils/Hooks';
import {loadSessionState} from '../../../utils/StoragesUtils';

interface Props {
  readonly restart: boolean;
  readonly disable: boolean;
  readonly questions: QuestionModel;
  readonly setActiveRightToWrong: Dispatch<SetStateAction<boolean>>;
  readonly setIsOpenFriendModal: Dispatch<SetStateAction<boolean>>;
  readonly setIsOpenHallHelpModal: Dispatch<SetStateAction<boolean>>;
  readonly setQuestionsList: (p: () => ReadonlyArray<QuestionModel>) => void;
  readonly isSoundActive: boolean;
  readonly isActiveHint: boolean;
  readonly setIsActiveHint: Dispatch<boolean>;
}

export const Hints: React.FC<Props> = ({
  restart,
  disable,
  questions,
  setActiveRightToWrong,
  setIsOpenFriendModal,
  setIsOpenHallHelpModal,
  setQuestionsList,
  isSoundActive,
  setIsActiveHint,
  isActiveHint,
}) => {
  const [activeFifty, setActiveFifty] = useSessionStorage('activeFifty', true);
  const [visibleRightToWrong, setVisibleRightToWrong] = useSessionStorage('visibleRightToWrong', true);
  const [activeHallHelp, setActiveHallHelp] = useSessionStorage('activeHallHelp', true);
  const [activeQuestionReplacement, setActiveQuestionReplacement] = useSessionStorage(
    'activeQuestionReplacement',
    true,
  );
  const [activeCallFriend, setActiveCallFriend] = useSessionStorage('activeCallFriend', true);

  useEffect(() => {
    setActiveFifty(loadSessionState('activeFifty', true));
    setVisibleRightToWrong(loadSessionState('visibleRightToWrong', true));
    setActiveHallHelp(loadSessionState('activeHallHelp', true));
    setActiveQuestionReplacement(loadSessionState('activeQuestionReplacement', true));
    setActiveCallFriend(loadSessionState('activeCallFriend', true));
    if (activeFifty && visibleRightToWrong && activeHallHelp && activeQuestionReplacement && activeCallFriend)
      setIsActiveHint(false);
  }, [restart]);

  return (
    <div className={styles.root}>
      <FiftyFifty
        isActive={activeFifty}
        setIsActive={setActiveFifty}
        disable={disable}
        questions={questions}
        isSoundActive={isSoundActive}
        isActiveHint={isActiveHint}
        setIsActiveHint={setIsActiveHint}
      />
      <RightToWrong
        isActive={visibleRightToWrong}
        setIsActive={setVisibleRightToWrong}
        disable={disable}
        setActiveRightToWrong={setActiveRightToWrong}
        isSoundActive={isSoundActive}
        isActiveHint={isActiveHint}
        setIsActiveHint={setIsActiveHint}
      />
      <HallHelp
        isActive={activeHallHelp}
        setIsActive={setActiveHallHelp}
        disable={disable}
        setIsOpenHallHelpModal={setIsOpenHallHelpModal}
        isSoundActive={isSoundActive}
        isActiveHint={isActiveHint}
        setIsActiveHint={setIsActiveHint}
      />
      <QuestionReplacement
        isActive={activeQuestionReplacement}
        setIsActive={setActiveQuestionReplacement}
        disable={disable}
        setQuestionsList={setQuestionsList}
        isSoundActive={isSoundActive}
        isActiveHint={isActiveHint}
        setIsActiveHint={setIsActiveHint}
      />
      <CallFriend
        isActive={activeCallFriend}
        setIsActive={setActiveCallFriend}
        disable={disable}
        setIsOpenFriedModal={setIsOpenFriendModal}
        isSoundActive={isSoundActive}
        isActiveHint={isActiveHint}
        setIsActiveHint={setIsActiveHint}
      />
    </div>
  );
};
