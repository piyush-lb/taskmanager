import React, { createContext, useContext, useState, useCallback } from 'react';
import { ROLES, ROLE_PERMISSIONS } from './roles';

const AuthContext = createContext(null);

export const AuthProvider = ({ children, userRole }) => {
 
  const hasPermission = useCallback((permission) => {
    const userPermissions = ROLE_PERMISSIONS[userRole] || [];
    return userPermissions.includes(permission);
  }, [userRole]);

  // Not needed now, but later can use for screen-level auth handling
  const hasAnyPermission = useCallback((permissions) => {
    return permissions.some(permission => hasPermission(permission));
  }, [hasPermission]);

  // Not needed now, but later can use for screen-level auth handling
  const hasAllPermissions = useCallback((permissions) => {
    return permissions.every(permission => hasPermission(permission));
  }, [hasPermission]);

  const value = {
    userRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 