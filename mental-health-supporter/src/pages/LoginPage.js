import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (data) => {
    setError('');
    try {
      const result = await loginUser(data);
      console.log('Login data:', data);
      console.log('Login result:', result);
      localStorage.setItem('access', result.access);
      localStorage.setItem('refresh', result.refresh);
      localStorage.setItem('loggedUser', JSON.stringify({ ...data, id: result.user_id }));
      navigate('/artical');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {error && (
        <div className="alert alert-danger text-center" role="alert" style={{ maxWidth: 400, margin: '1rem auto' }}>
          {error}
        </div>
      )}
      <AuthForm variant="login" onSubmit={handleLogin} />
    </div>
  );
}