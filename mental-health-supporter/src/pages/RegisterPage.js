import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { registerUser } from '../services/api';
import Swal from 'sweetalert2';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const handleRegister = async (data, setFieldErrors) => {
    try {
      await registerUser(data);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'You can now log in with your new account.',
        timer: 3000,
        showConfirmButton: false,
      });
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData) {
        if (errorData.detail) {
          setServerError(errorData.detail);
        } else {
          setFieldErrors(errorData);
        }
      } else {
        setServerError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <AuthForm variant="register" onSubmit={handleRegister} serverError={serverError} />
    </div>
  );
}
