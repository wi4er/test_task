"use client";

import React from 'react';
import { UserEntity } from '@/model/user.entity';
import { apiContext } from '@/context/ApiContext';

interface UserData {
  user: UserEntity | null;
  setUser: (user: UserEntity) => void;
  logout: () => Promise<void>;
}

export const userContext = React.createContext<UserData>({} as UserData);

export function UserProvider(
  {
    children,
  }: {
    children: React.ReactNode;
  }
) {
  const {getData, deleteData} = React.useContext(apiContext);
  const [user, setUser] = React.useState<UserEntity | null>(null)

  React.useEffect(() => {
    getData('session/me').then((res: any) => {
      if (res.status) setUser(res.data);
    });
  }, []);

  return (
    <userContext.Provider value={{
        user,
        setUser,
        logout: () => {
          return deleteData('session/sign_out').then((res: any) => {
            if (res.status) setUser(null);
          });
        }
      }}>
      {children}
    </userContext.Provider>
  );
}