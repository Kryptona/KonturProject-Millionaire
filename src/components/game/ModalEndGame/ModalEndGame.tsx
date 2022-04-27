import styles from './ModalEndGame.scss';
import React, {useEffect} from 'react';
import {HexagonButton} from '../../shared/HexagonButton/HexagonButton';
import Modal from 'react-modal';
import useSound from 'use-sound';
import audioFileWinGame from '/src/sounds/winGame.mp3';
import {HexagonViewUse} from '../../shared/HexagonView/HexagonView';
import {HexagonLink} from '../../shared/HexagonLink/HexagonLink';
import {useLocalStorage} from '../../../utils/Hooks';

interface PropsEndGame {
  score: number;
  onRestart: () => void;
  isSoundActive: boolean;
}

export const ModalEndGame: React.FC<PropsEndGame> = ({score, onRestart, isSoundActive}) => {
  const [volume] = useLocalStorage('soundLevel', 0.5);
  const [soundWinGame, {stop}] = useSound(audioFileWinGame, {volume: volume});

  useEffect(() => {
    if (isSoundActive) {
      return soundWinGame();
    }
  });

  const onRestartWrapper = () => {
    onRestart();
    stop();
  };

  const onStatistics = () => {
    stop();
  };

  const onMenu = () => {
    stop();
  };

  return (
    <Modal isOpen className={styles.root} style={modalStyles} ariaHideApp={false}>
      <span className={styles.title}>Вы выиграли {score} руб.</span>
      <div className={styles.buttons}>
        <HexagonButton use={HexagonViewUse.secondary} onClick={onRestartWrapper}>
          Начать игру заново
        </HexagonButton>
        <HexagonLink use={HexagonViewUse.secondary} to={'/statistics'} onClick={onStatistics}>
          <span className={styles.word}>Статистика</span>
        </HexagonLink>
        <HexagonLink use={HexagonViewUse.secondary} to={'/'} onClick={onMenu}>
          <span className={styles.word}>Меню</span>
        </HexagonLink>
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
  overlay: {
    zIndex: 9,
  },
};
