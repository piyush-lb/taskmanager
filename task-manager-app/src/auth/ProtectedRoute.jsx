import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const ProtectedRoute = ({ 
  children, 
  requiredPermissions = [], 
  requireAll = false 
}) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = useAuth();

  const hasAccess = React.useMemo(() => {
    if (requiredPermissions.length === 0) return true;
    return requireAll 
      ? hasAllPermissions(requiredPermissions)
      : hasAnyPermission(requiredPermissions);
  }, [requiredPermissions, requireAll, hasAnyPermission, hasAllPermissions]);

  if (!hasAccess) {
    {/* TODO: can add /unauthorized page later
     return <Navigate to="/unauthorized" replace />;
    */}
    return <div className="text-red-500 text-center text-2xl">Unauthorized</div>;
  }

  return React.cloneElement(children, { hasPermission });
}; 