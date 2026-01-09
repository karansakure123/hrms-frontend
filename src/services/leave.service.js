import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/leave`;

// Apply for leave
export const applyLeave = async (leaveData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/apply`, leaveData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get user's leaves
export const getLeaves = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get leave summary
export const getLeaveSummary = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/summary`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get all leaves (for admin)
export const getAllLeaves = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update leave status (for admin)
export const updateLeaveStatus = async (leaveId, status) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/${leaveId}`, { status }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};