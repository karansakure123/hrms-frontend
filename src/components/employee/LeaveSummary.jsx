import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
 const LeaveSummary = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState({ totalLeaves: 20, usedLeaves: 0, remainingLeaves: 20 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getLeaveSummary();
        setSummary(data);
      } catch (error) {
        // Fallback to hardcoded values
        setSummary({
          totalLeaves: 20,
          usedLeaves: 0,
          remainingLeaves: user?.leaveBalance || 20
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [user]);

  if (loading) {
    return (
      <div className="leave-summary bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Leave Summary</h3>
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="leave-summary bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Leave Summary</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{summary.totalLeaves}</div>
          <div className="text-sm text-gray-600">Total Leaves</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{summary.usedLeaves}</div>
          <div className="text-sm text-gray-600">Used Leaves</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{summary.remainingLeaves}</div>
          <div className="text-sm text-gray-600">Remaining</div>
        </div>
      </div>
    </div>
  );
};

export default LeaveSummary;