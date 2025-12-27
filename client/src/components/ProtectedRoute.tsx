import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
