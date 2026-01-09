import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

// Get all employees
export const getAllEmployees = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/employees`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get leave requests
export const getLeaveRequests = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/leaves`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Approve leave
export const approveLeave = async (leaveId) => {
  const token = localStorage.getItem('token');
  const response = await axios.patch(`${API_URL}/leaves/${leaveId}/status`, { status: 'APPROVED' }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Reject leave
export const rejectLeave = async (leaveId) => {
  const token = localStorage.getItem('token');
  const response = await axios.patch(`${API_URL}/leaves/${leaveId}/status`, { status: 'REJECTED' }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get attendance overview
export const getAttendanceOverview = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/attendance`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};