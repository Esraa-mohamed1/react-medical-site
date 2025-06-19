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
      // Show field-specific error if possible
      if (error.message && error.message.toLowerCase().includes('username')) {
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
