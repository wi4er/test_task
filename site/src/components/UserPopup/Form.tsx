import css from './Form.module.css';
import cn from 'classnames';
import font from '../../fonts/text-styles.module.css';
import { UserFormType } from '@/components/UserPopup/index';

export function Form(
  {
    className,
    type,
  }: {
    className: string;
    type: UserFormType;
  },
) {
  return (
    <div className={cn(css.root, className)}>
      <div className={css.field}>
        <label className={cn(css.label, font.poppins_medium)}>
          Email
        </label>

        <input
          className={cn(css.input, font.poppins_regular)}
          placeholder={'Your email here'}
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
              />
          </div>
      )}
    </div>
  );
}