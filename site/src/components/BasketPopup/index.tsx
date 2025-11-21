import css from './index.module.css';
import font from '../../fonts/text-styles.module.css';
import cn from 'classnames';
import { Buttons } from '@/components/BasketPopup/Buttons';
import { Item } from '@/components/BasketPopup/Item';
import { BasketEntity } from '@/model/basket.entity';
import { basketList } from '@/components/BasketPopup/mock/basket-list';

export function BasketPopup(
  {
    onClose,
    list = basketList,
  }: {
    onClose: () => void;
    list?: Array<BasketEntity>,
  },
) {
  return (
    <div className={css.root}>
      <div
        className={css.substrate}
        onClick={onClose}
      />

      <div className={css.basket}>
        <div className={cn(css.title, font.poppins_semi_bold)}>
          Shopping Cart
        </div>

        <div className={css.line}/>

        <div className={css.list}>
          {list.map(item => <Item key={item.id} item={item}/>)}
        </div>

        <div className={css.total}>
          <div className={cn(css.label, font.poppins_regular)}>
            Subtotal
          </div>

          <div className={cn(css.price, font.poppins_semi_bold)}>
            Rs. 520,000.00
          </div>
        </div>

        <div className={css.full_line}/>

        <Buttons
          className={css.buttons}
          onClose={onClose}
        />
      </div>
    </div>
  );
}