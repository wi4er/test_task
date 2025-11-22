import css from './Wrap.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode } from 'react';

export function Wrap(
  {
    open,
    onClose,
    children,
  }: {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
  },
) {
  return (
    <>
      <AnimatePresence>
        {open ? <motion.div
          className={css.substrate}
          onClick={onClose}
          initial={{opacity: 0}}
          animate={{
            opacity: .2,
            transition: {duration: .3},
          }}
          exit={{
            opacity: 0,
            transition: {duration: .2, delay: .275},
          }}
        /> : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? <motion.div
          className={css.root}
          initial={{
            x: 500,
          }}
          animate={{
            x: 0,
            transition: {duration: .3, delay: .125},
          }}
          exit={{
            x: 500,
            transition: {duration: .3, delay: .125},
          }}
        >
          <motion.div
            className={css.inner}
            initial={{
              opacity: 0,
              scale: .9,
              x: 100,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              transition: {duration: .2, delay: .325},
            }}
            exit={{
              opacity: 0,
              x: 100,
              scale: .9,
              transition: {duration: .3},
            }}
          >
            {children}
          </motion.div>
        </motion.div> : null}
      </AnimatePresence>
    </>
  );
}