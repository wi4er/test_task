import React, { ReactNode } from 'react';

export const basketContext = React.createContext<any>({
  value: 123
});

export function BasketProvider(
  {
    children,
  }: {
    children: ReactNode;
  },
) {
  return (
    <basketContext.Provider value={{
      value: 333
    }}>
      {children}
    </basketContext.Provider>
  );
}