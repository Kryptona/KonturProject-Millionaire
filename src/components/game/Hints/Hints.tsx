import styles from './Hints.scss';
import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {FiftyFifty} from './FifryFifty/FiftyFifty';
import {RightToWrong} from './RightToWrong/RightToWrong';
import {HallHelp} from './HallHelp/HallHelp';
import {QuestionReplacement} from './QuestionReplacement/QuestionReplacement';
import {CallFriend} from './CallFriend/CallFriend';
import {QuestionModel} from '../../../models/QuestionModel';
import {useLocalStorage} from '../../../utils/Hooks';
import {loadState} from '../../../utils/SessionStogageUtils';

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
  const [activeFifty, setActiveFifty] = useLocalStorage('activeFifty', true);
  const [visibleRightToWrong, setVisibleRightToWrong] = useLocalStorage('visibleRightToWrong', true);
  const [activeHallHelp, setActiveHallHelp] = useLocalStorage('activeHallHelp', true);
  const [activeQuestionReplacement, setActiveQuestionReplacement] = useLocalStorage('activeQuestionReplacement', true);
  const [activeCallFriend, setActiveCallFriend] = useLocalStorage('activeCallFriend', true);

  useEffect(() => {
    setActiveFifty(loadState('activeFifty', true));
    setVisibleRightToWrong(loadState('visibleRightToWrong', true));
    setActiveHallHelp(loadState('activeHallHelp', true));
    setActiveQuestionReplacement(loadState('activeQuestionReplacement', true));
    setActiveCallFriend(loadState('activeCallFriend', true));
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
        isActiveFiftyFifty={activeFifty}
        isActiveRightToWrong={visibleRightToWrong}
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
