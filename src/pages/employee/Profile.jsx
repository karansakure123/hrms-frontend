import React from 'react';
import { useAuth } from '../../context/AuthContext';
import LeaveSummary from '../../components/employee/LeaveSummary';
import { UserCircle, Mail, Shield, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page space-y-6 max-h-screen overflow-y-auto">
      <div className="page-header">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center">
          <UserCircle className="mr-3" size={32} />
          My Profile
        </h2>
        <p className="text-gray-600">View your account information and leave details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <UserCircle className="mr-2" size={20} />
            Profile Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <UserCircle className="text-gray-400" size={20} />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{user.fullName}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="text-gray-400" size={20} />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Shield className="text-gray-400" size={20} />
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium capitalize">{user.role?.toLowerCase()}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="text-gray-400" size={20} />
              <div>
                <p className="text-sm text-gray-500">Date of Joining</p>
                <p className="font-medium">{new Date(user.dateOfJoining).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Account Status</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500">Joined On</p>
              <p className="font-medium">{new Date(user.createdAt || user.dateOfJoining).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Details */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Leave Details</h3>
        <LeaveSummary />
      </div>
    </div>
  );
};

export default Profile;