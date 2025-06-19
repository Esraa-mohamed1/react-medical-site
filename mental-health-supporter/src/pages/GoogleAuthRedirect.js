import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Parse query params from URL
    const params = new URLSearchParams(window.location.search);
    const access = params.get('access');
    const refresh = params.get('refresh');
    const username = params.get('username');
    const email = params.get('email');

    if (access && refresh) {
      // Store tokens and user info in localStorage
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      localStorage.setItem('loggedUser', JSON.stringify({ name: username, email }));

      // Redirect to /artical after Google login
      navigate('/artical', { replace: true });
 
    }
  }, [navigate]);

  return <div>Logging you in with Google...</div>;
};

export default GoogleAuthRedirect;
