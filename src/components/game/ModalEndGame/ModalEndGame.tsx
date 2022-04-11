import styles from './ModalEndGame.scss';
import React, {Dispatch, SetStateAction} from 'react';
import {CustomButton, CustomButtonUse} from '../../shared/CustomButton/CustomButton';
import Modal from 'react-modal';
import {useNavigate} from 'react-router-dom';

interface PropsEndGame {
  scores: number;
  name: string;
  isOpen: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  resetGame: () => void;
}

export const ModalEndGame: React.FC<PropsEndGame> = ({scores, name, isOpen, setOpenModal, resetGame}) => {
  const rout = useNavigate();

  const onStatistics = () => {
    console.log('onStatistics clicked');
  };

  const onMenu = () => {
    rout('/');
    console.log('onMenu clicked');
  };

  const restartGame = () => {
    setOpenModal(false);
    resetGame();
    console.log('Reset Game');
  };

  return (
    <Modal isOpen={isOpen} className={styles.root} style={modalStyles}>
      <span className={styles.title}>Вы выиграли {scores} руб.</span>
      <div className={styles.buttons}>
        <CustomButton use={CustomButtonUse.blue} onClick={restartGame}>
          Начать игру заново
        </CustomButton>
        <CustomButton use={CustomButtonUse.blue} onClick={onStatistics}>
          <span className={styles.word}>Статистика</span>
        </CustomButton>
        <CustomButton use={CustomButtonUse.blue} onClick={onMenu}>
          <span className={styles.word}>Меню</span>
        </CustomButton>
      </div>
    </Modal>
  );
};

export const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
