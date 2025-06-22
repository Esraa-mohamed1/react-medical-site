import React, { useState } from 'react';
import '../styles/auth.css';
import GoogleLoginButton from './GoogleLoginButton';

export default function AuthForm({ variant = 'login', onSubmit, serverError }) {
  const isLogin = variant === 'login';

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
    phone: '',
    address: '',
    city: '',
    profile_url: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = { ...formData };
    
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

  const handleGoogleSuccess = (userData) => {
    // This will be handled by the GoogleLoginButton component
    // The user will be redirected to the home page
  };

  const handleGoogleError = (error) => {
    console.error('Google login error:', error);
    // Error is already handled by the GoogleLoginButton component
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>
      
      {serverError && (
        <div className="alert alert-danger">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              className={errors.full_name ? 'is-invalid' : ''}
            />
            {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
          </>
        )}

        <input
          type="text"
          name="username"
          placeholder={isLogin ? "Username or Email" : "Username"}
          value={formData.username}
          onChange={handleChange}
          className={errors.username ? 'is-invalid' : ''}
        />
        {errors.username && <div className="invalid-feedback">{errors.username}</div>}

        {!isLogin && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'is-invalid' : ''}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'is-invalid' : ''}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? 'is-invalid' : ''}
            />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className={errors.city ? 'is-invalid' : ''}
            />
            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
          </>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'is-invalid' : ''}
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}

        <button type="submit" className="auth-btn">
          {isLogin ? 'Log In' : 'Create Account'}
        </button>

        {isLogin && (
          <GoogleLoginButton 
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
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