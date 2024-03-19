import React, { createContext, useState, useContext } from "react";

// Create the GamesContext
export const GamesContext = createContext();

// Create the GamesProvider component
export const GamesProvider = ({ children }) => {
  const [gameList, setGameList] = useState([]);
  const [gameExists, setGameExists] = useState(false);

  // Value object to be provided by the context
  const gamesContextValue = {
    gameList,
    setGameList,
    gameExists,
    setGameExists
  };

  return (
    <GamesContext.Provider value={gamesContextValue}>
      {children}
    </GamesContext.Provider>
  );
};

// Custom hook to access the GamesContext values
export const useGamesContext = () => useContext(GamesContext);
