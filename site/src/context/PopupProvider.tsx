'use client';

import css from './PopupProvider.module.css';
import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';


export interface PopupElement {
  onClose?: () => void;
  element: ReactNode;
}

interface PopupType {
  openPopup: (open: PopupElement) => void,
  closePopup: () => void;
}

export const popupContext = React.createContext<PopupType>({} as PopupType);

export function PopupProvider(
  {
    children,
  }: {
    children: ReactNode;
  },
) {
  const [popup, setPopup] = React.useState<PopupElement | null>(null);

  const handleClose = () => {

    console.log('CLICK');

    popup?.onClose?.();
    setPopup(null);
  };

  return (
    <popupContext.Provider value={{
      openPopup: open => setPopup(open),
      closePopup: () => setPopup(null),
    }}>
      {children}

      <AnimatePresence>
        {popup ? <motion.div
          className={css.substrate}
          onClick={handleClose}
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
        {popup ? <motion.div
          className={css.popup}
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
            {popup.element}
          </motion.div>
        </motion.div> : null}
      </AnimatePresence>
    </popupContext.Provider>
  );
}