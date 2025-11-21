'use client';

import css from './ApiContext.module.css';
import React, { ReactNode } from 'react';

export const apiContext = React.createContext<any>({});


const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/api';

export function ApiContext(
  {
    children,
  }: {
    children: ReactNode;
  },
) {
  return (
    <apiContext.Provider value={{
      getData: (url: string) => {
        return fetch(`${host}/${url}`, {
          credentials: 'include',
        }).then(res => res.json());
      },
      postData: (url: string, data: Object) => {
        return fetch(`${host}/${url}`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then(res => res.json());
      },
      putData: (url: string, data: Object) => {
        return fetch(`${host}/${url}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then(res => res.json());
      },
    }}>
      {children}
    </apiContext.Provider>
  );
}