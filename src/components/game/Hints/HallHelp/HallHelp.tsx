import styles from './HallHelp.scss';
import React, {Dispatch, SetStateAction} from 'react';
import {Hint} from '../../../shared/Hint/Hint';
import {faUsers} from '@fortawesome/free-solid-svg-icons';

interface Props {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  disable: boolean;
  setIsOpenHallHelpModal: Dispatch<SetStateAction<boolean>>;
  isSoundActive: boolean;
}

export const HallHelp: React.FC<Props> = ({isActive, setIsActive, disable, setIsOpenHallHelpModal, isSoundActive}) => {
  const click = () => {
    setIsOpenHallHelpModal(true);
  };
  return (
    <Hint
      icon={faUsers}
      className={styles.root}
      onClick={click}
      isActive={isActive}
      setIsActive={setIsActive}
      disable={disable}
      isSoundActive={isSoundActive}
      title="Помощь зала"
    />
  );
};
