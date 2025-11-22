import React from 'react';
import css from './Card.module.css';
import { ProductEntity } from '@/model/product.entity';
import cn from 'classnames';
import font from '../../fonts/text-styles.module.css';
import { Popup } from '@/components/ProductList/Popup';

export function Card(
  {
    item,
  }: {
    item: ProductEntity;
  },
) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      className={css.root}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <picture className={css.image}>
        <img src={item.image}/>
      </picture>

      <div className={cn(css.title, font.poppins_semi_bold)}>
        {item.name}
      </div>

      <div className={cn(css.description, font.poppins_medium)}>
        {item.description}
      </div>

      <div className={cn(css.price, font.poppins_semi_bold)}>
        {item.price}
      </div>

      <Popup
        hover={hover}
        id={item.id}
      />
    </div>
  );
}