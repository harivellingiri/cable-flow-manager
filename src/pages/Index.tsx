
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/member');
      }
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-muted/20">
      <div className="animate-pulse">Redirecting...</div>
    </div>
  );
};

export default Index;
