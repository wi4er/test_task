'use client';

import React from 'react';
import css from './Popup.module.css';
import cn from 'classnames';
import font from '@/fonts/text-styles.module.css';
import { basketContext } from '@/context/BasketProvider';
import { motion, AnimatePresence } from 'framer-motion';
import ShareSvg from './svg/share.svg';
import CompareSvg from './svg/compare.svg';
import HeartSvg from './svg/Heart.svg';

export function Popup(
  {
    hover,
    id,
  }: {
    hover: boolean;
    id: number;
  },
) {
  const {dispatch} = React.useContext(basketContext);

  return (
    <>
      <AnimatePresence>
        {hover ? <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 0.72}}
          exit={{opacity: 0, transition: {delay: .125}}}
          className={css.substrate}
        /> : null}
      </AnimatePresence>

      <AnimatePresence>
        {hover ? <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{
            opacity: 1,
            y: 0,
            transition: {delay: .25},
          }}
          exit={{opacity: 0, y: 20}}
          className={css.popup}
        >
          <button
            className={cn(css.buy, font.poppins_semi_bold)}
            onClick={() => dispatch({type: 'ADD', product: id})}
          >
            Add to cart
          </button>

          <div className={cn(css.button_list, font.poppins_semi_bold)}>
            <button className={css.button}>
              <ShareSvg/>

              Share
            </button>

            <button className={css.button}>
              <CompareSvg/>

              Compare
            </button>

            <button className={css.button}>
              <HeartSvg/>

              Like
            </button>
          </div>
        </motion.div> : null}
      </AnimatePresence>
    </>
  );
}