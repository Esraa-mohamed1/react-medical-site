import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../services/api';
import Swal from 'sweetalert2';

export default function LoginPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const handleLogin = async (payload, setFieldErrors) => {
    setServerError('');
    try {
      const data = await loginUser(payload);
      console.log('Login successful:', data);
      
      localStorage.setItem('loggedUser', JSON.stringify(data));
      window.dispatchEvent(new Event('authChange'));

      if (data.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error.response?.data?.detail || 'Login failed. Please check your credentials.';
      setServerError(errorMessage);
    }
  };

  const handleGoogleLogin = () => {
    // ... existing code ...
  };

  return (
    <div className="auth-container">
      <AuthForm variant="login" onSubmit={handleLogin} serverError={serverError} />
    </div>
  );
}