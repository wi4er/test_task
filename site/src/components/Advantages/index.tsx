import css from './index.module.css';
import { ElementType, ReactNode } from 'react';
import { advantageList } from './mock/advantage-list';
import { Item } from './Item';

export function Advantages(
  {
    list = advantageList,
  }: {
    list?: Array<{
      id: number;
      title: string;
      caption: string;
      icon: ElementType;
    }>
  },
) {
  return (
    <div className={css.root}>
      {list.map(item => (
        <Item
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
}