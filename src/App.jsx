import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserContext from './contexts/UserContext';

const App = () => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className='w-screen h-screen text-bgsecondary bg-bgprimary'>
        <Navbar>
          <Outlet></Outlet>
        </Navbar>
      </div>
    </UserContext.Provider>
  );
};
export default App;
