import React from 'react';
import styles from './Item.scss';
import {HighScore} from '../../models/HighScore';
import {stringToAvatar} from '../../utils/avatarSources';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCrown} from '@fortawesome/free-solid-svg-icons';

interface Props {
  highScore: HighScore;
  index: number;
}

export const Item: React.FC<Props> = ({highScore, index}) => {
  const avatar = stringToAvatar(highScore.id);

  const rankIcon = renderRankIcon(index);

  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatar} alt={'аватар'} />
      <div className={styles.content}>
        <span className={styles.name}>{highScore.name}</span>
        <span>Очки: {highScore.score}</span>
      </div>
      <span className={styles.rank}>
        {rankIcon && <span className={styles.rank_icon}>{rankIcon}</span>}
        <span>{index} место</span>
      </span>
    </div>
  );
};

function renderRankIcon(index: number): React.ReactNode {
  switch (index) {
    case 1:
      return <FontAwesomeIcon icon={faCrown} color={'#FACC26FF'} />;
    case 2:
      return <FontAwesomeIcon icon={faCrown} color={'#939393FF'} />;
    case 3:
      return <FontAwesomeIcon icon={faCrown} color={'#DE6322FF'} />;
  }
}
