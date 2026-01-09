import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import LeaveSummary from '../../components/employee/LeaveSummary';
import { getAttendance } from '../../services/attendance.service';
import { getLeaves } from '../../services/leave.service';
import { Calendar, FileText, Clock } from 'lucide-react';
import "../../styles/pages/EmployeeDashboard.css"
const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [recentAttendance, setRecentAttendance] = useState([]);
  const [recentLeaves, setRecentLeaves] = useState([]);

  useEffect(() => {
    const fetchRecentData = async () => {
      try {
        const [attendanceData, leavesData] = await Promise.all([
          getAttendance(),
          getLeaves()
        ]);
        setRecentAttendance(attendanceData.slice(0, 3));
        setRecentLeaves(leavesData.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch recent data');
      }
    };

    fetchRecentData();
  }, []);

  const quickActions = [
    {
      title: 'Mark Attendance',
      description: 'Check in or check out',
      icon: Calendar,
      link: '/employee/attendance',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Apply Leave',
      description: 'Submit leave request',
      icon: FileText,
      link: '/employee/apply-leave',
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  return (
    <div className="employee-dashboard space-y-6 max-h-screen overflow-y-auto">
      <div className="dashboard-header">
        <h1 className="text-xl font-bold text-gray-800">Welcome, {user?.fullName || 'Employee'}</h1>
        <p className="text-gray-600">Manage your attendance and leave requests</p>
      </div>

      <LeaveSummary />

      <div className="quick-actions">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className={`block p-6 rounded-lg text-white transition-all duration-200 transform hover:scale-105 ${action.color}`}
              >
                <div className="flex items-center space-x-4">
                  <Icon size={28} />
                  <div>
                    <h3 className="text-base font-semibold">{action.title}</h3>
                    <p className="text-xs opacity-90">{action.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="recent-activity">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Clock className="mr-2" size={20} />
              Recent Attendance
            </h3>
            {recentAttendance.length === 0 ? (
              <p className="text-gray-500">No recent attendance</p>
            ) : (
              <div className="space-y-2">
                {recentAttendance.map((record, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{new Date(record.date).toLocaleDateString()}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      record.status === 'PRESENT' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {record.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <FileText className="mr-2" size={20} />
              Recent Leaves
            </h3>
            {recentLeaves.length === 0 ? (
              <p className="text-gray-500">No recent leaves</p>
            ) : (
              <div className="space-y-2">
                {recentLeaves.map((leave, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{leave.leaveType}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      leave.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      leave.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {leave.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;