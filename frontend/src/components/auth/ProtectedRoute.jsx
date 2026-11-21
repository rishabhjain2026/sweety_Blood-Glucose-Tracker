import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="grid min-h-screen place-items-center text-navy-muted" role="status">Loading your secure space…</div>;
  return user ? children : <Navigate to="/login" replace />;
}
