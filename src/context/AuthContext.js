// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  });

  const [userRole, setUserRole] = useState(() => {
    return sessionStorage.getItem('userRole') || null;
  });

  const [userUsername, setUserUsername] = useState(() =>{
    return sessionStorage.getItem('userUsername') || null;
  });

  const login = (role, username) => {
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('userRole', role);
    sessionStorage.setItem('userUsername', username);
    setIsAuthenticated(true);
    setUserRole(role);
    setUserUsername(username);
  };

  const logout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userUsername');
    setIsAuthenticated(false);
    setUserRole(null);
    setUserUsername(null);
  };

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('userRole');
      sessionStorage.removeItem('userUsername');
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userUsername, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
