import css from './index.module.css';
import { ReactNode } from 'react';

export function BigButton(
  {
    children,
  }: {
    children: ReactNode;
  },
) {
  return (
    <button
      className={css.root}
    >
      {children}
    </button>
  );
}