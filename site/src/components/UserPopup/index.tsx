import React, { FormEvent } from 'react';
import css from './index.module.css';
import cn from 'classnames';
import font from '@/fonts/text-styles.module.css';
import { userContext } from '@/context/UserProvider';
import { BigInput } from '@/widget/BigInput';

export type UserFormType = 'authorization' | 'registration';

function authUser(email: string, password: string) {
  return fetch('/api/session/sign_in', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email, password,
    }),
  }).then(res => res.json());
}

function registerUser(email: string, password: string) {
  return fetch('/api/session/register', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({email, password}),
  }).then(res => res.json());
}

export function UserPopup(
  {
    onClose,
  }: {
    onClose: () => void;
  },
) {
  const {user, setUser} = React.useContext(userContext);
  const [type, setType] = React.useState<UserFormType>('authorization');
  const [email, setEmail] = React.useState('333@ukr.net');
  const [password, setPassword] = React.useState('qwerty');
  const [confirm, setConfirm] = React.useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (type === 'authorization') {
      authUser(email, password).then(res => {
        if (res.status) {
          setUser(res.data);
          onClose();
        }
      });
    } else {
      registerUser(email, password).then(res => {
        if (res.status) {
          setUser(res.data);
          onClose();
        }
      });
    }
  }

  return (
    <div className={css.root}>
      <div
        className={css.substrate}
        onClick={onClose}
      />

      <form
        className={css.popup}
        onSubmit={handleSubmit}
      >
        <div className={cn(css.title, font.poppins_semi_bold)}>
          {type === 'authorization' ? 'Authorization' : 'Registration'}
        </div>

        <div className={css.line}/>

        <div className={css.form}>
          <BigInput
            label={'Email'}
            type={'email'}
            name={'email'}
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <BigInput
            label={'Password'}
            type={'password'}
            name={'password'}
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          {type === 'registration' && (
            <BigInput
              label={'Confirm password'}
              type={'confirm'}
              name={'confirm'}
              value={confirm}
              onChange={event => setConfirm(event.target.value)}
            />
          )}
        </div>

        <div className={css.full_line}/>

        <div className={css.buttons}>
          <button className={css.item}>
            Send
          </button>

          {type === 'authorization' && (
            <button
              className={css.item}
              onClick={() => setType('registration')}
            >
              To registration
            </button>
          )}

          {type === 'registration' && (
            <button
              className={css.item}
              onClick={() => setType('authorization')}
            >
              To authorization
            </button>
          )}
        </div>
      </form>
    </div>
  );
}