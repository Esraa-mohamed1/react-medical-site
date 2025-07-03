import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../services/api';
import Swal from 'sweetalert2';
import ChatWithDoctor from '../components/ChatWithDoctor';

export default function LoginPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

useEffect(() => {
  const access = localStorage.getItem('access');
  const loggedUser = localStorage.getItem('loggedUser');
  if (access && loggedUser) {
    try {
      const user = JSON.parse(loggedUser);
      if (user && user.id && user.role) {
        navigate('/');
      }
    } catch (e) {
      // Invalid user, do nothing
    }
  }
}, [navigate]);

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

      if (result.role === 'doctor' && result.user && result.user.approval_status !== 'approved') {
        Swal.fire({
          icon: 'info',
          title: 'Account Not Approved',
          text: 'Admin must approve your account before you can log in.',
          confirmButtonText: 'OK',
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
        // Show all error messages in a SweetAlert
        if (errorData.error === 'Invalid credentials') {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: "User doesn't exist.",
          });
          setServerError("User doesn't exist.");
        } else if (errorData.detail) {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: errorData.detail,
          });
          setServerError(errorData.detail);
        } else if (typeof errorData === 'object' && errorData !== null) {
          // Collect all field errors into a single string
          const messages = Object.entries(errorData)
            .map(([field, msgs]) => Array.isArray(msgs) ? `${field}: ${msgs.join(', ')}` : `${field}: ${msgs}`)
            .join('\n');
          Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: messages,
          });
          setFieldErrors(errorData);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid credentials',
          });
          setServerError('Invalid credentials');
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'An unexpected error occurred. Please try again.',
        });
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