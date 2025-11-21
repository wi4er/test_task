import css from './index.module.css';
import font from '../../fonts/text-styles.module.css';
import cn from 'classnames';
import { List } from '@/components/FooterBar/List';
import { Subscribe } from '@/components/FooterBar/Subscribe';

export function FooterBar() {
  return (
    <div className={css.root}>
      <div className={cn(css.logo, font.poppins_bold)}>
        Funiro.
      </div>

      <div className={cn(css.address, font.poppins_regular)}>
        400 University Drive Suite 200 Coral Gables,<br />
        FL 33134 USA
      </div>

      <div className={cn(css.links, font.poppins_medium)}>
        Links
      </div>

      <List list={[
        {id: 1, link: "/", name: "Home"},
        {id: 2, link: "/", name: "Shop"},
        {id: 3, link: "/", name: "About"},
        {id: 4, link: "/", name: "Contact"},
      ]} className={css.link_list} />

      <div className={cn(css.help, font.poppins_medium)}>
        Help
      </div>

      <List list={[
        {id: 1, link: "/", name: "Payment Options"},
        {id: 2, link: "/", name: "Returns"},
        {id: 3, link: "/", name: "Privacy Policies"},
      ]} className={css.help_list} />

      <div className={cn(css.news, font.poppins_medium)}>
        Newsletter
      </div>

      <Subscribe className={css.news_form} />

      <div className={css.line} />

      <div className={cn(css.rights, font.poppins_regular)}>
        2023 furino. All rights reverved
      </div>
    </div>
  );
}