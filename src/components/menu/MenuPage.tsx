import React from 'react';
import millionaire from '../../img/millionaire_icon.svg';
import styles from './MenuPage.scss';
import {CustomInput} from '../shared/CustomInput/CustomInput';
import {CustomButton, CustomButtonUse} from '../shared/CustomButton/CustomButton';
import {useNavigate} from 'react-router-dom';
import {initQuestionsList} from '../../utils/Questions';

export const MenuPage: React.FC = () => {
  const rout = useNavigate();
  const onStartGame = () => {
    rout('/game');
    // initQuestionsList();
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
      <CustomButton className={styles.bt} onClick={onStartGame} use={CustomButtonUse.secondary}>
        <span className={styles.content}> Начать игру</span>
      </CustomButton>
      <CustomButton className={styles.bt} onClick={onStatistics} use={CustomButtonUse.secondary}>
        <span className={styles.content}>Статистика</span>
      </CustomButton>
      <CustomButton className={styles.bt} onClick={onSettings} use={CustomButtonUse.secondary}>
        <span className={styles.content}>Настройки</span>
      </CustomButton>
    </div>
  );
};
