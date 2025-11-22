import React from 'react';
import css from './index.module.css';
import font from '../../fonts/text-styles.module.css';
import cn from 'classnames';
import { Buttons } from '@/components/BasketPopup/Buttons';
import { Item } from '@/components/BasketPopup/Item';
import { basketContext } from '@/context/BasketProvider';
import { apiContext } from '@/context/ApiContext';
import { ProductEntity } from '@/model/product.entity';
import CloseSvg from './svg/Close.svg';
import { popupContext } from '@/context/PopupProvider';

export interface BasketItem {
  id: number;
  product: ProductEntity;
  count: number;
}

export function BasketPopup() {
  const {closePopup} = React.useContext(popupContext);
  const {items} = React.useContext(basketContext);
  const {getData} = React.useContext(apiContext);
  const [basket, setBasket] = React.useState<Array<BasketItem>>([]);

  React.useEffect(() => {
    getData<ProductEntity>('items').then(res => {
      const result = []

      if (res.status) {
        for (const basketItem of items) {
          for (const productItem of res.data) {
            if (basketItem.id === productItem.id) {
              result.push({
                id: basketItem.id,
                product: productItem,
                count: basketItem.count,
              })
            }
          }
        }

        setBasket(result);
      }
    })
  }, [items]);


  return (
    <div className={css.root}>
      <div className={css.basket}>
        <div className={cn(css.title, font.poppins_semi_bold)}>
          <div className={css.text}>
            Shopping Cart
          </div>

          <CloseSvg
            className={css.close}
            onClick={() => closePopup()}
          />
        </div>

        <div className={css.line}/>

        <div className={css.list}>
          {basket.map(item => <Item key={item.product.id} item={item}/>)}
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
          onClose={closePopup}
        />
      </div>
    </div>
  );
}