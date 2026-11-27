import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { setAuthToken, setUnauthorizedHandler } from '@/core/http/authSession';
import { signOutFromGoogle } from '../google';

const TOKEN_KEY = 'auth_token';

export type SessionUser = {
  id: number;
  fullname: string;
  email: string;
  address?: string | null;
  city?: string | null;
  phone?: string | null;
  country?: string | null;
  description?: string | null;
  iat: number;
  exp: number;
};

type AuthContextType = {
  token: string | null;
  user: SessionUser | null;
  loading: boolean;
  signIn: (token: string) => Promise<void>;
  updateToken: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

function decodeValidToken(token: string | null): SessionUser | null {
  if (!token) return null;
  try {
    const user = jwtDecode<SessionUser>(token);
    const expired = user.exp && user.exp * 1000 <= Date.now();
    return expired ? null : user;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const applySession = useCallback(async (newToken: string | null) => {
    const decoded = decodeValidToken(newToken);
    const validToken = decoded ? newToken : null;

    if (validToken) await SecureStore.setItemAsync(TOKEN_KEY, validToken);
    else await SecureStore.deleteItemAsync(TOKEN_KEY);

    setAuthToken(validToken); // para el cliente HTTP
    setToken(validToken);
    setUser(decoded);
  }, []);

  const signOut = useCallback(async () => {
    await signOutFromGoogle();
    await applySession(null);
  }, [applySession]);

  useEffect(() => {
    (async () => {
      await applySession(await SecureStore.getItemAsync(TOKEN_KEY));
      setLoading(false);
    })();
  }, [applySession]);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      signOut();
    });
    return () => setUnauthorizedHandler(null);
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{ token, user, loading, signIn: applySession, updateToken: applySession, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
