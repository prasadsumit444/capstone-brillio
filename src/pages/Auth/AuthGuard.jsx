import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";

const AuthContext = createContext(null);

export const AuthGuard = ({ children }) => {
  const [userId, setUser] = useState(() => {
    return localStorage.getItem("userId");
  });

  useEffect(() => {

    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  const signup = (userId) => {
    setUser(userId);
  }

  const login = (userId) => {
    setUser(userId);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div>
      <AuthContext.Provider value={{ userId, login, logout, signup }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
