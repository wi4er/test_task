import React from 'react';
import css from './index.module.css';
import font from '../../fonts/text-styles.module.css';
import cn from 'classnames';
import { Buttons } from '@/components/BasketPopup/Buttons';
import { basketContext } from '@/context/BasketProvider';
import { apiContext } from '@/context/ApiContext';
import { ProductEntity } from '@/model/product.entity';
import CloseSvg from './svg/Close.svg';
import { popupContext } from '@/context/PopupProvider';
import { SmallCard } from '@/widget/SmallCard';
import { motion, AnimatePresence } from 'framer-motion';

export interface BasketItem {
  id: number;
  product: ProductEntity;
  count: number;
}

export function BasketPopup() {
  const {closePopup} = React.useContext(popupContext);
  const {items, dispatch} = React.useContext(basketContext);
  const {getData} = React.useContext(apiContext);
  const [basket, setBasket] = React.useState<Array<BasketItem>>([]);

  React.useEffect(() => {
    getData<ProductEntity>('items').then(res => {
      const result = [];

      if (res.status) {
        for (const basketItem of items) {
          for (const productItem of res.data) {
            if (basketItem.product === productItem.id) {
              result.push({
                id: basketItem.product,
                product: productItem,
                count: basketItem.quantity,
              });
            }
          }
        }

        setBasket(result);
      }
    });
  }, [items]);


  const total = basket.reduce((acc, it) => {
    return acc + it.count * it.product.price;
  }, 0);

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
          <AnimatePresence>
            {basket.map(item => (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1, height: 105}}
                exit={{
                  opacity: 0,
                  height: 0,
                  transition: {
                    opacity: {duration: .3},
                    height: {duration: .2, delay: .2},
                  }
                }}
                key={item.product.id}
              >
                <SmallCard
                  product={item.product}
                  quantity={item.count}
                  onEdit={event => dispatch({type: 'SET', product: item.id, quantity: +event.target.value})}
                  onDelete={() => dispatch({type: 'REMOVE', product: item.id})}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className={css.total}>
          <div className={cn(css.label, font.poppins_regular)}>
            Subtotal
          </div>

          <div className={cn(css.price, font.poppins_semi_bold)}>
            $ {total}
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