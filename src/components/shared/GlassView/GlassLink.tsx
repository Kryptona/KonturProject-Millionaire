import styles from './GlassView.scss';
import React from 'react';
import cn from 'classnames';
import {Link, LinkProps} from 'react-router-dom';

type Props = LinkProps;

export const GlassLink: React.FC<Props> = ({className, ...rest}) => (
  <Link {...rest} className={cn(styles.root, className)} />
);
