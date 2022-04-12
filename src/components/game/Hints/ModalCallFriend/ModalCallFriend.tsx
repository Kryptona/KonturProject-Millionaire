import styles from './ModalCallFriend.scss';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Modal from 'react-modal';
import {CustomButton, CustomButtonUse} from '../../../shared/CustomButton/CustomButton';
import {modalStyles} from '../../ModalEndGame/ModalEndGame';
import {getPhrase} from '../../../../utils/ListPhrasesFriend';
import friend from '/src/img/friend.png';
import {HintModalModel} from '../../../../models/HintModalModel';

export const ModalCallFriend: React.FC<HintModalModel> = ({isOpen, setOpenModal, questionNumber, questions}) => {
  const [text, setText] = useState('');
  useEffect(() => {
    setText(getPhrase(questions, questionNumber));
  }, []);
  return (
    <Modal isOpen={isOpen} className={styles.root} style={modalStyles}>
      <div className={styles.window}>
        <img className={styles.img} src={friend} alt={'friend'} />
        <span className={styles.text}>{text}</span>
      </div>
      <CustomButton className={styles.button} use={CustomButtonUse.blue} onClick={() => setOpenModal(false)}>
        хорошо
      </CustomButton>
    </Modal>
  );
};
