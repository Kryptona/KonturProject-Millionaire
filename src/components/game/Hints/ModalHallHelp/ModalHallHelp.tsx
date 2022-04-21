import styles from './ModalHallHelp.scss';
import React from 'react';
import {HintModalModel} from '../../../../models/HintModalModel';
import Modal from 'react-modal';
import {HexagonButton} from '../../../shared/HexagonButton/HexagonButton';
import {getStatistics} from '../../../../utils/Statistics';
import {modalStyles} from '../../ModalEndGame/ModalEndGame';
import {useSessionStorage} from '../../../../utils/Hooks';
import {HexagonViewUse} from '../../../shared/HexagonView/HexagonView';

export const ModalHallHelp: React.FC<HintModalModel> = ({isOpen, setOpenModal, questionNumber, questions}) => {
  const [listStatistics] = useSessionStorage('statistics', getStatistics(questions, questionNumber));

  return (
    <Modal isOpen={isOpen} className={styles.root} style={modalStyles}>
      <div className={styles.statistics}>
        <div className={styles.diagram}>
          <span className={styles.nameColumn}>A:</span>
          <div className={styles.columnWrapper} style={{width: `${listStatistics['A']}%`}}>
            <div className={styles.column}>{listStatistics['A']}%</div>
          </div>
        </div>
        <div className={styles.diagram}>
          <span className={styles.nameColumn}>B:</span>
          <div className={styles.columnWrapper} style={{width: `${listStatistics['B']}%`}}>
            <div className={styles.column}>{listStatistics['B']}%</div>
          </div>
        </div>
        <div className={styles.diagram}>
          <span className={styles.nameColumn}>C:</span>
          <div className={styles.columnWrapper} style={{width: `${listStatistics['C']}%`}}>
            <div className={styles.column}>{listStatistics['C']}%</div>
          </div>
        </div>
        <div className={styles.diagram}>
          <span className={styles.nameColumn}>D:</span>
          <div className={styles.columnWrapper} style={{width: `${listStatistics['D']}%`}}>
            <div className={styles.column}>{listStatistics['D']}%</div>
          </div>
        </div>
      </div>
      <HexagonButton className={styles.button} use={HexagonViewUse.blue} onClick={() => setOpenModal(false)}>
        хорошо
      </HexagonButton>
    </Modal>
  );
};
