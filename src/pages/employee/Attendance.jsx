import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import AttendanceForm from '../../components/employee/AttendanceForm';
 import { getAttendance } from '../../services/attendance.service';
import Spinner from '../../components/common/Spinner';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAttendance = async () => {
    try {
      const response = await getAttendance();

      // Handle different response formats
      let records = [];
      if (Array.isArray(response)) {
        records = response;
      } else if (response && Array.isArray(response.data)) {
        records = response.data;
      } else if (response && response.data) {
        records = Array.isArray(response.data) ? response.data : [];
      }

      setAttendanceRecords(records);
    } catch (error) {
      toast.error('Failed to fetch attendance records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleAttendanceSubmit = () => {
    fetchAttendance(); // Refresh the list after submitting
  };

  return (
    <div className="attendance-page">
      <div className="page-header">
        <h2>Attendance</h2>
        <p>Mark your attendance and view your records</p>
      </div>

      <div className="attendance-content flex flex-col space-y-6">
        <div className="attendance-form-section w-full">
          <AttendanceForm onSubmit={handleAttendanceSubmit} />
        </div>

        <div className="attendance-records-section w-full" style={{ clear: 'both' }}>
          <h3>Recent Attendance Records</h3>
          {loading ? (
            <Spinner inline />
          ) : attendanceRecords.length === 0 ? (
            <p>No attendance records found.</p>
          ) : (
            <div className="attendance-table overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Check In</th>
                    <th className="px-4 py-2">Check Out</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record) => (
                    <tr key={record._id}>
                      <td className="px-4 py-2 border-t">{new Date(record.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2 border-t">{record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : '-'}</td>
                      <td className="px-4 py-2 border-t">{record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : '-'}</td>
                      <td className="px-4 py-2 border-t">
                        <span className={`status ${record.status?.toLowerCase()}`}>
                          {record.status || 'Present'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
