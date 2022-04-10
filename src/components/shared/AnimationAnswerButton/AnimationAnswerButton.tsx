import styles from './AnimationAnswerButton.scss';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {CustomButtonProps} from '../CustomButton/CustomButton';
import {AnswerCustomButton} from '../AnswerCustomButton/AnswerCustomButton';
import cn from 'classnames';

interface PropsAnimationButtonAnswer {
  readonly className?: string;
  readonly letter: 'A' | 'B' | 'C' | 'D';
  readonly onClick: () => void;
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
    onClick();

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
    <AnswerCustomButton
      className={
        isClicked || (isAnswerBacklight && classNameFieldAnswer)
          ? cn(styles.root, {
              [styles.contentRight]: classNameFieldAnswer,
              [styles.contentFalse]: !classNameFieldAnswer,
              [styles.rightAnswer]: isAnswerBacklight && classNameFieldAnswer,
              [styles.falseAnswer]: isAnswerBacklight && !classNameFieldAnswer,
            })
          : undefined
      }
      letter={letter}
      onClick={() => changeField()}
      disable={isDisable}>
      {answerText}
    </AnswerCustomButton>
  );
};
