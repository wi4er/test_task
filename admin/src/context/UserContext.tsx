import css from './UserContext.module.css';
import React from 'react';
import { AuthForm } from '../components/AuthForm';
import { apiContext } from './ApiContext';
import { UserEntity } from '../model/User.entity';

export const userContext = React.createContext<{
  user: UserEntity,
} | any>({});

export function UserContext(
  {
    children,
  }: {
    children: React.ReactNode;
  },
) {
  const {fetchData, postData, deleteData} = React.useContext(apiContext);
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchData('session/me').then((res: any) => {
      if (res.status) setUser(res.data)
      else setUser(null);
    });
  }, []);

  return (
    <userContext.Provider value={{
      user,
      error,
      fetchUser: (email: string, password: string) => {
        postData('session/sign_in', {email, password}).then((res: any) => {
          if (res.status) setUser(res.data)
          else setError(res.error);
        });
      },
      logout: () => {
        deleteData('session/sign_out').then((res: any) => {
          if (res.status) setUser(null)
          else setError(res.error);
        });
      },
    }}>
      {user ? children : <AuthForm />}
    </userContext.Provider>
  );
}