import styles from './ModalHallHelp.scss';
import React, {useEffect, useState} from 'react';
import {HintModalModel} from '../../../../models/HintModalModel';
import Modal from 'react-modal';
import {CustomButton, CustomButtonUse} from '../../../shared/CustomButton/CustomButton';
import {getStatistics} from '../../../../utils/Statistics';

export const ModalHallHelp: React.FC<HintModalModel> = ({isOpen, setOpenModal, questionNumber, questions}) => {
  const [listStatistics, setListStatistics] = useState<{[id: string]: number}>(() =>
    getStatistics(questions, questionNumber),
  );
  useEffect(() => {
    setListStatistics(() => getStatistics(questions, questionNumber));
  }, []);
  return (
    <Modal isOpen={isOpen} className={styles.root}>
      <div className={styles.statistics}>
        <div className={styles.diagram}>
          <span>A:</span>
          <div className={styles.A} style={{width: `${listStatistics['A']}%`}}>
            {listStatistics['A']}%
          </div>
        </div>
        <div className={styles.diagram}>
          <span>B:</span>
          <div className={styles.B} style={{width: `${listStatistics['B']}%`}}>
            {listStatistics['B']}%
          </div>
        </div>
        <div className={styles.diagram}>
          <span>C:</span>
          <div className={styles.C} style={{width: `${listStatistics['C']}%`}}>
            {listStatistics['C']}%
          </div>
        </div>
        <div className={styles.diagram}>
          <span>D:</span>
          <div className={styles.D} style={{width: `${listStatistics['D']}%`}}>
            {listStatistics['D']}%
          </div>
        </div>
      </div>
      <CustomButton className={styles.button} use={CustomButtonUse.blue} onClick={() => setOpenModal(false)}>
        хорошо
      </CustomButton>
    </Modal>
  );
};
