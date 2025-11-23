import css from './Item.module.css';
import { OrderEntity } from '@/model/order.entity';
import { ProductEntity } from '@/model/product.entity';

export function Item(
  {
    item,
    product,
  }: {
    item: OrderEntity;
    product: ProductEntity;
  }
) {
  return (
    <div className={css.root}>
      <div>
        {item.id} - {item.amount} - {product?.name}
      </div>

    </div>
  );
}