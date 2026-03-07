import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('eace_token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('eace_user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('eace_token', token);
    } else {
      localStorage.removeItem('eace_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('eace_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('eace_user');
    }
  }, [user]);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      signIn: ({ token: nextToken, user: nextUser }) => {
        setToken(nextToken);
        setUser(nextUser);
      },
      signOut: () => {
        setToken(null);
        setUser(null);
      },
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
