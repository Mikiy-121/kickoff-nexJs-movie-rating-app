"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (email) => {
    const username = email.split("@")[0];
    const newUser = { email, username };
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

