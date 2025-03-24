import React, { useState } from 'react';
import { Routes, Route, useParams, NavLink } from 'react-router-dom';

interface PageProps {
  children?: React.ReactNode;
}

interface Dashboard {
  id: number;
  name: string;
};

export const Page: React.FC<PageProps> = ({ children }: PageProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);


  const dashboards: Dashboard[] = [];
  const username = "";
  const logout = () => { };

  // Mock Drawer Content
  const drawer = (
    <div>
      <NavLink
        to="/timesheet/list"
        className="block px-4 py-2 hover:bg-gray-700 text-white"
      >
        Timesheet List
      </NavLink>
      <NavLink
        to="/timesheet/calendar"
        className="block px-4 py-2 hover:bg-gray-700 text-white"
      >
        Timesheet Calendar
      </NavLink>
      <NavLink
        to="/user/settings"
        className="block px-4 py-2 hover:bg-gray-700 text-white"
      >
        User Settings
      </NavLink>
      <NavLink
        to="/user/tags"
        className="block px-4 py-2 hover:bg-gray-700 text-white"
      >
        User Tags
      </NavLink>
      <NavLink
        to="/admin/users"
        className="block px-4 py-2 hover:bg-gray-700 text-white"
      >
        Admin Users
      </NavLink>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* AppBar */}
      <header className="bg-gray-800 text-white fixed w-full shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Menu Button */}
          <button
            aria-label="Open drawer"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white focus:outline-none"
          >
            {/* Replace with an icon component like Heroicons */}
            <span className="material-icons">menu</span>
          </button>

          {/* Title */}
          <nav className="flex-1 ml-4 text-lg">
            <Routes>
              <Route path="/timesheet/list" element={<span>Timesheet / List</span>} />
              <Route path="/timesheet/calendar" element={<span>Timesheet / Calendar</span>} />
              <Route path="/user/settings" element={<span>User / Settings</span>} />
              <Route path="/user/tags" element={<span>User / Tags</span>} />
              <Route path="/admin/users" element={<span>Admin / Users</span>} />
              <Route path="/dashboards" element={<span>Dashboards / Manage</span>} />
              <Route path="/dashboard/:id/:name" element={<DashboardTitle dashboards={dashboards} />} />
            </Routes>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={(e) => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center hover:text-gray-300 focus:outline-none"
            >
              <span className="material-icons">account_circle</span>
              &nbsp;{username}
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 top-12 bg-white text-black rounded shadow-lg">
                <ul>
                  <li>
                    <NavLink to="/user/settings" className="block px-4 py-2 hover:bg-gray-100">
                      Settings
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 text-left w-full"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Drawer */}
      <aside className={`fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform md:translate-x-0`}>
        <nav className="flex flex-col p-4 space-y-4">
          {drawer}
        </nav>
        <button
          aria-label="Close drawer"
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 md:hidden"
        >
          <span className="material-icons">close</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 mt-16 md:ml-64">
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
};

const DashboardTitle: React.FC<{ dashboards: Dashboard[] }> = ({ dashboards }) => {
  const { id } = useParams();
  const dashboard = dashboards.find((d) => d.id === parseInt(id || '', 10));
  return <span>{`Dashboards / ${dashboard ? dashboard.name : '...'}`}</span>;
};