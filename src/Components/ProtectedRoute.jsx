import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if 'userId' is present in localStorage
    const userId = localStorage.getItem('userId');

    if (!userId) {
      // If 'userId' is not found, redirect to login page
      navigate('/login');
    }
  }, [navigate]);

  // Return the children components if 'userId' exists
  const userId = localStorage.getItem('userId');
  if (!userId) {
    return null; // Return null while redirecting
  }

  return <>{children}</>; // Render children if userId exists
};

export default ProtectedRoute;
