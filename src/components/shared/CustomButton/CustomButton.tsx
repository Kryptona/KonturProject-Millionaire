import React from 'react';
import cn from 'classnames';
import styles from "./CustomButton.scss";

interface Props {
    readonly className?: string;
    readonly children: React.ReactNode;
    readonly onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}

export const CustomButton: React.FC<Props> = ({className, children, onClick}) => {
    return (
        <button className={cn(styles.root, className)} onClick={onClick}>
            <span>{children}</span>
        </button>
    );
};
