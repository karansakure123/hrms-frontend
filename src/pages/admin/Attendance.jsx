import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getAttendanceOverview } from '../../services/admin.service';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await getAttendanceOverview();
      setAttendanceData(response);
    } catch (error) {
      toast.error('Failed to fetch attendance data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="p-6 max-h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Attendance Overview</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">All Attendance Records</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Employee</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Check In</th>
                <th className="px-4 py-2 text-left">Check Out</th>
                <th className="px-4 py-2 text-left">Working Minutes</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((attendance) => (
                <tr key={attendance._id} className="border-t">
                  <td className="px-4 py-2">{attendance.employee?.fullName || 'N/A'}</td>
                  <td className="px-4 py-2">{new Date(attendance.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{attendance.status}</td>
                  <td className="px-4 py-2">{attendance.checkIn ? new Date(attendance.checkIn).toLocaleTimeString() : 'N/A'}</td>
                  <td className="px-4 py-2">{attendance.checkOut ? new Date(attendance.checkOut).toLocaleTimeString() : 'N/A'}</td>
                  <td className="px-4 py-2">{attendance.workingMinutes || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;