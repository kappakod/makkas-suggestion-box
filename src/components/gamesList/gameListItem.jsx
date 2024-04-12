import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { gameCollectionRef, updateDoc, doc, increment } from "@/utils/firebase";

import styles from './gameListItem.module.css';

const GamesList = ({ game, showVotes }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [gameVotes, setGameVotes] = useState(game.vote_count);
  const [animate, setAnimate] = useState(false);
  const liRef = useRef(null);

  useEffect(() => {
    if (game.just_added) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 750);
    }
  }, [game]);

  const handleLiHover = (event) => {
    const el = event.target;
    if (event.type === 'mouseenter' && el.style.boxShadow) {
      el.style = '';
    }
  }

  const handleButtonClick = async () => {
    try {
      await updateDoc(doc(gameCollectionRef, `${game.id}`), { vote_count: increment(1) });
      setGameVotes(gameVotes + 1);
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    } catch (error) {
      console.error('Error adding vote: ', error);
    }
  };

  const handleMouseEnter = (event) => {
    const liRect = liRef.current.getBoundingClientRect();
    const normalizedX = (event.clientX - liRect.left - liRect.width / 2) / (liRect.width / 2);
    const normalizedY = (event.clientY - liRect.top - liRect.height / 2) / (liRect.height / 2);
    setMousePosition({ x: normalizedX, y: normalizedY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const gameItemClass = useMemo(() => `${styles.gameItem} ${game.just_added ? styles.justAdded : ''} ${game.now_playing ? styles.nowPlaying : ''} ${game.completed ? styles.completed : ''}`, [game])

  return (
    <li id={`Game${game.id}`} onMouseEnter={handleLiHover} className={styles.gameListItem}>
      <div id={`Game${game.id}--inner`} className={gameItemClass}
        onMouseMove={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * -10}deg) rotateY(${mousePosition.x * 10}deg)`,
        }}
        ref={liRef}
      >
        {game.now_playing && <div className={`${styles.badge} ${styles.nowPlayingBadge}`}>Now Playing</div>}
        {game.just_added && <div className={`${styles.badge} ${styles.justAddedBadge}`}>Just Added</div>}
        <Image
          src={game.image.small_url}
          alt={game.name}
          className={styles.gameImg}
          width={190}
          height={107}
          priority
        />
        <h3>{game.name}</h3>
        {showVotes && (
          <p className={styles.votes}>{gameVotes} votes</p>
        )}
      </div>
      {showVotes && (
        <>
          <span className={`${animate ? styles.floatingVote : ''} ${styles.voteAlert}`}>+1</span>
          <button onClick={handleButtonClick} aria-label='upvote game'/>
        </>
      )}
    </li>
  );
};

export default GamesList;