import styles from './AnimationAnswerButton.scss';
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {AnswerCustomButton} from '../AnswerCustomButton/AnswerCustomButton';
import cn from 'classnames';
import {ListActiveAnswer} from '../../../utils/ListActiveAnswers';
import useSound from 'use-sound';
import audioFileClick from '/src/sounds/selectAnswer.mp3';

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
  readonly isSoundActive: boolean;
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
  isSoundActive,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [soundOnClick] = useSound(audioFileClick, {volume: 1});
  let delayedCall = useRef<NodeJS.Timeout | undefined>(undefined);
  const timeChangeQuestion = 4000;

  const changeField = () => {
    onClick();
    if (!isDisable && ListActiveAnswer[letter]) {
      if (isSoundActive) soundOnClick();
      setIsDisable(true);
      setIsClicked(!isClicked);

      delayedCall.current = setTimeout(() => {
        setIsClicked(false);
        setIsDisable(false);
        setIsAnswerBacklight(false);
      }, timeChangeQuestion);
    }
  };
  useEffect(() => {
    return () => {
      if (delayedCall.current) {
        clearTimeout(delayedCall.current);
      }
    };
  }, []);
  const isActive = ListActiveAnswer[letter];

  return (
    <AnswerCustomButton
      className={
        isClicked || (isAnswerBacklight && classNameFieldAnswer) || !isActive
          ? cn(styles.root, {
              [styles.contentRight]: classNameFieldAnswer,
              [styles.contentFalse]: !classNameFieldAnswer,
              [styles.rightAnswer]: isAnswerBacklight && classNameFieldAnswer,
              [styles.falseAnswer]: isAnswerBacklight && !classNameFieldAnswer,
              [styles.isNotActive]: !isActive,
            })
          : undefined
      }
      letter={letter}
      onClick={() => changeField()}
      disable={isDisable || !isActive}>
      {answerText}
    </AnswerCustomButton>
  );
};
