import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { checkIn, checkOut, getAttendance } from '../../services/attendance.service';

const AttendanceForm = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const [todayAttendance, setTodayAttendance] = useState(null);

  const fetchTodayAttendance = async () => {
    try {
      const response = await getAttendance();
      const records = Array.isArray(response) ? response : response?.data || [];
      const today = new Date().toDateString();
      const todayRecord = records.find(record => new Date(record.date).toDateString() === today);
      setTodayAttendance(todayRecord || null);
    } catch (error) {
      console.error('Failed to fetch today\'s attendance');
    }
  };

  useEffect(() => {
    fetchTodayAttendance();
  }, []);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      await checkIn();
      toast.success('Checked in successfully!');
      setLastAction('check-in');
      await fetchTodayAttendance();
      if (onSubmit) onSubmit();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Check-in failed');
    } finally {
      setLoading(false);

    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      await checkOut();
      toast.success('Checked out successfully!');
      setLastAction('check-out');
      await fetchTodayAttendance();
      if (onSubmit) onSubmit();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Check-out failed');
    } finally {
      setLoading(false);
    }
  };

  return (
 <div className="attendance-form w-full">
  <h3 className="text-lg font-semibold">Mark Attendance</h3>
  <p className="text-sm text-gray-600 mb-3">
    Click the appropriate button to check in or check out
  </p>

  <div className="attendance-buttons flex gap-3">
    <button
      onClick={handleCheckIn}
      disabled={loading || todayAttendance?.checkIn}
      className="
        bg-green-600 hover:bg-green-500
        text-white text-sm font-medium
        px-4 py-2
        rounded-md
        flex items-center justify-center
        transition
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {loading && lastAction === 'check-in' ? 'Checking In...' : 'Check In'}
    </button>

    <button
      onClick={handleCheckOut}
      disabled={loading || !todayAttendance?.checkIn || todayAttendance?.checkOut}
      className="
        bg-red-600 hover:bg-red-500
        text-white text-sm font-medium
        px-4 py-1.5
        rounded-md
        flex items-center justify-center
        transition
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {loading && lastAction === 'check-out' ? 'Checking Out...' : 'Check Out'}
    </button>
  </div>
 </div>

  );
};

export default AttendanceForm;