import React from 'react';
import css from './Item.module.css';
import DeleteSvg from './svg/delete.svg';
import cn from 'classnames';
import font from '../../fonts/text-styles.module.css';
import { BasketItem } from '@/components/BasketPopup/index';
import { basketContext } from '@/context/BasketProvider';

export function Item(
  {
    item,
  }: {
    item: BasketItem;
  },
) {
  const {dispatch} = React.useContext(basketContext);

  return (
    <div className={css.root}>
      <picture className={css.image}>
        <img src={item.product.image} />
      </picture>

      <div className={cn(css.title, font.poppins_regular)}>
        {item.product.name}
      </div>

      <div className={cn(css.buy, font.poppins_medium)}>
        <span className={cn(css.count, font.poppins_light)}>{item.count}</span>
        <span className={cn(css.cross, font.poppins_light)}>X</span>
        <span className={cn(css.price, font.poppins_medium)}>{item.product.price}</span>
      </div>

      <DeleteSvg
        className={css.delete}
        onClick={() => dispatch({type: 'REMOVE', id: item.id})}
      />
    </div>
  );
}