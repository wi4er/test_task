import css from './UserContext.module.css';
import React from 'react';
import { AuthForm } from '../components/AuthForm';
import { apiContext } from './ApiContext';

export const userContext = React.createContext<any>({});

export function UserContext(
  {
    children,
  }: {
    children: React.ReactNode;
  },
) {
  const {fetchData, postData, deleteData} = React.useContext(apiContext);
  const [user, setUser] = React.useReducer((state: any, action: any) => {

    return action.user;
  }, undefined);

  React.useEffect(() => {
    fetchData('session/me').then((res: any) => {
      if (res.status) setUser({user: res.data})
      else setUser({user: null});
    });
  }, []);

  return (
    <userContext.Provider value={{
      user,
      fetchUser: (email: string, password: string) => {
        postData('session/sign_in', {email, password}).then((res: any) => {
          if (res.status) setUser({user: res.user});
        });
      },
      logout: () => {
        deleteData('session/sign_out').then((res: any) => {
          console.log(res);

          if (res.status) {
            setUser({user: null});
          }
        });
      },
    }}>
      {user ? children : <AuthForm />}
    </userContext.Provider>
  );
}