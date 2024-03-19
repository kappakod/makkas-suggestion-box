import React, { useState } from 'react';
import GameListItem from './gameListItem';
import styles from './gamesList.module.css';

const GamesList = ({ games }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredGames = games.filter(game => game.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <>
      <h2 className={styles.header}>Suggested Games</h2>
      <input 
        className={styles.filterInput} 
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter by name"
      />
      <ul className={styles.gamesList}>
        {filteredGames.map(game => (
          <GameListItem key={`${game.name}`} game={game} />
        ))}
      </ul>
    </>
  );
};

export default GamesList;