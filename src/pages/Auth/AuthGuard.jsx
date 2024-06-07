import React, { createContext, useContext, useEffect, useMemo } from "react";
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

  const contextValue = useMemo(() => ({
    userId,
    login,
    logout,
    signup
  }), [userId]);


  return (
    <div>
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
