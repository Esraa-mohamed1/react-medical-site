import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../services/api';
import Swal from 'sweetalert2';

export default function LoginPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const handleLogin = async (data, setFieldErrors) => {
    setServerError('');
    try {
      const result = await loginUser(data);
      localStorage.setItem('access', result.access);
      localStorage.setItem('refresh', result.refresh);
      localStorage.setItem('loggedUser', JSON.stringify({ ...data, id: result.user_id }));
      // Redirect based on backend role
      if (result.role === 'patient') {
        navigate('/patients-list/' + result.user_id);
      } else if (result.role === 'doctor') {
        navigate('/doctors-list/' + result.user_id);
      } else {
        navigate('/artical');
      }
    } catch (error) {
      // Show SweetAlert2 for blocked login (pending/rejected)
      if (error.message && (error.message.includes('pending') || error.message.includes('rejected'))) {
        Swal.fire({
          icon: 'error',
          title: 'Login Blocked',
          text: error.message,
          confirmButtonText: 'OK',
        });
      }
      // Show error under username/email field if possible
      if (error.message && error.message.toLowerCase().includes('username')) {
        setFieldErrors({ email: error.message });
      } else {
        setServerError(error.message);
      }
    }
  };

  return (
    <div>
      <AuthForm variant="login" onSubmit={handleLogin} serverError={serverError} />
    </div>
  );
}
