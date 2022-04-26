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
import {GlassButton} from '../shared/GlassView/GlassButton';
import {useLocalStorage} from '../../utils/Hooks';

export const MenuPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [volume] = useLocalStorage('soundLevel', 0);
  const [menuThemeSound, {stop}] = useSound(audioFileMenuTheme, {volume: volume});
  const [startGameSound] = useSound(audioFileStartGame, {volume: volume});
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

  const onClickSoundIcon = () => {
    if (isSoundActive) {
      stop();
      setIsSoundActive(false);
    } else {
      menuThemeSound();
      setIsSoundActive(true);
    }
  };

  useEffect(() => stop, [stop]);

  const checkerSetUserName = (name: string) => {
    if (name.length <= 30) setUserName(name);
  };

  return (
    <div className={styles.root}>
      <GlassButton className={styles.sound_bt} onClick={onClickSoundIcon}>
        <FontAwesomeIcon color={'white'} size={'lg'} icon={isSoundActive ? faBell : faBellSlash} />
      </GlassButton>

      <img className={styles.millionare_icon} src={millionaire} alt="icon" />
      <CustomInput
        className={styles.nickname_input}
        placeholder={placeholder}
        value={userName}
        onChange={(value) => checkerSetUserName(value)}
      />

      <HexagonLink className={styles.bt} use={HexagonViewUse.secondary} to={'/game'} onClick={onStartGame}>
        Начать игру
      </HexagonLink>
      <HexagonLink className={styles.bt} use={HexagonViewUse.secondary} to={'/statistics'}>
        Таблица лидеров
      </HexagonLink>
      <HexagonLink className={styles.bt} use={HexagonViewUse.secondary} to={'/settings'}>
        Настройки
      </HexagonLink>
    </div>
  );
};
