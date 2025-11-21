"use client";

import React from 'react';
import { UserEntity } from '@/model/user.entity';
import { apiContext } from '@/context/ApiContext';

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
  const {getData} = React.useContext(apiContext);
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    getData('session/me').then((res: any) => {
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