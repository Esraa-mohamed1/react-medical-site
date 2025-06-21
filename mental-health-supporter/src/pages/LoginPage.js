import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../services/api';
import Swal from 'sweetalert2';

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (data) => {
    setError('');
    try {
      const result = await loginUser(data);
      localStorage.setItem('access', result.access);
      localStorage.setItem('refresh', result.refresh);
      localStorage.setItem('loggedUser', JSON.stringify({ ...data, id: result.user_id }));
      if (result['role'] === 'patient') {
        navigate('/patients-list/' + result.user_id);
      } else {
        navigate('/doctors-list/' + result.user_id)
      }
    } catch (error) {
      // Show SweetAlert2 for blocked login (pending/rejected)
      Swal.fire({
        icon: 'error',
        title: 'Login Blocked',
        text: error.message,
        confirmButtonText: 'OK',
      });
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