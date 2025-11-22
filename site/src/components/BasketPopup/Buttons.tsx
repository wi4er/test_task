import css from './Buttons.module.css';
import font from '../../fonts/text-styles.module.css';
import cn from 'classnames';
import Link from 'next/link';

export function Buttons(
  {
    className,
    onClose,
  }: {
    className: string;
    onClose: () => void;
  }
) {
  return (
    <div className={cn(css.root, className, font.poppins_regular)}>
      <Link
        className={css.item}
        href={'/basket'}
        onClick={onClose}
      >
        Cart
      </Link>

      <Link
        className={css.item}
        href={'/checkout'}
        onClick={onClose}
      >
        Checkout
      </Link>

      <button className={css.item}>
        Comparison
      </button>
    </div>
  );
}