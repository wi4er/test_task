import css from './Menu.module.css';
import font from '../../fonts/text-styles.module.css';
import cn from 'classnames';


export function Menu() {

  return (
    <div className={css.root}>
      <div className={cn(css.item, font.poppins_medium)}>
        Home
      </div>

      <div className={cn(css.item, font.poppins_medium)}>
        Shop
      </div>

      <div className={cn(css.item, font.poppins_medium)}>
        About
      </div>

      <div className={cn(css.item, font.poppins_medium)}>
        Contact
      </div>
    </div>
  );
}