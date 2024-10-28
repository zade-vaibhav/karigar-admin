// AuthContext.js
import React, { createContext, useState, useContext } from "react";

// Create the context
const AuthContext = createContext();

// Custom hook for accessing the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to manage login state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate login/logout functions
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
