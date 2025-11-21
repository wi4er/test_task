"use client";

import css from './index.module.css';
import React from 'react';

export function UserForm() {

  React.useEffect(() => {
    fetch('/api/session/me', {
      method: 'POST',
    }).then(res => res.json()).then(res => {
      console.log(res);
    });
  }, []);

  return (
    <div className={css.root}>
        USER FORM
    </div>
  );
}