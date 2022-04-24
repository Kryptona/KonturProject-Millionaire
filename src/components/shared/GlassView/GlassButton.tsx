import styles from './GlassView.scss';
import React from 'react';
import cn from 'classnames';

type Props = JSX.IntrinsicElements['button'];

export const GlassButton: React.FC<Props> = ({className, ...rest}) => (
  <button {...rest} className={cn(styles.root, className)} />
);
