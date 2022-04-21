import styles from './ModalCallFriend.scss';
import React from 'react';
import Modal from 'react-modal';
import {HexagonButton} from '../../../shared/HexagonButton/HexagonButton';
import {modalStyles} from '../../ModalEndGame/ModalEndGame';
import {getPhrase} from '../../../../utils/ListPhrasesFriend';
import friend from '/src/img/friend.png';
import {HintModalModel} from '../../../../models/HintModalModel';
import {useSessionStorage} from '../../../../utils/Hooks';
import {HexagonViewUse} from '../../../shared/HexagonView/HexagonView';

export const ModalCallFriend: React.FC<HintModalModel> = ({isOpen, setOpenModal, questionNumber, questions}) => {
  const [phrase] = useSessionStorage('phrase', getPhrase(questions, questionNumber));

  return (
    <Modal isOpen={isOpen} className={styles.root} style={modalStyles}>
      <div className={styles.window}>
        <div className={styles.imageContainer}>
          <img className={styles.img} src={friend} alt={'friend'} />
        </div>
        <span className={styles.text}>{phrase}</span>
      </div>
      <HexagonButton className={styles.button} use={HexagonViewUse.blue} onClick={() => setOpenModal(false)}>
        хорошо
      </HexagonButton>
    </Modal>
  );
};
