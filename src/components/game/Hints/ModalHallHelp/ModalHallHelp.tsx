import styles from './ModalHallHelp.scss';
import React from 'react';
import Modal from 'react-modal';
import {HexagonButton} from '../../../shared/HexagonButton/HexagonButton';
import {getStatistics} from '../../../../utils/Statistics';
import {modalStyles} from '../../ModalEndGame/ModalEndGame';
import {useSessionStorage} from '../../../../utils/Hooks';
import {HexagonViewUse} from '../../../shared/HexagonView/HexagonView';
import {QuestionModel} from '../../../../models/QuestionModel';

interface Props {
  onClose: () => void;
  question: QuestionModel;
  questionNumber: number;
}

export const ModalHallHelp: React.FC<Props> = ({onClose, questionNumber, question}) => {
  const [listStatistics] = useSessionStorage('statistics', getStatistics(question, questionNumber));

  return (
    <Modal isOpen className={styles.root} style={modalStyles} ariaHideApp={false}>
      <div className={styles.statistics}>
        {['A', 'B', 'C', 'D'].map((x) => (
          <div className={styles.diagram}>
            <span className={styles.nameColumn}>{x}:</span>
            <div className={styles.columnWrapper} style={{width: `${listStatistics[x]}%`}}>
              <div className={styles.column}>{listStatistics[x]}%</div>
            </div>
          </div>
        ))}
      </div>
      <HexagonButton className={styles.button} use={HexagonViewUse.blue} onClick={() => onClose()}>
        хорошо
      </HexagonButton>
    </Modal>
  );
};
