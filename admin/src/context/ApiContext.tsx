import css from './ApiContext.module.css';
import React, { ReactNode } from 'react';


export const apiContext = React.createContext<any>(null);

const apiPath = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/api';

export function ApiContext(
  {
    children,
  }: {
    children: ReactNode;
  },
) {

  console.log(process.env);

  return (
    <apiContext.Provider value={{
      fetchData: async (path: string) => {
        const res = await fetch(`${apiPath}/${path}`, {
          method: 'GET',
          credentials: 'include',
        });
        return await res.json();
      },
      postData: async (path: string, data: Object) => {
        const res = await fetch(`${apiPath}/${path}`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        return await res.json();
      },
      putData: async (path: string, data: Object) => {
        const res = await fetch(`${apiPath}/${path}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        return await res.json();
      },
      deleteData: async (path: string, data: Object) => {
        const res = await fetch(`${apiPath}/${path}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        return await res.json();
      },
      apiPath,
    }}>
      {children}
    </apiContext.Provider>
  );
}