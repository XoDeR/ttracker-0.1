import React, { useState } from 'react';
import { Routes, Route, useParams, NavLink } from 'react-router-dom';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
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
      <main className="flex-1 mt-16 md:ml-64">
        <div className="p-4">{children}</div>
      </main>
    </div>
  )
}