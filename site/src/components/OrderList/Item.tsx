import css from './Item.module.css';
import font from '../../fonts/text-styles.module.css';
import { OrderEntity } from '@/model/order.entity';
import { ProductEntity } from '@/model/product.entity';
import { SmallCard } from '@/widget/SmallCard';
import cn from 'classnames';

export function Item(
  {
    item,
  }: {
    item: OrderEntity;
  }
) {

  console.log(item);
  return (
    <div className={css.root}>
      <div className={cn(css.created, font.poppins_semi_bold)}>
        created At

        <div className={css.date}>
          {new Date(item.created_at).toLocaleString("en-EN", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </div>

        <div className={css.amount}>
          Amount: ${item.amount}
        </div>
      </div>

      <div className={css.list}>
        {item.order_description.map(it => (
          <SmallCard
            key={it.id}
            product={it.item}
            quantity={it.quantity}
          />
        ))}
      </div>
    </div>
  );
}