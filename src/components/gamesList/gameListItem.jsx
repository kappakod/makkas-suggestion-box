import React, { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './gamesList.module.css';

const GamesList = ({ game }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const liRef = useRef(null);

  const handleMouseEnter = (event) => {
    const liRect = liRef.current.getBoundingClientRect();
    const normalizedX = (event.clientX - liRect.left - liRect.width / 2) / (liRect.width / 2);
    const normalizedY = (event.clientY - liRect.top - liRect.height / 2) / (liRect.height / 2);
    setMousePosition({ x: normalizedX, y: normalizedY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <li
      className={`${styles.gameItem} ${game.now_playing ? styles.nowPlaying : ''}`}
      onMouseMove={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${mousePosition.y * -10}deg) rotateY(${mousePosition.x * 10}deg)`,
      }}
      ref={liRef}
    >
      {game.now_playing && <div className={styles.nowPlayingBadge}>Now Playing</div>} 
      <h3>{game.name}</h3>
      <Image
        src={game.image.small_url}
        alt={game.name}
        className={styles.gameImg}
        width={190}
        height={107}
      />
    </li>
  );
};

export default GamesList;