import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentAreaConfig } from '../config/studentArea';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="student-app"><div className="student-loader" role="status">Comprobando tu sesión…</div></div>;
  if (!user) return <Navigate to={`${studentAreaConfig.loginUrl}?next=${encodeURIComponent(location.pathname)}`} replace />;
  return children;
}
