import React from 'react';
import millionaire from '../../img/millionaire_icon.svg';
import styles from './MenuPage.scss';
import {CustomInput} from "../shared/CustomInput/CustomInput";
import {CustomButton} from "../shared/CustomButton/CustomButton";

export const MenuPage: React.FC = () => {
    const onStartGame = () => {
        console.log('onStartGame clicked');
    };
    const onStatistics = () => {
        console.log('onStatistics clicked');
    };
    const onSettings = () => {
        console.log('onSettings clicked');
    };

    return (
        <div className={styles.root}>
            <img className={styles.millionare_icon} src={millionaire}/>
            <CustomInput className={styles.nickname_input} placeholder={'Введите ник'}/>
            <CustomButton className={styles.play_game_button} onClick={onStartGame}>Начать игру</CustomButton>
            <div className={styles.buttons}>
                <CustomButton onClick={onStatistics}>Статистика</CustomButton>
                <CustomButton onClick={onSettings}>Настройки</CustomButton>
            </div>
        </div>
    );
};
