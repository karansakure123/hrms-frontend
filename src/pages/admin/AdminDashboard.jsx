import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Users, FileText, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { getAllEmployees, getLeaveRequests, approveLeave, rejectLeave, getAttendanceOverview } from '../../services/admin.service';
import '../../styles/pages/AdminPages.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    todaysAttendance: 0,
  });
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [employeesRes, leavesRes, attendanceRes] = await Promise.all([
        getAllEmployees(),
        getLeaveRequests(),
        getAttendanceOverview(),
      ]);

      const today = new Date().toISOString().split('T')[0];
      const todaysAttendance = attendanceRes.filter(att => att.date.startsWith(today)).length;

      setStats({
        totalEmployees: employeesRes.length,
        pendingLeaves: leavesRes.filter(leave => leave.status === 'PENDING').length,
        todaysAttendance,
      });

      setLeaveRequests(leavesRes);
      setAttendanceData(attendanceRes);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveLeave = async (leaveId) => {
    try {
      await approveLeave(leaveId);
      toast.success('Leave approved');
      fetchDashboardData(); // Refresh data
    } catch (error) {
      toast.error('Failed to approve leave');
    }
  };

  const handleRejectLeave = async (leaveId) => {
    try {
      await rejectLeave(leaveId);
      toast.success('Leave rejected');
      fetchDashboardData(); // Refresh data
    } catch (error) {
      toast.error('Failed to reject leave');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="p-6 max-h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold">{stats.totalEmployees}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Leaves</p>
              <p className="text-2xl font-bold">{stats.pendingLeaves}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Attendance</p>
              <p className="text-2xl font-bold">{stats.todaysAttendance}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Leave Requests */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Leave Requests</h2>
        <div className="admin-table-container">
          <table className="min-w-full table-auto border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Employee</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Start Date</th>
                <th className="px-4 py-2 text-left">End Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.slice(0, 5).map((leave) => (
                <tr key={leave._id} className="border-t">
                  <td className="px-4 py-2">{leave.userId?.fullName || 'N/A'}</td>
                  <td className="px-4 py-2">{leave.leaveType}</td>
                  <td className="px-4 py-2">{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-sm ${
                      leave.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      leave.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {leave.status === 'PENDING' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApproveLeave(leave._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button
                          onClick={() => handleRejectLeave(leave._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Attendance Overview</h2>
        <div className="admin-table-container">
          <table className="min-w-full table-auto border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Employee</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Check In</th>
                <th className="px-4 py-2 text-left">Check Out</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.slice(0, 10).map((attendance) => (
                <tr key={attendance._id} className="border-t">
                  <td className="px-4 py-2">{attendance.employee?.fullName || 'N/A'}</td>
                  <td className="px-4 py-2">{new Date(attendance.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{attendance.status}</td>
                  <td className="px-4 py-2">{attendance.checkIn ? new Date(attendance.checkIn).toLocaleTimeString() : 'N/A'}</td>
                  <td className="px-4 py-2">{attendance.checkOut ? new Date(attendance.checkOut).toLocaleTimeString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;