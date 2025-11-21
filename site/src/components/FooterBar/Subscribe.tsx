import css from './Subscribe.module.css';
import cn from 'classnames';
import font from '../../fonts/text-styles.module.css';

export function Subscribe(
  {
    className,
  }: {
    className: string
  }
) {
  return (
    <form
      className={cn(css.root, className)}
    >
      <input
        placeholder='Enter Your Email Address'
        className={cn(css.input, font.poppins_regular)}
      />

      <button className={cn(css.button, font.poppins_medium)}>
        SUBSCRIBE
      </button>
    </form>
  );
}