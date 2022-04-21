import React from 'react';
import GamerThink from '../../../img/gifs_animations/Think_Phoenix.gif';
import GamerNegative from '../../../img/gifs_animations/Negative_Phoenix.gif';
import GamerWait from '../../../img/gifs_animations/Stand_Phoenix.gif';
import GamerChoose from '../../../img/gifs_animations/Choose_Phoenix.gif';
import HostThink from '../../../img/gifs_animations/Think_Edgeworth.gif';
import HostTalking from '../../../img/gifs_animations/Talk_Edgeworth.gif';
import HostNegative from '../../../img/gifs_animations/Negative_Edgeworth.gif';
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
  const gif = gifs[stage];
  return (
    <div className={styles.root}>
      <img src={gif.gamer} className={styles.image_gamer} />
      <img src={gif.host} className={styles.image_host} />
    </div>
  );
};

const gifs = {
  [PersonsShowerStage.asking]: {gamer: GamerWait, host: HostTalking},
  [PersonsShowerStage.thinking]: {gamer: GamerThink, host: HostTalking},
  [PersonsShowerStage.answering]: {gamer: GamerChoose, host: HostTalking},
  [PersonsShowerStage.winning]: {gamer: GamerThink, host: HostTalking},
  [PersonsShowerStage.loosing]: {gamer: GamerThink, host: HostTalking},
};
