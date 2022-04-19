import styles from './ModalEndGame.scss';
import React, {useEffect} from 'react';
import {CustomButton, CustomButtonUse} from '../../shared/CustomButton/CustomButton';
import Modal from 'react-modal';
import {useNavigate} from 'react-router-dom';
import useSound from 'use-sound';
import audioFileWinGame from '/src/sounds/winGame.mp3';

interface PropsEndGame {
  scores: number;
  name: string;
  isOpen: boolean;
  resetGame: () => void;
  isSoundActive: boolean;
}

export const ModalEndGame: React.FC<PropsEndGame> = ({scores, name, isOpen, resetGame, isSoundActive}) => {
  const rout = useNavigate();
  const [soundWinGame, {stop}] = useSound(audioFileWinGame, {volume: 1});

  useEffect(() => {
    if (isSoundActive) return soundWinGame();
  });

  const onStatistics = () => {
    rout('/statistics');
    stop();
  };

  const onMenu = () => {
    rout('/');
    stop();
  };

  const restartGame = () => {
    resetGame();
    stop();
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
