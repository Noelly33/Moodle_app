/*import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

type AuthContextType = {
  token: string | null;
  loading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const storedToken = await SecureStore.getItemAsync('auth_token');
      setToken(storedToken);
      setLoading(false);
    };
    loadSession();
  }, []);

  const signIn = async (token: string) => {
    await SecureStore.setItemAsync('auth_token', token);
    setToken(token);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('auth_token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return ctx;
}*/

import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

type UserPayload = {
  id: number;
  fullname: string;
  email: string;
  address?: string;
  city?: string;
  phone?: string;
  country?: string;
  description?: string;
  iat: number;
  exp: number;
};

type AuthContextType = {
  token: string | null;
  user: UserPayload | null;
  loading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const storedToken = await SecureStore.getItemAsync('auth_token');

      if (storedToken) {
        setToken(storedToken);
        setUser(jwtDecode<UserPayload>(storedToken));
      }

      setLoading(false);
    };

    loadSession();
  }, []);

  const signIn = async (token: string) => {
    await SecureStore.setItemAsync('auth_token', token);
    setToken(token);
    setUser(jwtDecode<UserPayload>(token));
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('auth_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return ctx;
}