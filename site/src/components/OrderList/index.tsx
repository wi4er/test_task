'use client';

import css from './index.module.css';
import React from 'react';
import { apiContext } from '@/context/ApiContext';
import { OrderEntity } from '@/model/order.entity';
import { Item } from '@/components/OrderList/Item';
import { ProductEntity } from '@/model/product.entity';

export function OrderList() {
  const {getData} = React.useContext(apiContext);
  const [orders, setOrders] = React.useState<Array<OrderEntity>>([]);
  const [items, setItems] = React.useState<{[key: string]: ProductEntity}>({});

  React.useEffect(() => {
    getData<OrderEntity>('orders').then(res => {
      if (res.status) setOrders(res.data);
    }).then(() => getData<ProductEntity>('items').then(res => {
      if (res.status) {
        const data: {[key: string]: ProductEntity} = {};

        for (const it of res.data) {
          data[String(it.id)] = it;
        }

        setItems(data);
      }
    }));
  }, []);

  console.log(items);
  return (
    <div className={css.root}>
      {orders.map(item => (
        <Item
          item={item}
          product={items[String(item.id)]}
          key={item.id}
        />
      ))}
    </div>
  );
}