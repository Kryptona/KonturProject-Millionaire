import React, {useEffect, useState} from 'react';
import millionaire from '../../img/millionaire_icon.svg';
import styles from './MenuPage.scss';
import {CustomInput} from '../shared/CustomInput/CustomInput';
import {resetList} from '../../utils/ListActiveAnswers';
import {localStorageRepository} from '../../data/localStorageRepository';
import {generateUserName} from '../../utils/userNameGenerator';
import useSound from 'use-sound';
import audioFileStartGame from '/src/sounds/selectAnswer.mp3';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBell, faBellSlash} from '@fortawesome/free-solid-svg-icons';
import audioFileMenuTheme from '/src/sounds/menuTheme.mp3';
import {HexagonViewUse} from '../shared/HexagonView/HexagonView';
import {HexagonLink} from '../shared/HexagonLink/HexagonLink';

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

  const onStartGame = () => {
    sessionStorage.clear();
    if (isSoundActive) {
      startGameSound();
    }

    resetList();
    localStorageRepository.writeUserName(userName?.trim() ? userName : placeholder);
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

      <HexagonLink className={styles.bt} use={HexagonViewUse.secondary} to={'/game'} onClick={onStartGame}>
        <span className={styles.content}>Начать игру</span>
      </HexagonLink>
      <HexagonLink className={styles.bt} use={HexagonViewUse.secondary} to={'/statistics'}>
        <span className={styles.content}>Таблица лидеров</span>
      </HexagonLink>
      <HexagonLink className={styles.bt} use={HexagonViewUse.secondary} to={'/settings'}>
        <span className={styles.content}>Настройки</span>
      </HexagonLink>

      <button className={styles.sound_bt} onClick={onClickSoundIcon}>
        <FontAwesomeIcon icon={isSoundActive ? faBell : faBellSlash} color={'white'} size={'lg'} />
      </button>
    </div>
  );
};
