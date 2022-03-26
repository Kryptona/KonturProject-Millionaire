import React from 'react';
import {CustomButton, CustomButtonProps, CustomButtonUse} from "../CustomButton/CustomButton";
import styles from './AnswerCustomButton.scss';
import cn from "classnames";

interface Props {
    readonly className?: string;
    readonly children: React.ReactNode;
    readonly letter: 'A' | 'B' | 'C' | 'D';
    readonly onClick: CustomButtonProps["onClick"];
}

export const AnswerCustomButton: React.FC<Props> = ({className, children, letter, onClick}) => {
    return (
        <CustomButton className={cn(styles.root, className)} use={CustomButtonUse.secondary} onClick={onClick}>
            <span className={styles.content}>
                <span className={styles.letter}>{letter}:</span>
                <span className={styles.text}>{children}</span>
            </span>
        </CustomButton>
    );
};
