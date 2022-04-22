import styles from './CallFriend.scss';
import React, {Dispatch, SetStateAction} from 'react';
import {Hint} from '../../../shared/Hint/Hint';
import {faPhone} from '@fortawesome/free-solid-svg-icons';

interface Props {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  disable: boolean;
  setIsOpenFriedModal: Dispatch<SetStateAction<boolean>>;
  isSoundActive: boolean;
}

export const CallFriend: React.FC<Props> = ({isActive, setIsActive, disable, setIsOpenFriedModal, isSoundActive}) => {
  const clickHint = () => {
    setIsOpenFriedModal(true);
  };
  return (
    <Hint
      icon={faPhone}
      className={styles.root}
      onClick={clickHint}
      isActive={isActive}
      setIsActive={setIsActive}
      disable={disable}
      isSoundActive={isSoundActive}
      title="Звонок другу"
    />
  );
};
