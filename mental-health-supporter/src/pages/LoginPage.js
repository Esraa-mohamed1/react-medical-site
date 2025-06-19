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
      // result.user_role should come from backend if possible, fallback to data.role
      const userRole = result.role || result.user_role || data.role;
      if (!result.user_id) {
        setError('No account found for this username and role.');
        return;
      }
      if (userRole !== data.role) {
        setError(`No ${data.role} account found for this username. Please check your role selection.`);
        return;
      }
      localStorage.setItem('access', result.access);
      localStorage.setItem('refresh', result.refresh);
      localStorage.setItem('loggedUser', JSON.stringify({ ...data, id: result.user_id }));
      if (data['role'] === 'patient') {
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
