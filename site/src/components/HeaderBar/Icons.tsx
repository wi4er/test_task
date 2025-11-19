'use client';

import React from 'react';
import css from './Icons.module.css';
import AccountSvg from './svg/account.svg';
import BasketSvg from './svg/basket.svg';
import HeartSvg from './svg/heart.svg';
import SearchSvg from './svg/search.svg';
import { BasketPopup } from '@/components/BasketPopup';
import { UserPopup } from '@/components/UserPopup';

export function Icons() {
  const [basket, setBasket] = React.useState(false);
  const [user, setUser] = React.useState(false);

  return (
    <div className={css.root}>
      <button
        className={css.item}
        onClick={() => setUser(true)}
      >
        <AccountSvg/>
      </button>

      <button className={css.item}>
        <HeartSvg/>
      </button>

      <button className={css.item}>
        <SearchSvg/>
      </button>

      <button
        className={css.item}
        onClick={() => setBasket(true)}
      >
        <BasketSvg/>
      </button>

      {basket && <BasketPopup onClose={() => setBasket(false)}/>}
      {user && <UserPopup onClose={() => setUser(false)}/>}
    </div>
  );
}