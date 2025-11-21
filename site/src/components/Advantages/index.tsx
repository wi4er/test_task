import css from './index.module.css';
import { ReactNode } from 'react';
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
      icon: ReactNode
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