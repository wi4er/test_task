import css from './index.module.css';
import cn from 'classnames';
import font from '@/fonts/text-styles.module.css';
import DeleteSvg from '@/components/BasketPopup/svg/delete.svg';
import { ProductEntity } from '@/model/product.entity';
import React, { ChangeEvent } from 'react';

export function SmallCard(
  {
    quantity,
    product,
    onDelete,
    onEdit,
  }: {
    quantity: number
    product: ProductEntity;
    onDelete?: (id: number) => void;
    onEdit?: (event: ChangeEvent<HTMLInputElement>) => void;
  },
) {
  return (
    <div className={css.root}>
      <picture className={css.image}>
        <img
          src={product.image}
          alt={product.name}
        />
      </picture>

      <div className={cn(css.title, font.poppins_regular)}>
        {product.name}
      </div>

      <div className={cn(css.buy, font.poppins_medium)}>
        <input
          className={cn(css.count, font.poppins_light)}
          value={quantity}
          disabled={!onEdit}
          type='number'
          onChange={onEdit}
        />
        <span className={cn(css.cross, font.poppins_light)}>X</span>
        <span className={cn(css.price, font.poppins_medium)}>${product.price}</span>
      </div>

      {onDelete ? <DeleteSvg className={css.delete}/> : null}
    </div>
  );
}