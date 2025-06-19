import React, { useState } from 'react';
import '../styles/auth.css';

export default function AuthForm({ variant = 'login', onSubmit, serverError }) {
  const isLogin = variant === 'login';

  const [formData, setFormData] = useState({
    name: '', // username or email for login, username for register
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
    onSubmit(formData, setErrors);
  };

  // Google login handler (updated to correct backend endpoint)
  const handleGoogleLogin = () => {
    window.location.href = 'http://127.0.0.1:8000/api/users/social/login/google-oauth2/';
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
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        {!isLogin && (
          <>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>
        )}
        {serverError && (
          <div className="invalid-feedback" style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}>{serverError}</div>
        )}
        <button type="submit" className="btn btn-light w-100 mb-2">
          {isLogin ? 'Log in' : 'Register'}
        </button>
        {isLogin && (
          <button
            type="button"
            className="btn btn-light w-100 mb-2"
            onClick={handleGoogleLogin}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', borderRadius: '50%', width: 48, height: 48, margin: '0 auto 1rem auto', padding: 0 }}
            title="Log in with Google"
          >
            <img src="/images/google-logo.png" alt="Google" style={{ width: 28, height: 28 }} />
          </button>
        )}
        <p className="auth-switch text-center">
          {isLogin ? (
            <>New to MHS? <a href="/register">Create an account</a></>
          ) : (
            <>Already have an account? <a href="/login">Log in</a></>
          )}
        </p>
      </form>
    </div>
  );
}
