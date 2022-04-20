import React, {useEffect, useState} from 'react';
import millionaire from '../../img/millionaire_icon.svg';
import styles from './MenuPage.scss';
import {CustomInput} from '../shared/CustomInput/CustomInput';
import {CustomButton, CustomButtonUse} from '../shared/CustomButton/CustomButton';
import {useNavigate} from 'react-router-dom';
import {resetList} from '../../utils/ListActiveAnswers';
import {localStorageRepository} from '../../data/localStorageRepository';
import {generateUserName} from '../../utils/userNameGenerator';
import useSound from 'use-sound';
import audioFileStartGame from '/src/sounds/selectAnswer.mp3';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBell, faBellSlash} from '@fortawesome/free-solid-svg-icons';
import audioFileMenuTheme from '/src/sounds/menuTheme.mp3';

export const MenuPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [startGameSound] = useSound(audioFileStartGame, {volume: 1});
  const [menuThemeSound, {stop}] = useSound(audioFileMenuTheme, {volume: 1});
  const [isSoundActive, setIsSoundActive] = useState(false);

  useEffect(() => {
    if (isSoundActive) menuThemeSound();
    setUserName(localStorageRepository.readUserName());
    setPlaceholder(generateUserName());
  }, []);

  const rout = useNavigate();
  const onStartGame = () => {
    sessionStorage.clear();
    if (isSoundActive) startGameSound();
    resetList();
    rout('/game');
    localStorageRepository.writeUserName(userName ? userName : placeholder);
  };
  const onStatistics = () => {
    rout('/statistics');
  };

  const onSettings = () => {
    console.log('onSettings clicked');
  };

  const onSound = () => {
    menuThemeSound();
  };

  const offSound = () => {
    stop();
  };

  const onClickSoundIcon = () => {
    if (isSoundActive) {
      setIsSoundActive(false);
      offSound();
    } else {
      onSound();
      setIsSoundActive(true);
    }
  };

  useEffect(() => stop, [stop]);

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
      <button className={styles.sound_bt} onClick={onClickSoundIcon}>
        {isSoundActive ? (
          <FontAwesomeIcon icon={faBell} color={'white'} size={'lg'} />
        ) : (
          <FontAwesomeIcon icon={faBellSlash} color={'white'} size={'lg'} />
        )}
      </button>
    </div>
  );
};
