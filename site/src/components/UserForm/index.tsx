"use client";

import React from 'react';
import css from './index.module.css';
import font from '../../fonts/text-styles.module.css';
import { apiContext } from '@/context/ApiContext';
import { userContext } from '@/context/UserProvider';
import cn from 'classnames';
import { BigInput } from '@/widget/BigInput';
import { BigButton } from '@/widget/BigButton';

export function UserForm() {
  const {postData, putData} = React.useContext(apiContext);
  const {user} = React.useContext(userContext);

  const [firstName, setFirstName] = React.useState(user?.first_name || '')
  const [lastName, setLastName] = React.useState(user?.last_name || '')
  const [password, setPassword] = React.useState('')
  const [confirm, setConfirm] = React.useState('')

  return (
    <div className={css.root}>
      <h1 className={cn(css.title, font.poppins_semi_bold)}>
        User data <span className={css.name}>{user.email}</span>
      </h1>

      <form
       className={css.list}
       onSubmit={event => {
         event.preventDefault();

         putData('session/me', {
           first_name: firstName,
           last_name: lastName,
           password: password || null
         }).then((res: any) => {
           console.log(res);
         })

       }}
      >
        <BigInput
          label={'First Name'}
          name={'first_name'}
          value={firstName}
          onChange={event => setFirstName(event.target.value)}
        />

        <BigInput
          label={'Last Name'}
          name={'last_name'}
          value={lastName}
          onChange={event => setLastName(event.target.value)}
        />

        <BigInput
          label={'Password'}
          name={'password'}
          type={'password'}
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <BigInput
          label={'Confirm Password'}
          name={'confirm'}
          type={'password'}
          value={confirm}
          onChange={event => setConfirm(event.target.value)}
        />

        <BigButton>
          Submit
        </BigButton>
      </form>
    </div>
  );
}