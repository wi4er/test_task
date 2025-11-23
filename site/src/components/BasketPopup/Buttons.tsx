import React from 'react';
import css from './Buttons.module.css';
import font from '../../fonts/text-styles.module.css';
import cn from 'classnames';
import Link from 'next/link';
import { basketContext } from '@/context/BasketProvider';
import { useRouter } from 'next/navigation';

export function Buttons(
  {
    className,
    onClose,
  }: {
    className: string;
    onClose: () => void;
  }
) {
  const {checkoutOrder} = React.useContext(basketContext);
  const router = useRouter();

  return (
    <div className={cn(css.root, className, font.poppins_regular)}>
      <button
        className={css.item}
        onClick={() => {
          checkoutOrder().then(() => {
            router.push('/orders/')
            onClose();
          })
        }}
      >
        Checkout
      </button>

      <Link
        className={css.item}
        href={'/orders'}
        onClick={onClose}
      >
        Orders
      </Link>

      {/*<button className={css.item}>*/}
      {/*  Comparison*/}
      {/*</button>*/}
    </div>
  );
}