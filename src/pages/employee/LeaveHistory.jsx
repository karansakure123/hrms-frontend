import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
 import { getLeaves } from '../../services/leave.service';
import Spinner from '../../components/common/Spinner';

const LeaveHistory = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
       const response = await getLeaves();
       setLeaves(response || []);
    } catch (error) {
       toast.error('Failed to fetch leave records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      case 'pending':
        return 'status-pending';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="my-leaves-page">
      <div className="page-header">
        <h2>My Leave Requests</h2>
        <p>View the status of your leave applications</p>
      </div>

      <div className="leaves-content">
        {loading ? (
          <Spinner inline />
        ) : leaves.length === 0 ? (
          <p>No leave requests found.</p>
        ) : (
          <div className="leaves-table">
            <table>
              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Applied On</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave._id}>
                    <td>{leave.leaveType}</td>
                    <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                    <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                    <td>{leave.reason}</td>
                    <td>
                      <span className={`status ${getStatusColor(leave.status)}`}>
                        {leave.status || 'Pending'}
                      </span>
                    </td>
                    <td>{new Date(leave.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveHistory;