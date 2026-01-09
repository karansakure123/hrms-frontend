import axios from 'axios';

const API_URL = 'http://localhost:5000/api/attendance';

// Check in
export const checkIn = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/checkin`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Check out
export const checkOut = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/checkout`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get user's attendance records
export const getAttendance = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get all attendance records (for admin)
export const getAllAttendance = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};