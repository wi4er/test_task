'use client';

import React from 'react';
import css from './Icons.module.css';
import font from '../../fonts/text-styles.module.css';
import AccountSvg from './svg/account.svg';
import LoginSvg from './svg/login.svg';
import BasketSvg from './svg/basket.svg';
import HeartSvg from './svg/heart.svg';
import SearchSvg from './svg/search.svg';
import { BasketPopup } from '@/components/BasketPopup';
import { UserPopup } from '@/components/UserPopup';
import { basketContext } from '@/context/BasketProvider';
import cn from 'classnames';
import { userContext } from '@/context/UserProvider';
import Link from 'next/link';

export function Icons() {
  const {user} = React.useContext(userContext);
  const [basket, setBasket] = React.useState(false);
  const [editUser, setEditUser] = React.useState(false);
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
          onClick={() => setEditUser(true)}
        >
          <AccountSvg/>
        </button>
      )}

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

        {items.length > 0 ? <div className={cn(css.count, font.poppins_bold)}>
          {items.length}
        </div> : null}
      </button>

      {basket && <BasketPopup onClose={() => setBasket(false)}/>}
      <UserPopup
        open={editUser}
        onClose={() => setEditUser(false)}
      />
    </div>
  );
}