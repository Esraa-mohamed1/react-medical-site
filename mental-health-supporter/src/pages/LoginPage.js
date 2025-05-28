import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log('Login data:', data);
    navigate('/artical');
  };

  return <AuthForm variant="login" onSubmit={handleLogin} />;
}
