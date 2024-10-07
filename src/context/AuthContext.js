import { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Retrieve user from localStorage if it exists
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });


  const login = (email, uniqueId, role) => {
    const loggedInUser = { email, uniqueId, role };
    setUser(loggedInUser);
    // Store the user information in localStorage
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  };

  const logout = () => {
    // Clear user data from state and localStorage
    setUser(null);

    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
