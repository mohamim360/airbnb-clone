import React from 'react';
import NavBer from '../NavBer/NavBer';
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <div className='p-5 flex, flex-col min-h-screen'>
      <NavBer></NavBer>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;