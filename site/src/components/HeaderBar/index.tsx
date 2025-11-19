import css from './index.module.css';
import { Icons } from '@/components/HeaderBar/Icons';
import LogoSvg from './svg/Logo.svg';
import { Menu } from '@/components/HeaderBar/Menu';
import Link from 'next/link';

export async function HeaderBar() {
  return (
    <div className={css.root}>
      <Link href={'/'}>
        <LogoSvg />
      </Link>

      <Menu />

      <Icons />
    </div>
  );
}