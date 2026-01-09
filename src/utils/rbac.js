// src/config/rbac.js

export const ROLES = {
  ADMIN: 'ADMIN',
  EMPLOYEE: 'EMPLOYEE',
};

export const PERMISSIONS = {
  APPLY_LEAVE: 'APPLY_LEAVE',
  VIEW_OWN_LEAVE: 'VIEW_OWN_LEAVE',
  MARK_ATTENDANCE: 'MARK_ATTENDANCE',

  VIEW_ALL_LEAVES: 'VIEW_ALL_LEAVES',
  APPROVE_LEAVE: 'APPROVE_LEAVE',
  VIEW_ALL_ATTENDANCE: 'VIEW_ALL_ATTENDANCE',
};

export const ROLE_PERMISSIONS = {
  [ROLES.EMPLOYEE]: [
    PERMISSIONS.APPLY_LEAVE,
    PERMISSIONS.VIEW_OWN_LEAVE,
    PERMISSIONS.MARK_ATTENDANCE,
  ],

  [ROLES.ADMIN]: [
    PERMISSIONS.VIEW_ALL_LEAVES,
    PERMISSIONS.APPROVE_LEAVE,
    PERMISSIONS.VIEW_ALL_ATTENDANCE,
  ],
};

// Utility functions
export const hasPermission = (user, permission) => {
  if (!user || !user.role) return false;
  return ROLE_PERMISSIONS[user.role]?.includes(permission) || false;
};

export const isAdmin = (user) => user && user.role === ROLES.ADMIN;
export const isEmployee = (user) => user && user.role === ROLES.EMPLOYEE;
