'use client';

import React from 'react';
import css from './Icons.module.css';
import font from '../../fonts/text-styles.module.css';
import AccountSvg from './svg/account.svg';
import LoginSvg from './svg/login.svg';
import BasketSvg from './svg/basket.svg';
import HeartSvg from './svg/heart.svg';
import { BasketPopup } from '@/components/BasketPopup';
import { UserPopup } from '@/components/UserPopup';
import { basketContext } from '@/context/BasketProvider';
import cn from 'classnames';
import { userContext } from '@/context/UserProvider';
import Link from 'next/link';
import { popupContext } from '@/context/PopupProvider';

export function Icons() {
  const {user} = React.useContext(userContext);
  const {openPopup} = React.useContext(popupContext);
  const {items} = React.useContext(basketContext);

  return (
    <div className={css.root}>
      {user ? (
        <Link
          className={css.item}
          href={'/personal'}
          title={user.email}
        >
          <LoginSvg/>
        </Link>
      ) : (
        <button
          className={css.item}
          onClick={() => openPopup({element: <UserPopup/>})}
        >
          <AccountSvg/>
        </button>
      )}

      <button className={css.item}>
        <HeartSvg/>
      </button>

      <button
        className={css.item}
        onClick={() => {
          if (user) openPopup({element: <BasketPopup/>});
          else openPopup({element: <UserPopup/>});
        }}
      >
        <BasketSvg/>

        {items.length > 0 ? <div className={cn(css.count, font.poppins_bold)}>
          {items.length}
        </div> : null}
      </button>
    </div>
  );
}