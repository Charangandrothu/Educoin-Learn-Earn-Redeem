import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const { currentStudent, logout, isAdmin } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!currentStudent) return null;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-school-blue">🪙 EduCoin</span>
            </Link>
            {!isAdmin && (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-school-blue px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/tasks"
                  className="text-gray-700 hover:text-school-blue px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Tasks
                </Link>
                <Link
                  to="/redeem"
                  className="text-gray-700 hover:text-school-blue px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Redeem
                </Link>
              </>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                className="text-gray-700 hover:text-school-blue px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Admin Panel
              </Link>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 text-sm">
              {isAdmin ? '👨‍🏫 Admin' : `👤 ${currentStudent.Name} (${currentStudent.RollNo})`}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

