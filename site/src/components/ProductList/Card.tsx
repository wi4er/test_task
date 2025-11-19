import React from 'react';
import css from './Card.module.css';
import { ProductEntity } from '@/model/product.entity';
import imagePng from './mock/image.png';
import cn from 'classnames';
import font from '../../fonts/text-styles.module.css';

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
        <img src={imagePng.src}/>
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

      <div className={cn(css.substrate, {
        [css.show]: hover,
      })}/>

      <div className={cn(css.popup, {
        [css.show]: hover,
      })}>
        <button className={cn(css.buy, font.poppins_semi_bold)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}