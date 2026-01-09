import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Users, FileText, Calendar, LogOut, Menu, X, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Sidebar.css';

const AdminSidebar = ({ onToggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      icon: BarChart3
    },
    {
      path: '/admin/employees',
      name: 'Employees',
      icon: Users
    },
    {
      path: '/admin/leaves',
      name: 'Leave Requests',
      icon: FileText
    },
    {
      path: '/admin/attendance',
      name: 'Attendance Overview',
      icon: Calendar
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
       <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

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

export default AdminSidebar;