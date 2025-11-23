'use client';

import React, { ReactNode } from 'react';
import { apiContext } from '@/context/ApiContext';

export interface BasketData {

  items: Array<{ id: number, count: number }>;
  dispatch: (action: any) => void;
  checkoutOrder: () => Promise<void>;

}

export const basketContext = React.createContext<BasketData>({} as BasketData);

export function BasketProvider(
  {
    children,
  }: {
    children: ReactNode;
  },
) {
  const {postData} = React.useContext(apiContext);

  const [items, dispatch] = React.useReducer((state: Array<any>, action) => {
    switch (action.type) {
      case 'INIT':
        return action.data;

      case 'CLEAR':
        localStorage.setItem('basket', JSON.stringify([]));
        return [];

      case 'ADD':
        for (const key in state) {
          if (state[key].id === action.product) {
            const updated = [...state];
            updated[key] = {
              id: state[key].id,
              count: state[key].count + 1,
            };

            localStorage.setItem('basket', JSON.stringify(updated));
            return updated;
          }
        }

        localStorage.setItem('basket', JSON.stringify([...state, {id: action.product, count: 1}]));
        return [...state, {id: action.product, count: 1}];

      case 'REMOVE':
        for (const key in state) {
          if (state[key].id === action.id) {
            const updated = [...state];
            updated.splice(+key, 1);

            localStorage.setItem('basket', JSON.stringify(updated));
            return updated;
          }
        }
        break;
    }
  }, []);

  React.useEffect(() => {
    const basket = JSON.parse(localStorage.getItem('basket') ?? '[]');

    dispatch({type: 'INIT', data: basket});
  }, []);

  return (
    <basketContext.Provider value={{
      items,
      dispatch,
      checkoutOrder: () => {
        return postData('orders', {
          items: items.map(it => ({item: it.id, quantity: it.count})),
        }).then(res => dispatch({type: 'CLEAR'}));
      },
    }}>
      {children}
    </basketContext.Provider>
  );
}