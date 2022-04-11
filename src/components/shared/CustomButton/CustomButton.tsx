import React from 'react';
import cn from 'classnames';
import styles from './CustomButton.scss';

export enum CustomButtonUse {
  primary,
  secondary,
  blue,
}

export interface CustomButtonProps {
  readonly className?: string;
  readonly children: React.ReactNode;
  readonly use?: CustomButtonUse;
  readonly onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  readonly disable?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  className,
  children,
  use = CustomButtonUse.primary,
  onClick,
  disable = false,
}) => {
  const colorClassName = colorClassNamesMap[use];

  return (
    <button className={cn(styles.root, colorClassName, className)} onClick={onClick} disabled={disable}>
      {children}
    </button>
  );
};

const colorClassNamesMap = {
  [CustomButtonUse.primary]: styles.primary,
  [CustomButtonUse.secondary]: styles.secondary,
  [CustomButtonUse.blue]: styles.blue,
} as const;
