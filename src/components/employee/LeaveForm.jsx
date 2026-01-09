import React, { useState } from 'react';
import { toast } from 'sonner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { applyLeave } from '../../services/leave.service';
import '../../styles/LeaveForm.css';

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: null,
    endDate: null,
    reason: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        startDate: formData.startDate ? formData.startDate.toISOString().split('T')[0] : '',
        endDate: formData.endDate ? formData.endDate.toISOString().split('T')[0] : '',
      };
      await applyLeave(submitData);
      toast.success('Leave application submitted successfully!');
      setFormData({
        leaveType: '',
        startDate: null,
        endDate: null,
        reason: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit leave application');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="leave-form">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="leaveType">Leave Type</label>
            <select
              id="leaveType"
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              required
            >
              <option value="">Select leave type</option>
              <option value="CASUAL">Casual Leave</option>
              <option value="SICK">Sick Leave</option>
              <option value="PAID">Paid Leave</option>
            </select>
          </div>
        </div>

        <div className="form-row grid">
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) => setFormData({ ...formData, startDate: date })}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select start date"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <DatePicker
              selected={formData.endDate}
              onChange={(date) => setFormData({ ...formData, endDate: date })}
              minDate={formData.startDate || new Date()}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select end date"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="reason">Reason</label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Please provide a reason for your leave request..."
              rows="4"
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Leave Request'}
        </button>
      </form>
    </div>
  );
};

export default LeaveForm;