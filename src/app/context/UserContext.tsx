// src/app/context/UserContext.tsx
'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { getCurrentUser } from '@/app/lib/cognito';

type UserContextType = {
  accessToken: string | null;
  email: string | null;
  setAccessToken: (token: string) => void;
  setEmail: (email: string) => void;
};

const UserContext = createContext<UserContextType>({
  accessToken: null,
  email: null,
  setAccessToken: () => {},
  setEmail: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) return;

    user.getSession((err, session: CognitoUserSession | null) => {
      if (err || !session?.isValid()) return;

      setAccessToken(session.getAccessToken().getJwtToken());
      const claims = session.getIdToken().decodePayload();
      setEmail(claims.email);
    });
  }, []);

  return (
    <UserContext.Provider value={{ accessToken, email, setAccessToken, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
