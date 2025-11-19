import React, { FormEvent } from 'react';
import css from './index.module.css';
import cn from 'classnames';
import font from '@/fonts/text-styles.module.css';


export type UserFormType = 'authorization' | 'registration';


function authUser(email: string, password: string) {
  return fetch('/api/session/sign_in', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email, password,
    }),
  }).then(res => res.json());
}

export function UserPopup(
  {
    onClose,
  }: {
    onClose: () => void;
  },
) {
  const [type, setType] = React.useState<UserFormType>('authorization');
  const [email, setEmail] = React.useState('333@ukr.net');
  const [password, setPassword] = React.useState('qwerty');
  const [confirm, setConfirm] = React.useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (type === 'authorization') {
      authUser(email, password)
        .then(res => {
          console.log(res);
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
          <div className={css.field}>
            <label className={cn(css.label, font.poppins_medium)}>
              Email
            </label>

            <input
              className={cn(css.input, font.poppins_regular)}
              placeholder={'Your email here'}
              name={'email'}
              type={'email'}
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </div>

          <div className={css.field}>
            <label className={cn(css.label, font.poppins_medium)}>
              password
            </label>

            <input
              className={cn(css.input, font.poppins_regular)}
              placeholder={'Your password here'}
              name={'password'}
              type={'password'}
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>

          {type === 'registration' && (
            <div className={css.field}>
              <label className={cn(css.label, font.poppins_medium)}>
                confirm password
              </label>

              <input
                className={cn(css.input, font.poppins_regular)}
                placeholder={'Your password here'}
                name={'confirm'}
                type={'password'}
                value={confirm}
                onChange={event => setConfirm(event.target.value)}
              />
            </div>
          )}
        </div>

        <div className={css.full_line}/>

        <div className={css.buttons}>
          <button
            className={css.item}
          >
            Send
          </button>

          {type === 'authorization' && <button
              className={css.item}
              onClick={() => setType('registration')}
          >
              To registration
          </button>}

          {type === 'registration' && <button
              className={css.item}
              onClick={() => setType('authorization')}
          >
              To authorization
          </button>}
        </div>
      </form>
    </div>
  );
}