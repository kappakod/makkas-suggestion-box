import React, { createContext, useState, useContext } from "react";

// Create the AppContext
export const AppContext = createContext();

// Create the AppProvider component
export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [gameList, setGameList] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  // Value object to be provided by the context
  const appContextValue = {
    isLoading,
    setIsLoading,
    gameList,
    setGameList,
    platforms,
    setPlatforms
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the AppContext values
export const useAppContext = () => useContext(AppContext);
