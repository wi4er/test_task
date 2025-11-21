"use client";

import { UserForm } from '@/components/UserForm';
import React from 'react';
import { userContext } from '@/context/UserProvider';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function PersonalPage() {
  const {user} = React.useContext(userContext);

  if (!user) return null;

  return (
    <div>
      <Breadcrumbs list={[{
        name: 'Home',
        link: '/',
      }, {
        name: 'Personal',
        link: '/personal'
      }]} />

      <UserForm/>
    </div>
  );
}