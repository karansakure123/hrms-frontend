import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getLeaveSummary } from '../../services/leave.service';
 const LeaveSummary = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getLeaveSummary();
        setSummary({
          totalLeaves: data.total,
          usedLeaves: data.used,
          remainingLeaves: data.remaining
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leave summary:', error);
        // Keep loading true until real data arrives
        // Optionally, you can add a retry mechanism here
      }
    };

    fetchSummary();
  }, [user]);

  if (loading || !summary) {
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