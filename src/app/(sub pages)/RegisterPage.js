import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = (data) => {
    console.log('Register data:', data);
    navigate('/artical');
  };

  return <AuthForm variant="register" onSubmit={handleRegister} />;
}
