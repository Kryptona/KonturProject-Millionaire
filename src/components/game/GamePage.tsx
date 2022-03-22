import React, {useState} from 'react';
import styles from './GamePage.scss';
import Question from "../question/Question";

export const GamePage: React.FC = () => {
    return (
        <div className={styles.root}>
            GamePage
            <Question />
        </div>
    );
};
