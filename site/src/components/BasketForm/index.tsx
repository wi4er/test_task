import css from './index.module.css';
import font from '../../fonts/text-styles.module.css';
import cn from 'classnames';
import image from './mock/image.png';

const list = [{
  id: 1,
  image: image.src,
  name: 'Asgaard sofa',
  price: 'Rs. 250,000.00',
  quantity: 1,
}, {
  id: 2,
  image: image.src,
  name: 'Asgaard sofa',
  price: 'Rs. 250,000.00',
  quantity: 1,
}, {
  id: 3,
  image: image.src,
  name: 'Asgaard sofa',
  price: 'Rs. 250,000.00',
  quantity: 1,
}];

export function BasketForm() {
  return (
    <div className={css.root}>
      <div className={css.head}>
        <div className={cn(css.product_title, font.poppins_medium)}>
          Product
        </div>

        <div className={cn(css.price_title, font.poppins_medium)}>
          Price
        </div>

        <div className={cn(css.quantity_title, font.poppins_medium)}>
          Quantity
        </div>

        <div className={cn(css.subtotal_title, font.poppins_medium)}>
          Subtotal
        </div>
      </div>

      <div className={css.table}>
        {list.map(item => (
          <>
            <picture className={css.picture}>
              <img src={item.image}/>
            </picture>
          </>
        ))}
      </div>

      <div className={css.total}>
        <div className={cn(css.title, font.poppins_semi_bold)}>
          Subtotal
        </div>
      </div>
    </div>
  );
}