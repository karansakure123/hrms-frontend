import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminNavbar from '../components/admin/AdminNavbar';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Employees from '../pages/admin/Employees';
import LeaveRequests from '../pages/admin/LeaveRequests';
import AdminAttendance from '../pages/admin/Attendance';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="flex">
        <div className="flex-shrink-0">
          <AdminSidebar />
        </div>
        <div className="flex-1 p-4 md:p-6 pt-20 md:pt-4 transition-all duration-300 max-w-full overflow-x-hidden overflow-y-auto">
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="leaves" element={<LeaveRequests />} />
            <Route path="attendance" element={<AdminAttendance />} />
           </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;