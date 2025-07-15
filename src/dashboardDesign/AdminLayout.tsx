import { Outlet } from 'react-router-dom';
import Card from './Card';
import { AdminSideNav } from './AdminSidenav';

export const AdminLayout = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex overflow-hidden bg-gradient-to-br from-white to-purple-50">
      {/* Sidebar (fixed width) */}
      <div className="w-52 flex-shrink-0">
        <AdminSideNav />
      </div>

      {/* Main content (scrollable) */}
      <div className="flex-1 overflow-y-auto p-4">
        <Card>
          <Outlet />
        </Card>
      </div>
    </div>
  );
};
