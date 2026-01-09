import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, FileText, User, Menu, X, LogOut, BarChart3, UserCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Sidebar.css';

const EmployeeSidebar = ({ onToggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    {
      path: '/employee/dashboard',
      name: 'Dashboard',
      icon: BarChart3
    },
    {
      path: '/employee/attendance',
      name: 'Attendance',
      icon: Calendar
    },
    {
      path: '/employee/apply-leave',
      name: 'Apply Leave',
      icon: FileText
    },
    {
      path: '/employee/leaves',
      name: 'My Leaves',
      icon: User
    },
    {
      path: '/employee/profile',
      name: 'Profile',
      icon: UserCircle
    },
    {
      path: '#',
      name: 'Logout',
      icon: LogOut,
      onClick: handleLogout
    }
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''} h-screen`}>
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            if (item.onClick) {
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    item.onClick();
                    closeSidebar();
                  }}
                  className={`sidebar-link w-full text-left ${isActive ? 'active' : ''}`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default EmployeeSidebar;