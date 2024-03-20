import React, { useState } from 'react';
import GameListItem from './gameListItem';
import styles from './gamesList.module.css';

const GamesList = ({ label, games }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const searchFilteredGames = games.filter(game => game.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <>
      {label && (
        <h2 className={styles.header}>{label}</h2>
      )}
        <input 
          className={styles.filterInput} 
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter by name"
        />
      <ul className={styles.gamesList}>
        {searchFilteredGames.map(game => (
          <GameListItem key={`${game.name}`} game={game} showVotes={!game.now_playing}/>
        ))}
      </ul>
    </>
  );
};

export default GamesList;