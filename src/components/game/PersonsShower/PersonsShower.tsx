import React from 'react';
import GamerThink from '../../../img/gifs_animations/Think_Phoenix.gif';
import GamerNegative from '../../../img/gifs_animations/Negative_Phoenix.gif';
import GamerWait from '../../../img/gifs_animations/Deskhit_Blink_Phoenix.gif';
import GamerChoose from '../../../img/gifs_animations/Choose_Phoenix.gif';
import GamerPositive from '../../../img/gifs_animations/Positive_Phoenix.gif';
import HostThinking from '../../../img/gifs_animations/Think_Edgeworth.gif';
import HostTalking from '../../../img/gifs_animations/Talk_Edgeworth.gif';
import HostNegative from '../../../img/gifs_animations/Negative_Edgeworth.gif';
import HostStand from '../../../img/gifs_animations/Stand_Edgeworth.gif';
import styles from './PersonsShower.scss';

export enum PersonsShowerStage {
  asking,
  thinking,
  answering,
  winning,
  loosing,
}

interface Props {
  readonly stage: PersonsShowerStage;
}

export const PersonsShower: React.FC<Props> = ({stage}) => {
  const personsStage = personsStages[stage];
  return (
    <div className={styles.root}>
      <img className={styles.image_gamer} src={personsStage.gamerUrl} alt="Изображение игрока" />
      <img className={styles.image_host} src={personsStage.hostUrl} alt="Изображение ведущего" />
    </div>
  );
};

interface PersonsStage {
  readonly gamerUrl: string;
  readonly hostUrl: string;
}

const personsStages: Record<PersonsShowerStage, PersonsStage> = {
  // Ведущий зачитывает вопрос
  [PersonsShowerStage.asking]: {gamerUrl: GamerWait, hostUrl: HostTalking},
  // Игрок обдумывает ответ
  [PersonsShowerStage.thinking]: {gamerUrl: GamerThink, hostUrl: HostStand},
  // Игрок выбирает вариант ответа и ждет результат
  [PersonsShowerStage.answering]: {gamerUrl: GamerChoose, hostUrl: HostStand},
  // Игрок ответил правильно
  [PersonsShowerStage.winning]: {gamerUrl: GamerPositive, hostUrl: HostThinking},
  // Игрок проиграл
  [PersonsShowerStage.loosing]: {gamerUrl: GamerNegative, hostUrl: HostNegative},
};
