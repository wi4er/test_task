'use client';

import React from 'react';
import css from './index.module.css';
import font from '../../fonts/text-styles.module.css';
import { apiContext } from '@/context/ApiContext';
import { OrderEntity } from '@/model/order.entity';
import { Item } from '@/components/OrderList/Item';
import cn from 'classnames';

export function OrderList() {
  const {getData} = React.useContext(apiContext);
  const [orders, setOrders] = React.useState<Array<OrderEntity>>([]);

  React.useEffect(() => {
    getData<OrderEntity>('orders/mine').then(res => {
      if (res.status) setOrders(res.data);
    });
  }, []);

  return (
    <div className={css.root}>
      <h1 className={cn(css.title, font.poppins_semi_bold)}>
        Order list
      </h1>

      {orders.map(item => (
        <Item
          item={item}
          key={item.id}
        />
      ))}
    </div>
  );
}