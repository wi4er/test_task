"use client";

import css from './index.module.css';
import { ProductEntity } from '@/model/product.entity';
import { Card } from '@/components/ProductList/Card';

export function ProductList(
  {
    list,
  }: {
    list: Array<ProductEntity>;
  },
) {
  return (
    <div className={css.root}>
      {list.map(item => (
        <Card
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
}