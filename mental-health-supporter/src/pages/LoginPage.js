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
      // SweetAlert2 for blocked login (pending/rejected)
      if (error.message && (error.message.includes('pending') || error.message.includes('rejected'))) {
        Swal.fire({
          icon: 'error',
          title: 'Login Blocked',
          text: error.message,
          confirmButtonText: 'OK',
        });
      }
      // Field-specific error handling
      if (error.response && error.response.data) {
        const data = error.response.data;
        let fieldErrors = {};
        if (data.error && data.error.toLowerCase().includes('invalid')) {
          // Always show under both fields for clarity
          fieldErrors.name = 'Invalid username or email or password.';
          fieldErrors.password = 'Invalid username or email or password.';
        } else if (data.username) {
          fieldErrors.name = data.username[0] || 'Invalid username.';
        } else if (data.email) {
          fieldErrors.name = data.email[0] || 'Invalid email.';
        } else if (data.password) {
          fieldErrors.password = data.password[0] || 'Invalid password.';
        } else if (data.error) {
          setServerError(data.error);
          return;
        }
        if (Object.keys(fieldErrors).length > 0) {
          setFieldErrors(fieldErrors);
        } else {
          setServerError(error.message);
        }
      } else if (error.message && error.message.toLowerCase().includes('username')) {
        setFieldErrors({ name: error.message });
      } else if (error.message && error.message.toLowerCase().includes('email')) {
        setFieldErrors({ name: error.message });
      } else if (error.message && error.message.toLowerCase().includes('password')) {
        setFieldErrors({ password: error.message });
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
