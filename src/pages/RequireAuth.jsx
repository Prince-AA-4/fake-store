import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const RequireAuth = ({ user, setLoginIntent, children }) => {
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      setLoginIntent('checkout');
    }
  }, [user, setLoginIntent]);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
