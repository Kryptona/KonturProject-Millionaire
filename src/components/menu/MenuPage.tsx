import React from 'react';
import millionaire from '../../img/millionaire_icon.svg';
import styles from './MenuPage.scss';

export const MenuPage: React.FC = () => {
    console.log(styles);
    return (
        <div className={styles.root}>
            <img className={styles.millionare_icon} src={millionaire}/>
            MenuPage
        </div>
    );
};
