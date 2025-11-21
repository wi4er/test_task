import React from 'react';
import css from './Item.module.css';
import font from '../../fonts/text-styles.module.css';
import cn from 'classnames';

export function Item(
  {
    item: {
      title,
      caption,
      icon: Icon,
    },
  }: {
    item: {
      id: number;
      title: string;
      caption: string;
      icon: React.ElementType
    }
  },
) {
  return (
    <div className={css.root}>
      <Icon className={css.icon}/>

      <div className={cn(css.title, font.poppins_semi_bold)}>
        {title}
      </div>

      <div className={cn(css.caption, font.poppins_medium)}>
        {caption}
      </div>
    </div>
  );
}