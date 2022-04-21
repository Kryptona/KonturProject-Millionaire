import React from 'react';
import styles from './HexagonView.scss';
import cn from 'classnames';

export enum HexagonViewUse {
  primary,
  secondary,
  blue,
}

export interface HexagonViewProps {
  readonly className?: string;
  readonly use?: HexagonViewUse;
}

type Props<T> = T &
  HexagonViewProps & {
    readonly base: React.ComponentType<T>;
  };

export function HexagonView<T>({
  base: Base,
  className,
  use = HexagonViewUse.primary,
  ...rest
}: Props<T>): React.ReactElement {
  return <Base {...(rest as unknown as T)} className={cn(styles.root, colorClassNamesMap[use], className)} />;
}

const colorClassNamesMap = {
  [HexagonViewUse.primary]: styles.primary,
  [HexagonViewUse.secondary]: styles.secondary,
  [HexagonViewUse.blue]: styles.blue,
} as const;
