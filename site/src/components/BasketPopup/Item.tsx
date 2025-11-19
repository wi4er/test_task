import css from './Item.module.css';
import { BasketEntity } from '@/model/basket.entity';
import DeleteSvg from './svg/delete.svg';
import cn from 'classnames';
import font from '../../fonts/text-styles.module.css';

export function Item(
  {
    item,
  }: {
    item: BasketEntity;
  },
) {
  return (
    <div className={css.root}>
      <picture>
        <img
          src={item.image}
          className={css.image}
        />
      </picture>

      <div className={cn(css.title, font.poppins_regular)}>
        {item.name}
      </div>

      <div className={cn(css.price, font.poppins_medium)}>
        {item.price}
      </div>

      <DeleteSvg className={css.delete}/>
    </div>
  );
}