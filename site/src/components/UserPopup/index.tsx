import React from 'react';
import { Wrap } from './Wrap';
import { Form } from './Form';

export type UserFormType = 'authorization' | 'registration';

export function UserPopup(
  {
    onClose,
    open,
  }: {
    onClose: () => void;
    open: boolean;
  },
) {
  return (
    <Wrap open={open} onClose={onClose}>
      {open ? <Form onClose={onClose}/>: null}
    </Wrap>
  );
}