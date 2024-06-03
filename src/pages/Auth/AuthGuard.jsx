import React, { createContext, useContext } from "react";
import { useState } from "react";
import Signup from "./SignUp";

const AuthContext = createContext(null);

export const AuthGuard = ({ children }) => {
  const [userId, setUser] = useState(3);

  const login = (userId) => {
    setUser(userId);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div>
      <AuthContext.Provider value={{ userId, login, logout, Signup }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
