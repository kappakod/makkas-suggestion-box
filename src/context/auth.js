import React, { createContext, useState, useContext } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  // Function to handle login
  const login = async () => {
   try {
      const response = await fetch(`/api/auth`, {
        method: "GET"
      });
      if (response.ok) {
        // Authentication successful
        const data = await response.json();
        // Update the context after authentication
        setAccessToken(data.access_token);
        setIsAuthenticated(true);
      } else {
        // Authentication failed
        console.error("Twitch authentication failed");
      }
    } catch (error) {
      console.error("Error calling Twitch authentication API:", error);
    }
    // Update the context after authentication
  };

  // Function to handle logout
  const logout = () => {
    // Perform logout logic here
    setIsAuthenticated(false);
  };

  // Value object to be provided by the context
  const authContextValue = {
    isAuthenticated,
    accessToken,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext values
export const useAuth = () => useContext(AuthContext);
