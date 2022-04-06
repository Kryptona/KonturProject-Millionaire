import styles from './Prompt.scss';
import React, {useState} from 'react';
import cn from 'classnames';

interface Props {
  name: string;
  img: string;
  onClick: () => void;
}

export const Prompt: React.FC<Props> = ({name, img, onClick}) => {
  const [isActive, setIsActive] = useState(true);
  const handleClick = () => {
    if (isActive) {
      setIsActive(false);
      onClick();
    }
  };
  return (
    <div
      className={cn(styles.root, {[styles.isActive]: isActive, [styles.isNotActive]: !isActive})}
      onClick={handleClick}>
      <img className={styles.img} src={img} alt="img" />
    </div>
  );
};
