import styles from "./EndGameMenuPage.scss"
import React, {Dispatch, SetStateAction} from "react";
import {CustomButton} from "../shared/CustomButton/CustomButton"
import Modal from 'react-modal';

interface PropsEndGame {
    scores: string
    name: string
    isOpen: boolean
    setOpenModal: Dispatch<SetStateAction<boolean>>
    resetGame: () => void
}

export const EndGameMenuPage: React.FC<PropsEndGame> = ({scores, name, isOpen, setOpenModal, resetGame}) => {

    const onStatistics = () => {
        console.log('onStatistics clicked');
    };

    const onSettings = () => {
        console.log('onSettings clicked');
    };

    const restartGame = () => {
        setOpenModal(false)
        resetGame()
        console.log('Reset Game')
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <Modal isOpen={isOpen} className={styles.root} style={customStyles}>
            <span className={styles.title}>Вы выиграли {scores}</span>
            <div className={styles.buttons}>
                <CustomButton onClick={restartGame}>Начать игру заново</CustomButton>
                <CustomButton onClick={onStatistics}>Статистика</CustomButton>
                <CustomButton onClick={onSettings}>Настройки</CustomButton>
            </div>
        </Modal>
    )
}