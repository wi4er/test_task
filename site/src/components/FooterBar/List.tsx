import css from './List.module.css';
import cn from 'classnames';
import font from '../../fonts/text-styles.module.css';
import Link from 'next/link';

export function List(
  {
    list,
    className,
  }: {
    list: Array<{
      id: number,
      link: string;
      name: string
    }>,
    className: string;
  }
) {
  return (
    <div className={cn(css.root, className)}>
      {list.map(item => (
        <Link
          className={cn(css.item, font.poppins_medium)}
          href={item.link}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}