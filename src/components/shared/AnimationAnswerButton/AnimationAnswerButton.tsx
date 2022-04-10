import styles from './AnimationAnswerButton.scss';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {CustomButtonProps} from '../CustomButton/CustomButton';
import {AnswerCustomButton} from '../AnswerCustomButton/AnswerCustomButton';
import cn from 'classnames';

interface PropsAnimationButtonAnswer {
  readonly className?: string;
  readonly letter: 'A' | 'B' | 'C' | 'D';
  readonly onClick: CustomButtonProps['onClick'];
  readonly answerText: string;
  readonly isDisable: boolean;
  readonly setIsDisable: Dispatch<SetStateAction<boolean>>;
  readonly classNameFieldAnswer: boolean;
  readonly isAnswerBacklight: boolean;
  readonly setIsAnswerBacklight: Dispatch<SetStateAction<boolean>>;
}

export const AnimationAnswerButton: React.FC<PropsAnimationButtonAnswer> = ({
  className,
  answerText,
  onClick,
  letter,
  setIsDisable,
  isDisable,
  classNameFieldAnswer,
  isAnswerBacklight,
  setIsAnswerBacklight,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const changeField = () => {
    if (!isDisable) {
      setIsDisable(true);
      setIsClicked(!isClicked);

      setTimeout(() => {
        setIsClicked(false);
        setIsDisable(false);
        setIsAnswerBacklight(false);
      }, 6000);
    }
  };

  return (
    <div className={styles.root} onClick={() => changeField()}>
      {!isClicked && (!isAnswerBacklight || !classNameFieldAnswer) && (
        <AnswerCustomButton className={className} letter={letter} onClick={onClick} disable={isDisable}>
          {answerText}{' '}
        </AnswerCustomButton>
      )}
      {(isClicked || (isAnswerBacklight && classNameFieldAnswer)) && (
        <span
          className={cn({
            [styles.contentRight]: classNameFieldAnswer,
            [styles.contentFalse]: !classNameFieldAnswer,
            [styles.rightAnswer]: isAnswerBacklight && classNameFieldAnswer,
            [styles.falseAnswer]: isAnswerBacklight && !classNameFieldAnswer,
          })}>
          <span className={styles.letter}>{letter}:</span>
          <span className={styles.text}>{answerText}</span>
        </span>
      )}
    </div>
  );
};
