import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { registerUser } from '../services/api';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (data, setFieldErrors) => {
    setError('');
    setSuccess('');
    try {
      await registerUser(data);
      setSuccess('Registration successful! Please check your email.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      // Robust field-specific error handling
      setFieldErrors({});
      // Debug: log all error details for tracking
      console.log('❌ error:', error);
      console.log('❌ error.response:', error.response);
      console.log('❌ error.response?.data:', error.response?.data);
      console.log('❌ error.message:', error.message);
      if (error.response && error.response.data) {
        const data = error.response.data;
        let fieldErrors = {};
        // Map backend keys to frontend field names
        const keyMap = {
          username: 'name',
          email: 'email',
          password: 'password',
          full_name: 'full_name',
        };
        Object.keys(data).forEach((key) => {
          const frontendKey = keyMap[key] || key;
          let msg = data[key];
          if (Array.isArray(msg)) msg = msg[0];
          if (typeof msg === 'string') {
            // Always show a clear English message for username/email duplicate or required
            if (frontendKey === 'name' && (msg.toLowerCase().includes('exist') || msg.toLowerCase().includes('unique'))) {
              fieldErrors.name = 'This username is already taken. Please use another username.';
            } else if (frontendKey === 'email' && (msg.toLowerCase().includes('exist') || msg.toLowerCase().includes('unique'))) {
              fieldErrors.email = 'This email is already registered. Please use another email.';
            } else if (frontendKey === 'name' && msg.toLowerCase().includes('required')) {
              fieldErrors.name = 'Username is required.';
            } else if (frontendKey === 'email' && msg.toLowerCase().includes('required')) {
              fieldErrors.email = 'Email is required.';
            } else if (frontendKey === 'password' && msg.toLowerCase().includes('required')) {
              fieldErrors.password = 'Password is required.';
            } else {
              fieldErrors[frontendKey] = msg;
            }
          }
        });
        if (Object.keys(fieldErrors).length > 0) {
          setFieldErrors(fieldErrors);
          console.log('🛑 Server validation errors:', fieldErrors);
        } else if (data.detail) {
          setError(data.detail);
        } else {
          setError(error.message);
        }
      } else if (error.message && error.message.toLowerCase().includes('username')) {
        setFieldErrors({ name: error.message });
      } else if (error.message && error.message.toLowerCase().includes('email')) {
        setFieldErrors({ email: error.message });
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      {error && (
        <div className="alert alert-danger text-center" role="alert" style={{ maxWidth: 400, margin: '1rem auto' }}>
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success text-center" role="alert" style={{ maxWidth: 400, margin: '1rem auto' }}>
          {success}
        </div>
      )}
      <AuthForm variant="register" onSubmit={handleRegister} serverError={error} />
    </div>
  );
}
