"use client";

import React from 'react';
import { UserEntity } from '@/model/user.entity';

export const userContext = React.createContext<{
  user: UserEntity,
  setUser: () => void,
} | any>(null)

export function UserProvider(
  {
    children,
  }: {
    children: React.ReactNode;
  }
) {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    fetch('/api/session/me').then(res => res.json()).then(res => {
      if (res.status) setUser(res.data);
    });
  }, []);

  return (
    <userContext.Provider value={{
      user, setUser,
    }}>
      {children}
    </userContext.Provider>
  );
}