import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const GoogleAuthRedirect = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('GoogleAuthRedirect component mounted');
    console.log('Current URL:', window.location.href);
    console.log('Search params:', window.location.search);
    
    // Parse query params from URL
    const params = new URLSearchParams(window.location.search);
    const access = params.get('access');
    const refresh = params.get('refresh');
    const username = params.get('username');
    const email = params.get('email');
    const error = params.get('error');
    const code = params.get('code');
    const state = params.get('state');

    console.log('Parsed params:', { access, refresh, username, email, error, code, state });

    if (error) {
      setError(error);
      Swal.fire({
        icon: 'error',
        title: 'Google Login Failed',
        text: error || 'Unable to login with Google. Please try again.',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/login', { replace: true });
      });
      return;
    }

    if (access && refresh) {
      // Store tokens and user info in localStorage
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      localStorage.setItem('loggedUser', JSON.stringify({ name: username, email }));

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome back!',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        // Redirect to homepage after Google login
        navigate('/', { replace: true });
      });
    } else if (code && state) {
      // Backend received the OAuth code but hasn't processed it yet
      console.log('OAuth code received, waiting for backend processing...');
      Swal.fire({
        icon: 'info',
        title: 'Processing...',
        text: 'Completing Google login...',
        timer: 2000,
        showConfirmButton: false
      });
      
      // Wait a bit and check if backend processes the code
      setTimeout(() => {
        console.log('Checking if backend processed the OAuth code...');
        // If still no tokens, redirect back to login
        navigate('/login', { replace: true });
      }, 3000);
    } else {
      // No tokens or code received, show error
      console.log('No tokens or OAuth code received');
      setError('Authentication failed');
      Swal.fire({
        icon: 'error',
        title: 'Authentication Failed',
        text: 'Unable to complete Google login. Please try again.',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/login', { replace: true });
      });
    }
  }, [navigate]);

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div>Authentication failed. Redirecting to login...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div style={{ fontSize: '1.2rem', fontWeight: '500' }}>Processing Google login...</div>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        border: '4px solid #f3f3f3', 
        borderTop: '4px solid #4285f4', 
        borderRadius: '50%', 
        animation: 'spin 1s linear infinite' 
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default GoogleAuthRedirect;
