import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchListItem from './searchListItem';
import { useGamesContext } from '@/context/games';
import styles from './search.module.css';

const Search = () => {
  const { gameExists, setGameExists } = useGamesContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasNoResults, setHasNoResults] = useState(false);
  const [inputError, setInputError] = useState(false);

  const closeSearch = () => {
    setSearchResults([]);
    setSearchTerm('');
    setHasNoResults(false);
  }

  const handleOutsideClick = (e) => {
    const insideSearchContainer = e.target.closest(`.${styles.container}`);
    if (!insideSearchContainer) {
      closeSearch();
    }
  };

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (searchTerm === '') {
        setSearchResults([]);
        return;
      }
      handleSearch();
    }, 750); // Debounce time in milliseconds

    return () => {
      clearTimeout(debounceSearch);
    };
  }, [searchTerm]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [searchResults]);

  const handleSearch = async () => {
    setIsSearching(true);
    setHasNoResults(false);
    setInputError(false);
    setGameExists(false);

    if (searchTerm === '') {
      setInputError(true);
      setIsSearching(false);
      setHasNoResults(false);
      return;
    }

    try {
      const response = await axios.get('/api/searchGames', {
        params: { search: searchTerm }
      });

      const data = await response.data;
      if (data.length === 0) {
        setHasNoResults(true);
      }
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for games:', error);
      setHasNoResults(true);
    }

    setIsSearching(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search for a game to suggest...'
          error={`${inputError}`}
        />
        {isSearching && (
          <div className={styles.loadingContainer}>
            <img src="/loading.gif" alt="loading" />
          </div>
        )}
        {inputError && <span className={styles.error}>Please enter a search term.</span>}
      </div>
      {searchResults.length > 0 && (
        <ul className={styles.searchResults}>
          {isSearching && <li className={styles.searchListItem}>Searching...</li>}
          {(searchResults.length > 0 && !isSearching) && (
            searchResults.map((game) => (
              <SearchListItem key={game.id} game={game} closeHandler={closeSearch} />
            ))
          )}
        </ul>
      )}
      {hasNoResults && !isSearching && <p className={styles.noResults}>No results found.</p>}
      {gameExists && <p className={styles.noResults}>That game has already been added!</p>}
    </div>
  );
};

export default Search;