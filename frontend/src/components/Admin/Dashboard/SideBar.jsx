import React from "react";
import { Box, ClipboardList, Home } from "lucide-react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const activeClass = ({ isActive }) =>
    isActive
      ? "w-full flex items-center gap-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl px-4 py-3 shadow-lg shadow-blue-500/30 transition-all duration-200"
      : "w-full flex items-center gap-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-xl px-4 py-3 transition-all duration-200";

  const iconClass = (isActive) =>
    isActive ? "w-5 h-5" : "w-5 h-5 text-gray-400";

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-950 border-r border-gray-800 h-screen shadow-2xl">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Fabrico
        </h1>
        <p className="text-xs text-gray-500 mt-1">Management Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {/* Dashboard Button */}
        <NavLink to="/dashboard" end className={activeClass}>
          {({ isActive }) => (
            <>
              <Home className={iconClass(isActive)} />
              Dashboard
            </>
          )}
        </NavLink>

        {/* Products & Orders Section */}
        <div className="pt-4">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider px-4 pb-2">
            Management
          </p>
          <div className="space-y-1">
            <NavLink to="/dashboard/all-products" className={activeClass}>
              {({ isActive }) => (
                <>
                  <Box className={iconClass(isActive)} />
                  All Products
                </>
              )}
            </NavLink>

            <NavLink to="/dashboard/order-list" className={activeClass}>
              {({ isActive }) => (
                <>
                  <ClipboardList className={iconClass(isActive)} />
                  Order List
                </>
              )}
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBar