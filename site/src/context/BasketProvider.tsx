'use client';

import React, { ReactNode } from 'react';
import { apiContext } from '@/context/ApiContext';


export interface BasketItem {
  product: number;
  quantity: number;
}

export interface BasketData {
  items: Array<BasketItem>;
  dispatch: (action: any) => void;
  checkoutOrder: () => Promise<void>;
}

type BasketAction = {
  type: 'INIT';
  data: Array<BasketItem>;
} | {
  type: 'CLEAR';
} | {
  type: 'ADD',
  product: number;
} | {
  type: 'SET',
  product: number;
  quantity: number
} | {
  type: 'REMOVE',
  product: number;
};

const reducer: { [key: string]: (state: Array<BasketItem>, action: BasketAction) => void } = {
  'INIT': (state, action) => {
    if (action.type !== 'INIT') return;

    state.push(...action.data);
  },
  'CLEAR': state => {
    state.length = 0;
  },
  'ADD': (state, action) => {
    if (action.type !== 'ADD') return;

    for (const key in state) {
      if (state[key].product === action.product) {
        state[key] = {
          product: state[key].product,
          quantity: state[key].quantity + 1,
        };

        return;
      }
    }

    state.push({product: action.product, quantity: 1});
  },
  'SET': (state, action) => {
    if (action.type !== 'SET') return;

    console.log(action);
    for (const key in state) {
      if (state[key].product === action.product) {
        if (action.quantity <= 0) {
          state.splice(+key, 1);
        } else {
          state[key] = {
            product: action.product,
            quantity: action.quantity,
          };
        }

        return;
      }
    }
  },
  'REMOVE': (state, action) => {
    if (action.type !== 'REMOVE') return;

    for (const key in state) {
      if (state[key].product === action.product) state.splice(+key, 1);
    }
  },
};

export const basketContext = React.createContext<BasketData>({} as BasketData);

export function BasketProvider(
  {
    children,
  }: {
    children: ReactNode;
  },
) {
  const {postData} = React.useContext(apiContext);

  const [items, dispatch] = React.useReducer((state: Array<BasketItem>, action: any): Array<BasketItem> => {
    let updated = [...state];

    reducer[action.type](updated, action);

    localStorage.setItem('basket', JSON.stringify(updated));
    return updated;
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
          items: items.map(it => ({item: it.product, quantity: it.quantity})),
        }).then(res => dispatch({type: 'CLEAR'}));
      },
    }}>
      {children}
    </basketContext.Provider>
  );
}