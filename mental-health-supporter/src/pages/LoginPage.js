import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../services/api';
import Swal from 'sweetalert2';

export default function LoginPage() {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState({});

  const handleLogin = async (data) => {
    setServerErrors({});

    const isEmail = /\S+@\S+\.\S+/.test(data.loginIdentifier);
    const payload = {
      password: data.password,
    };
    if (isEmail) {
      payload.email = data.loginIdentifier;
    } else {
      payload.username = data.loginIdentifier;
    }

    try {
      const result = await loginUser(payload);
      localStorage.setItem('access', result.access);
      localStorage.setItem('refresh', result.refresh);
      localStorage.setItem('loggedUser', JSON.stringify({ ...result.user, id: result.user.id, role: result.role }));
      
      if (result.role === 'patient') {
        navigate('/patients-list/' + result.user.id);
      } else {
        navigate('/doctors-list/' + result.user.id);
      }
    } catch (error) {
      const newErrors = {};
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        const errorMessage = 
          errorData.detail || 
          errorData.username || 
          errorData.email || 
          'Invalid credentials. Please try again.';
          
        newErrors.loginIdentifier = errorMessage;
        
        if (errorData.password) {
          newErrors.password = errorData.password;
        }
      } else {
        newErrors.non_field_errors = 'An unexpected error occurred. Please try again.';
      }
      setServerErrors(newErrors);
    }
  };

  return <AuthForm variant="login" onSubmit={handleLogin} serverErrors={serverErrors} />;
}