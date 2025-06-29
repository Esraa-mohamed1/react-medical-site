import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../services/api';
import Swal from 'sweetalert2';
import ChatWithDoctor from '../components/ChatWithDoctor';

export default function LoginPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const handleLogin = async (data, setFieldErrors) => {
    setServerError('');
    try {
      const result = await loginUser(data);

      if (result.is_blocked) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Your account is blocked. Please contact support.',
        });
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome back!',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        localStorage.setItem('access', result.access);
        localStorage.setItem('refresh', result.refresh);
        
        const userRole = result.role;
        let loggedUser = { role: userRole, username: result.username };

        if (userRole === 'doctor' && result.user.doctor_id) {
          loggedUser = { ...loggedUser, ...result.user, id: result.user.doctor_id };
        } else if (userRole === 'patient' && result.user.patient_id) {
          loggedUser = { ...loggedUser, ...result.user, id: result.user.patient_id };
        }
        
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        navigate('/');
      });

    } catch (error) {
      console.error('Login failed:', error);
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
      <AuthForm variant="login" onSubmit={handleLogin} serverError={serverError} />
    </div>
  );
}