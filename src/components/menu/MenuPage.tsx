import React from 'react';
import millionaire from '../../img/millionaire_icon.svg';
import styles from './MenuPage.scss';
import {CustomInput} from '../shared/CustomInput/CustomInput';
import {CustomButton, CustomButtonUse} from '../shared/CustomButton/CustomButton';
import {useNavigate} from 'react-router-dom';
import initQuestionsList from '../../utils/Questions';

export const MenuPage: React.FC = () => {
  const rout = useNavigate();
  const onStartGame = () => {
    initQuestionsList();
    rout('/game');
  };
  const onStatistics = () => {
    console.log('onStatistics clicked');
  };

  const onSettings = () => {
    console.log('onSettings clicked');
  };

  return (
    <div className={styles.root}>
      <img className={styles.millionare_icon} src={millionaire} alt="icon" />
      <CustomInput className={styles.nickname_input} placeholder={'Введите ник'} />
      <CustomButton className={styles.play_game_button} onClick={onStartGame} use={CustomButtonUse.secondary}>
        Начать игру
      </CustomButton>
      <div className={styles.buttons}>
        <CustomButton onClick={onStatistics} use={CustomButtonUse.secondary}>
          Статистика
        </CustomButton>
        <CustomButton onClick={onSettings} use={CustomButtonUse.secondary}>
          Настройки
        </CustomButton>
      </div>
    </div>
  );
};
