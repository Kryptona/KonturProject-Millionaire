import React from 'react';
import {HexagonButton, HexagonButtonProps} from '../HexagonButton/HexagonButton';
import styles from './AnswerCustomButton.scss';
import cn from 'classnames';
import {HexagonViewUse} from '../HexagonView/HexagonView';

interface Props {
  readonly className?: string;
  readonly children: React.ReactNode;
  readonly letter: 'A' | 'B' | 'C' | 'D';
  readonly onClick: HexagonButtonProps['onClick'];
  readonly disable?: HexagonButtonProps['disable'];
}

export const AnswerCustomButton: React.FC<Props> = ({className, children, letter, onClick, disable = false}) => {
  return (
    <HexagonButton
      className={cn(styles.root, className)}
      use={HexagonViewUse.secondary}
      onClick={onClick}
      disable={disable}>
      <span className={styles.letter}>{letter}:</span>
      <span className={styles.text}>{children}</span>
    </HexagonButton>
  );
};
