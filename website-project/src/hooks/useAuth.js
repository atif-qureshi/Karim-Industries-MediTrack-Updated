import { useEffect, useState } from 'react';

const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';

export function useAuth() {
  const [user, setUser] = useState(() => {
    const saved = window.localStorage.getItem(USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const savedToken = window.localStorage.getItem(TOKEN_KEY);
    if (!savedToken) {
      setUser(null);
    }
  }, []);

  const login = (token, userData) => {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const getToken = () => window.localStorage.getItem(TOKEN_KEY);

  return { user, login, logout, getToken };
}
