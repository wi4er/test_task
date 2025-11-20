import css from './index.module.css';
import cn from 'classnames';
import font from '@/fonts/text-styles.module.css';
import DeleteSvg from '@/components/BasketPopup/svg/delete.svg';
import { BasketEntity } from '@/model/basket.entity';

export function SmallCard(
  {
    item,
    onDelete
  }: {
    item: BasketEntity;
    onDelete?: (id: number) => void;
  },
) {
  return (
    <div className={css.root}>
      <picture>
        <img
          src={item.image}
          alt={item.name}
          className={css.image}
        />
      </picture>

      <div className={cn(css.title, font.poppins_regular)}>
        {item.name}
      </div>

      <div className={cn(css.price, font.poppins_medium)}>
        {item.price}
      </div>

      {onDelete ? <DeleteSvg className={css.delete}/> : null}
    </div>
  );
}