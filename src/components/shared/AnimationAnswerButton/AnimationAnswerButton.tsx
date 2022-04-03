import styles from "./AnimationAnswerButton.scss"
import React, {Dispatch, SetStateAction, useState} from "react";
import {CustomButtonProps} from "../CustomButton/CustomButton";
import {AnswerCustomButton} from "../AnswerCustomButton/AnswerCustomButton";

interface PropsAnimationButtonAnswer {
    readonly className?: string;
    readonly letter: 'A' | 'B' | 'C' | 'D';
    readonly onClick: CustomButtonProps["onClick"];
    readonly answerText: string;
    readonly isDisable: boolean;
    readonly setIsDisable: Dispatch<SetStateAction<boolean>>
}

export const AnimationAnswerButton: React.FC<PropsAnimationButtonAnswer> = ({
                                                                                className,
                                                                                answerText,
                                                                                onClick,
                                                                                letter,
                                                                                setIsDisable, isDisable
                                                                            }) => {
    const [isClicked, setIsClicked] = useState(false)
    const changeField = () => {
        if (!isDisable) {
            setIsDisable(true)
            setIsClicked(!isClicked)
            setTimeout(() => setIsClicked(false), 6000)
            setTimeout(() => setIsDisable(false), 6000)
        }
    }
    return (
        <div className={styles.root} onClick={() => changeField()}>
            {!isClicked && <AnswerCustomButton className={className} letter={letter} onClick={onClick}
                                               disable={isDisable}>{answerText} </AnswerCustomButton>}
            {isClicked &&
                <span className={styles.content}>
                <span className={styles.letter}>{letter}:</span>
                <span className={styles.text}>{answerText}</span>
            </span>
            }
        </div>
    )
}