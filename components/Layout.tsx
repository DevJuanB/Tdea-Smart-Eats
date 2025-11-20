import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import ChatAssistant from './ChatAssistant';

const Layout: React.FC = () => {
  const location = useLocation();
  const hideNavRoutes = ['/login'];
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative shadow-2xl overflow-hidden">
      <Outlet />
      {showNav && (
        <>
          <ChatAssistant />
          <BottomNav />
        </>
      )}
    </div>
  );
};

export default Layout;