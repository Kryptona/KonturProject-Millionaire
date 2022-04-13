import React, {useEffect, useState} from 'react';
import millionaire from '../../img/millionaire_icon.svg';
import styles from './MenuPage.scss';
import {CustomInput} from '../shared/CustomInput/CustomInput';
import {CustomButton, CustomButtonUse} from '../shared/CustomButton/CustomButton';
import {useNavigate} from 'react-router-dom';
import {initQuestionsList} from '../../utils/Questions';
import {localStorageRepository} from '../../data/localStorageRepository';
import {generateUserName} from '../../utils/userNameGenerator';

export const MenuPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    setUserName(localStorageRepository.readUserName());
    setPlaceholder(generateUserName());
  }, []);

  const rout = useNavigate();
  const onStartGame = () => {
    rout('/game');
    initQuestionsList();
    localStorageRepository.writeUserName(userName ? userName : placeholder);
  };
  const onStatistics = () => {
    rout('/statistics');
  };

  const onSettings = () => {
    console.log('onSettings clicked');
  };

  return (
    <div className={styles.root}>
      <img className={styles.millionare_icon} src={millionaire} alt="icon" />
      <CustomInput
        className={styles.nickname_input}
        placeholder={placeholder}
        value={userName}
        onChange={setUserName}
      />
      <CustomButton className={styles.bt} onClick={onStartGame} use={CustomButtonUse.secondary}>
        <span className={styles.content}>Начать игру</span>
      </CustomButton>
      <CustomButton className={styles.bt} onClick={onStatistics} use={CustomButtonUse.secondary}>
        <span className={styles.content}>Таблица лидеров</span>
      </CustomButton>
      <CustomButton className={styles.bt} onClick={onSettings} use={CustomButtonUse.secondary}>
        <span className={styles.content}>Настройки</span>
      </CustomButton>
    </div>
  );
};
