import styles from './ModalHallHelp.scss';
import React from 'react';
import {HintModalModel} from '../../../../models/HintModalModel';
import Modal from 'react-modal';
import {CustomButton, CustomButtonUse} from '../../../shared/CustomButton/CustomButton';

export const ModalHallHelp: React.FC<HintModalModel> = ({isOpen, setOpenModal, questionNumber, questions}) => {
  return (
    <Modal isOpen={isOpen} className={styles.root}>
      <CustomButton className={styles.button} use={CustomButtonUse.blue} onClick={() => setOpenModal(false)}>
        хорошо
      </CustomButton>
    </Modal>
  );
};
