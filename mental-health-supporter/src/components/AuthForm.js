import React, { useState } from 'react';
import '../styles/auth.css';

export default function AuthForm({ variant = 'login', onSubmit, serverError }) {
  const isLogin = variant === 'login';

  const [formData, setFormData] = useState({
    name: '', // username or email for login, username for register
    full_name: '', // <-- add full_name for registration
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = isLogin ? 'Username or email is required' : 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!isLogin) {
      if (!formData.full_name) newErrors.full_name = 'Full name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = 'Passwords do not match';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // عند تسجيل الدخول، أرسل username بدل name
    const submitData = isLogin
      ? { username: formData.name, password: formData.password }
      : { ...formData, full_name: formData.full_name };
    onSubmit(submitData, (apiErrors = {}) => {
      // Map backend errors to user-friendly messages
      const mappedErrors = { ...apiErrors };
      if (apiErrors.email && (apiErrors.email.toLowerCase().includes('exist') || apiErrors.email.toLowerCase().includes('already')) ) {
        mappedErrors.email = 'This email is already registered. Please use another email.';
      }
      if (apiErrors.name && (apiErrors.name.toLowerCase().includes('exist') || apiErrors.name.toLowerCase().includes('already')) ) {
        mappedErrors.name = 'This username is already taken. Please use another username.';
      }
      if (apiErrors.username && (apiErrors.username.toLowerCase().includes('exist') || apiErrors.username.toLowerCase().includes('already')) ) {
        mappedErrors.name = 'This username is already taken. Please use another username.';
      }
      if (apiErrors.full_name && apiErrors.full_name.toLowerCase().includes('required')) {
        mappedErrors.full_name = 'Full name is required.';
      }
      if (apiErrors.detail && apiErrors.detail.toLowerCase().includes('doctor registration failed')) {
        mappedErrors.email = 'This email or username is already used.';
      }
      setErrors(mappedErrors);
    });
  };

  // Google login handler (updated to correct backend endpoint)
  const handleGoogleLogin = () => {
    console.log('Google login button clicked!');
    
    try {
      // Use the correct backend URL for Google OAuth - this initiates the OAuth flow
      // Adding prompt=select_account to force account selection
      const googleAuthUrl = 'http://127.0.0.1:8000/social/login/google-oauth2/?prompt=select_account';
      console.log('Attempting to redirect to:', googleAuthUrl);
      
      // Simple redirect without checking backend first
      console.log('Redirecting to Google OAuth...');
      window.location.href = googleAuthUrl;
        
    } catch (error) {
      console.error('Google login error:', error);
      alert('Error during Google login: ' + error.message);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h2 className="auth-title">{isLogin ? 'Log in' : 'Create account'}</h2>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder={isLogin ? "Username or Email" : "Username"}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback" style={{ display: 'block', color: 'red' }}>{errors.name}</div>}
        </div>
        {!isLogin && (
          <>
            <div className="mb-3">
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
                value={formData.full_name}
                onChange={handleChange}
              />
              {errors.full_name && <div className="invalid-feedback" style={{ display: 'block', color: 'red' }}>{errors.full_name}</div>}
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback" style={{ display: 'block', color: 'red' }}>{errors.email}</div>}
            </div>
          </>
        )}
        <div className="mb-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="invalid-feedback" style={{ display: 'block', color: 'red' }}>{errors.password}</div>}
        </div>
        {!isLogin && (
          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback" style={{ display: 'block', color: 'red' }}>{errors.confirmPassword}</div>
            )}
          </div>
        )}
        {serverError && (
          <div className="invalid-feedback" style={{ display: 'block', textAlign: 'center', marginBottom: '1rem', color: 'red' }}>{serverError}</div>
        )}
        <button type="submit" className="btn btn-light w-100 mb-2">
          {isLogin ? 'Log in' : 'Register'}
        </button>
        {isLogin && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 12, 
            margin: '1rem 0',
            padding: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <button
              type="button"
              onClick={handleGoogleLogin}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #4285f4',
                background: '#ffffff',
                borderRadius: '8px',
                width: 50,
                height: 50,
                padding: 0,
                boxShadow: '0 2px 8px rgba(66, 133, 244, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(66, 133, 244, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(66, 133, 244, 0.2)';
              }}
              title="Log in with Google"
            >
              <img 
                src="/images/google-logo.png" 
                alt="Google" 
                style={{ width: 24, height: 24 }} 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.textContent = 'G';
                  e.target.parentElement.style.fontSize = '20px';
                  e.target.parentElement.style.fontWeight = 'bold';
                  e.target.parentElement.style.color = '#4285f4';
                }}
              />
            </button>
            <span style={{ 
              color: 'white', 
              fontWeight: 500, 
              fontSize: '0.9rem', 
              letterSpacing: 0.1, 
              whiteSpace: 'nowrap',
              opacity: 0.9
            }}>
              Continue with Google
            </span>
          </div>
        )}
        <p className="auth-switch text-center">
          {isLogin ? (
            <>New to MHS? <a href="/register-select">Create an account</a></>
          ) : (
            <>Already have an account? <a href="/login">Log in</a></>
          )}
        </p>
      </form>
    </div>
  );
}