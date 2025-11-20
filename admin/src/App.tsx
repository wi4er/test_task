import React from 'react';
import './App.module.css';
import { UserContext } from './context/UserContext';
import { HeaderBar } from './components/HeaderBar';
import { BrowserRouter, Routes, Route } from 'react-router';
import { DashboardTile } from './components/DashboardTile';
import { UserList } from './components/UserList';
import { ProductList } from './components/ProductList';
import { ApiContext } from './context/ApiContext';
import { OrderList } from './components/OrderList';

function App() {
  return (
    <ApiContext>
      <BrowserRouter>
        <UserContext>
          <HeaderBar/>

          <Routes>
            <Route path={'/'} element={<DashboardTile/>}/>
            <Route path={'/users'} element={<UserList/>}/>
            <Route path={'/products'} element={<ProductList/>}/>
            <Route path={'/orders'} element={<OrderList/>}/>
          </Routes>
        </UserContext>
      </BrowserRouter>
    </ApiContext>
  );
}

export default App;
