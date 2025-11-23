'use client';

import React, { ReactNode } from 'react';

interface ApiType {
  getData: <T>(url: string) => Promise<
    { status: true; data: Array<T>; }
    | { status: false, error: any }
  >;
  postData: <T>(url: string, data: Object) => Promise<
    { status: true; data: T; }
    | { status: false, error: any }
  >;
  putData: <T>(url: string, data: Object) => Promise<
    { status: true; data: T; }
    | { status: false, error: any }
  >;
  deleteData: (url: string) => Promise<
    { status: true;  }
    | { status: false, error: any }
  >;
}

export const apiContext = React.createContext<ApiType>({} as ApiType);

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
      getData<T>(url: string) {
        return fetch(`${host}/${url}`, {
          credentials: 'include',
        }).then(res => res.json());
      },
      postData<T>(url: string, data: Object) {
        return fetch(`${host}/${url}`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then<T>(res => res.json());
      },
      putData<T>(url: string, data: Object) {
        return fetch(`${host}/${url}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then<T>(res => res.json());
      },
      deleteData(url: string) {
        return fetch(`${host}/${url}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          },
        }).then(res => res.json());
      },
    }}>
      {children}
    </apiContext.Provider>
  );
}