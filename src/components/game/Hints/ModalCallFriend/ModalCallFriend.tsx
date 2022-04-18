import styles from './ModalCallFriend.scss';
import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {CustomButton, CustomButtonUse} from '../../../shared/CustomButton/CustomButton';
import {modalStyles} from '../../ModalEndGame/ModalEndGame';
import {getPhrase} from '../../../../utils/ListPhrasesFriend';
import friend from '/src/img/friend.png';
import {HintModalModel} from '../../../../models/HintModalModel';
import {loadSessionState, saveSessionState} from '../../../../utils/StogagesUtils';

export const ModalCallFriend: React.FC<HintModalModel> = ({isOpen, setOpenModal, questionNumber, questions}) => {
  const [phrase] = useState(loadSessionState('phrase', getPhrase(questions, questionNumber)));

  useEffect(() => {
    saveSessionState('phrase', phrase);
  }, [phrase]);

  return (
    <Modal isOpen={isOpen} className={styles.root} style={modalStyles}>
      <div className={styles.window}>
        <img className={styles.img} src={friend} alt={'friend'} />
        <span className={styles.text}>{phrase}</span>
      </div>
      <CustomButton className={styles.button} use={CustomButtonUse.blue} onClick={() => setOpenModal(false)}>
        хорошо
      </CustomButton>
    </Modal>
  );
};
