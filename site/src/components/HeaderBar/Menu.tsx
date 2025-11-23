'use client';

import React from 'react';
import css from './Menu.module.css';
import font from '../../fonts/text-styles.module.css';
import cn from 'classnames';
import Link from 'next/link';
import { userContext } from '@/context/UserProvider';


export function Menu() {
  const {user} = React.useContext(userContext);

  return (
    <div className={css.root}>
      <Link
        className={cn(css.item, font.poppins_medium)}
        href={'/'}
      >
        Home
      </Link>

      {user ? <Link
        href={'/orders'}
        className={cn(css.item, font.poppins_medium)}
      >
        Orders
      </Link> : null}

      {user ? <Link
        href={'/personal'}
        className={cn(css.item, font.poppins_medium)}
      >
        Personal
      </Link> : null}
    </div>
  );
}