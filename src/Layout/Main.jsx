
import NavBer from '../NavBer/NavBer';
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <div className='py-4 px-8 flex, flex-col min-h-screen'>
      <NavBer></NavBer>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;