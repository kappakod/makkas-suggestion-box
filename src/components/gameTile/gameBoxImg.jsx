import React from 'react';
import styles from './gameBoxImg.module.css';

const GameBoxImg = ({ imgUrl }) => {
  return (
    <div className={styles.wrapper}>
      <img src={imgUrl} alt="Game Image" className={styles.gameImage} />
    </div>
  );
};

export default GameBoxImg;