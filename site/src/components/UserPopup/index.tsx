import React, { FormEvent } from 'react';
import css from './index.module.css';
import cn from 'classnames';
import font from '@/fonts/text-styles.module.css';
import { BigInput } from '@/widget/BigInput';
import { apiContext } from '@/context/ApiContext';
import { userContext } from '@/context/UserProvider';
import { UserEntity } from '@/model/user.entity';
import { popupContext } from '@/context/PopupProvider';

export type UserFormType = 'authorization' | 'registration';

export function UserPopup(
  {
  }: {
  },
) {
  const {postData} = React.useContext(apiContext) || {};
  const {setUser} = React.useContext(userContext);
  const {closePopup} = React.useContext(popupContext);
  const [type, setType] = React.useState<UserFormType>('authorization');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [error, setError] = React.useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (type === 'authorization') {
      postData<UserEntity>?.('session/sign_in', {email, password}).then(res => {
        if (res.status) {
          setUser(res.data);
          closePopup();
        } else {
          setError(res.error);
        }
      });
    } else {
      if (password !== confirm) {
        return setError('Confirm is incorrect!')
      }

      postData<UserEntity>?.('session/sign_up', {email, password}).then(res => {
        if (res.status) {
          setUser(res.data);
          closePopup();
        } else {
          setError(res.error?.email ?? res.error?.password ?? res.error);
        }
      });
    }
  }

  return (
    <form
      className={css.root}
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
            type={'password'}
            name={'confirm'}
            value={confirm}
            onChange={event => setConfirm(event.target.value)}
          />
        )}
      </div>

      <div className={cn(css.error, font.poppins_semi_bold)}>
        {error}
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
  );
}