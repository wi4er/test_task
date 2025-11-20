'use client';

import React, { ReactNode } from 'react';

export const basketContext = React.createContext<any>({value: 'default'});

export function BasketProvider(
  {
    children,
  }: {
    children: ReactNode;
  },
) {
  const [items, dispatch] = React.useReducer((state: Array<any>, action) => {
    switch (action.type) {
      case 'INIT':
        localStorage.setItem('basket', JSON.stringify(action.data));
        return action.data;

      case 'ADD':
        localStorage.setItem('basket', JSON.stringify([...state, {id: action.product, count: 1}]));
        return [...state, {id: action.product, count: 1}];
    }
  }, []);

  React.useEffect(() => {
    const basket = JSON.parse(localStorage.getItem('basket') ?? '[]')

    dispatch({type: 'INIT', data: basket});

    return () => {
      localStorage.setItem('basket', JSON.stringify(items));
    };
  }, []);

  return (
    <basketContext.Provider value={{
      items,
      dispatch,
    }}>
      {children}
    </basketContext.Provider>
  );
}