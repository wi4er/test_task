import css from './index.module.css';
import cn from 'classnames';
import font from '@/fonts/text-styles.module.css';
import React, { ChangeEvent } from 'react';

export function BigInput(
  {
    label,
    placeholder,
    type = 'string',
    name,
    value,
    onChange,
  }: {
    label: string;
    placeholder?: string;
    type?: string;
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  }
) {
  return (
    <div className={css.field}>
      <label className={cn(css.label, font.poppins_medium)}>
        {label}
      </label>

      <input
        className={cn(css.input, font.poppins_regular)}
        placeholder={placeholder || label}
        name={name}
        type={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}