"use client";

import css from './index.module.css';
import React from 'react';

export function OrderList() {

  React.useEffect(() => {
    fetch('/api/orders/mine').then(res => res.json()).then(res => {
      console.log(res);
    })
  }, []);

  return (
    <div className={css.root}>
        
    </div>
  );
}