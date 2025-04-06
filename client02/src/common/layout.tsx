import React, { useState } from 'react';
import { Routes, Route, useParams, NavLink } from 'react-router-dom';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <nav className="flex-1 ml-4 text-lg">
        <Routes>
          <Route path="/timespans/list" element={<span>Timesheet</span>} />
          <Route path="/user/tags" element={<span>User</span>} />
        </Routes>
      </nav>
      <aside className="fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg transform">
        <nav className="flex flex-col p-4 space-y-4">
          <div>
            <NavLink
              to="/timespans/list"
              className="block px-4 py-2 hover:bg-gray-700 text-white"
            >
              Timesheet
            </NavLink>
            <NavLink
              to="/user/tags"
              className="block px-4 py-2 hover:bg-gray-700 text-white"
            >
              Tags
            </NavLink>
          </div>
        </nav>
      </aside>
      {children}
    </div>
  )
}