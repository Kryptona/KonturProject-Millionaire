import React from 'react';
import styles from "./CustomInput.scss";
import cn from "classnames";

interface Props {
    readonly className?: string;
    readonly value?: string;
    readonly onChange?: (value: string) => void;
    readonly placeholder?: string;
}

export const CustomInput: React.FC<Props> = ({className, value, onChange, placeholder}) => {
    return (
        <input
            className={cn(styles.root, className)}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
        />
    );
}
