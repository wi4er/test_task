import css from './UserContext.module.css';
import React from 'react';
import { AuthForm } from '../components/AuthForm';
import { apiContext } from './ApiContext';
import { UserEntity } from '../model/User.entity';


export interface UserData {
  user: UserEntity | null | undefined,
  error: any,
  fetchUser: (email: string, password: string) => Promise<{
    status: true;
    data: UserEntity;
  } | {
    status: false;
    error: any;
  }>

  logout: () => Promise<{
    status: true;
  } | {
    status: false;
  }>
}

export const userContext = React.createContext<UserData>({} as UserData);

export function UserContext(
  {
    children,
  }: {
    children: React.ReactNode;
  },
) {
  const {fetchData, postData, deleteData} = React.useContext(apiContext);
  const [user, setUser] = React.useState<UserEntity | null | undefined>(undefined);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchData('session/me').then((res: any) => {
      if (res.status) {
        if (res.data.role === 'admin') {
          setUser(res.data);
        } else {
          globalThis.location.href = '/';
        }
      } else setUser(null);
    });
  }, []);

  return (
    <userContext.Provider value={{
      user,
      error,
      fetchUser: (email: string, password: string) => {
        return postData('session/sign_in', {email, password}).then((res: any) => {
          if (res.status) setUser(res.data);
          else setError(res.error);
        });
      },
      logout: () => {
        return deleteData('session/sign_out').then((res: any) => {
          if (res.status) setUser(null);
          else setError(res.error);
        });
      },
    }}>
      {user === null ? <AuthForm/> : null}
      {user ? children : null}
    </userContext.Provider>
  );
}