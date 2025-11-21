import React from 'react';
import css from './index.module.css';
import font from '../../fonts/text-styles.module.css';
import imagePng from './image/bread.png';
import cn from 'classnames';
import ArrowSvg from './svg/arrow.svg';
import Link from 'next/link';

export function Breadcrumbs(
  {
    list,
  }: {
    list: Array<{
      name: string;
      link: string;
    }>;
  }
) {
  return (
    <div
      className={css.root}
      style={{backgroundImage: `url(${imagePng.src})`}}
    >
      <div className={cn(css.title, font.poppins_medium)}>
        {list[list.length - 1].name}
      </div>

      <div className={css.list}>
        {list.map((item, index) => (
          <React.Fragment key={item.name}>
            <Link href={item.link} className={cn(css.item, font.poppins_medium)}>
              {item.name}
            </Link>

            {index !== list.length - 1 ? <ArrowSvg /> : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}