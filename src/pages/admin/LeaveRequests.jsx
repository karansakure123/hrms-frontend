import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CheckCircle, XCircle } from 'lucide-react';
import { getLeaveRequests, approveLeave, rejectLeave } from '../../services/admin.service';
import '../../styles/pages/AdminPages.css';

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await getLeaveRequests();
      setLeaveRequests(response);
    } catch (error) {
      toast.error('Failed to fetch leave requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveLeave = async (leaveId) => {
    try {
      await approveLeave(leaveId);
      toast.success('Leave approved');
      fetchLeaveRequests(); // Refresh data
    } catch (error) {
      toast.error('Failed to approve leave');
    }
  };

  const handleRejectLeave = async (leaveId) => {
    try {
      await rejectLeave(leaveId);
      toast.success('Leave rejected');
      fetchLeaveRequests(); // Refresh data
    } catch (error) {
      toast.error('Failed to reject leave');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="p-6 max-h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Leave Requests</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">All Leave Requests</h2>
        <div className="admin-table-container">
          <table className="min-w-full table-auto border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Employee</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Start Date</th>
                <th className="px-4 py-2 text-left">End Date</th>
                <th className="px-4 py-2 text-left">Reason</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((leave) => (
                <tr key={leave._id} className="border-t">
                  <td className="px-4 py-2">{leave.userId?.fullName || 'N/A'}</td>
                  <td className="px-4 py-2">{leave.leaveType}</td>
                  <td className="px-4 py-2">{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{leave.reason}</td>
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
    </div>
  );
};

export default LeaveRequests;