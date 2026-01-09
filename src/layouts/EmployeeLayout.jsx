import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeSidebar from '../components/employee/EmployeeSidebar';
import EmployeeNavbar from '../components/employee/EmployeeNavbar';
import EmployeeDashboard from '../pages/employee/Dashboard';
import ApplyLeave from '../pages/employee/ApplyLeave';
import LeaveHistory from '../pages/employee/LeaveHistory';
import Attendance from '../pages/employee/Attendance';
import Profile from '../pages/employee/Profile';

const EmployeeLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <EmployeeNavbar />
      <div className="flex">
        <div className="flex-shrink-0">
          <EmployeeSidebar />
        </div>
        <div className="flex-1 p-4 md:p-6 pt-20 md:pt-4 transition-all duration-300 max-w-full overflow-x-hidden overflow-y-auto">
          <Routes>
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="apply-leave" element={<ApplyLeave />} />
            <Route path="leaves" element={<LeaveHistory />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLayout;