import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/auth';

import GameTile from '../gameTile';
import styles from './search.module.css';


const Toast = ({ children, showToast }) => {
  return (
    <div className={`${styles.toast} ${showToast ? styles.show : styles.hide}`}>
      {children}
    </div>
  );
};

const Search = () => {
  const { accessToken } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(undefined);
  const [isSearching, setIsSearching] = useState(false);
  const [hasNoResults, setHasNoResults] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSearch = async () => {
    setSearchResults([]);
    setIsSearching(true);
    setHasNoResults(false);
    setInputError(false);
    setShowToast(true);

    if (searchTerm === '') {
      setInputError(true);
      setIsSearching(false);
      setShowToast(false);
      return;
    }

    try {
      const response = await axios.get('/api/gameslist', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        params: { search: searchTerm }
      });

      const data = await response.data;
      if (data.length === 0) {
        setHasNoResults(true);
      }
      setSearchResults(data.filter(game => game.cover?.url));
    } catch (error) {
      console.error('Error searching for games:', error);
      setHasNoResults(true);
    }

    setIsSearching(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search for games...'
            error={`${inputError}`}
          />
          {inputError && <span className={styles.error}>Please enter a search term.</span>}
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchResults !== undefined && (
        <Toast showToast={showToast}>
          <>
            {isSearching ? (
              <p>Searching...</p>
            ) : (
              <>
                {hasNoResults ? (
                  <Toast message="No results found." />
                ) : (
                  <>
                    <h2>{searchResults.length} results found</h2>
                    <div className={styles.gameList}>
                    <ul>
                      {searchResults.map((game) => (
                        <GameTile key={game.id} game={game} />
                        ))}
                    </ul>
                        </div>
                  </>
                )}
              </>
            )
            }
          </>
        </Toast >
      )}
    </>
  );
};


export default Search;