import css from './index.module.css';
import font from '../../fonts/text-styles.module.css';
import { ReactNode } from 'react';
import cn from 'classnames';

export function BigButton(
  {
    children,
    onClick,
    type,
  }: {
    children: ReactNode;
    onClick: () => void;
    type: string;
  },
) {
  return (
    <button
      className={cn(css.root, font.poppins_regular)}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}