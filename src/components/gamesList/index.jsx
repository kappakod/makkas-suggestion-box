import React, { useState } from 'react';
import GameListItem from './gameListItem';
import styles from './gamesList.module.css';

const GamesList = ({ label, games }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const incompleteGames = games.filter(game => !game.completed);
  const completedGames = games.filter(game => game.completed);

  return (
    <>
      {label && (
        <h2 className={styles.header}>{label}</h2>
      )}
        {/* <input 
          className={styles.filterInput} 
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter by name"
        /> */}
      <ul className={styles.gamesList}>
        {incompleteGames.map(game => (
          <GameListItem key={`${game.name}`} game={game} showVotes={!game.now_playing}/>
        ))}
      </ul>
      {completedGames.length > 0 && (
        <>
        <h2 className={styles.header}>Games completed on stream</h2>
        <ul className={styles.gamesList}>
          {completedGames.map(game => (
            <GameListItem key={`${game.name}`} game={game} showVotes={false}/>
          ))}
        </ul>
        </>
      )}
    </>
  );
};

export default GamesList;