import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { handleGoogleLoginSuccess, handleGoogleLoginError } from '../services/user-management/GoogleOAuthService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      console.log('Google login success:', credentialResponse);
      
      // Show loading state
      Swal.fire({
        title: 'Logging in...',
        text: 'Please wait while we complete your login.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Exchange the credential for JWT tokens
      const result = await handleGoogleLoginSuccess(credentialResponse);

      if (result.success) {
        // Close loading dialog
        Swal.close();

        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome back!',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          // Call the onSuccess callback if provided
          if (onSuccess) {
            onSuccess(result.data);
          } else {
            // Default redirect to home page
            navigate('/', { replace: true });
          }
        });
      } else {
        // Close loading dialog and show error
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: result.error || 'Unable to complete Google login. Please try again.',
          confirmButtonText: 'OK'
        });

        if (onError) {
          onError(result.error);
        }
      }
    } catch (error) {
      console.error('Google login error:', error);
      
      // Close loading dialog and show error
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'An unexpected error occurred. Please try again.',
        confirmButtonText: 'OK'
      });

      if (onError) {
        onError(error.message);
      }
    }
  };

  const handleError = (error) => {
    console.error('Google login error:', error);
    
    const errorMessage = handleGoogleLoginError(error).error;
    
    Swal.fire({
      icon: 'error',
      title: 'Google Login Failed',
      text: errorMessage,
      confirmButtonText: 'OK'
    });

    if (onError) {
      onError(errorMessage);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: 12, 
      margin: '1rem 0',
      padding: '1rem',
      borderTop: '1px solid rgba(255,255,255,0.1)'
    }}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap={false}
        theme="filled_white"
        size="large"
        type="standard"
        shape="rectangular"
        text="continue_with"
        logo_alignment="left"
        width="300"
      />
    </div>
  );
};

export default GoogleLoginButton; 