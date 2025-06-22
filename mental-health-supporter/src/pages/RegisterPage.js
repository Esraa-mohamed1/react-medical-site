import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { registerUser } from '../services/api';
import Swal from 'sweetalert2';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState({});

  const handleRegister = async (data) => {
    setServerErrors({});

    try {
      await registerUser(data);
      
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: `A verification email has been sent to ${data.email}. Please check your inbox.`,
        timer: 3000,
        showConfirmButton: false,
      });

      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      const newErrors = {};

      // Check if the server response contains structured error data.
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        // Ideal case: The backend returns a JSON object with field-specific errors.
        if (typeof errorData === 'object' && errorData !== null) {
          Object.keys(errorData).forEach((key) => {
            const message = Array.isArray(errorData[key])
              ? errorData[key].join(' ')
              : String(errorData[key]);
            newErrors[key] = message;
          });
        }
        // Case: The error data is a simple string.
        else if (typeof errorData === 'string') {
          newErrors.non_field_errors = errorData;
        }
      }

      // Fallback for network errors or unhandled server error structures.
      if (Object.keys(newErrors).length === 0) {
        newErrors.non_field_errors = 'Registration failed. Please check your details and try again.';
      }
      
      setServerErrors(newErrors);
    }
  };

  return <AuthForm variant="register" onSubmit={handleRegister} serverErrors={serverErrors} />;
}
