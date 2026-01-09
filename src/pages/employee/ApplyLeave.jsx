import React from 'react';
import LeaveForm from '../../components/employee/LeaveForm';

const ApplyLeave = () => {
  return (
    <div className="apply-leave-page">
      <div className="page-header">
        <h2>Apply Leave</h2>
        <p>Submit your leave request for approval</p>
      </div>

      <div className="leave-form-container">
        <LeaveForm />
      </div>
    </div>
  );
};

export default ApplyLeave;