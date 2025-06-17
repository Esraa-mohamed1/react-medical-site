import React, { useState } from 'react';
import '../styles/auth.css';

export default function AuthForm({ variant = 'login', onSubmit }) {
  const isLogin = variant === 'login';

  const [formData, setFormData] = useState({
    name: '',
    full_name: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient', // Add default role
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = 'Username is required';

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

    // Extra: prevent empty username/email/password
    if (!isLogin && (!formData.name || !formData.full_name || !formData.email || !formData.password)) {
      setErrors({
        ...newErrors,
        name: !formData.name ? 'Username is required' : undefined,
        full_name: !formData.full_name ? 'Fullname is required' : undefined,
        email: !formData.email ? 'Email is required' : undefined,
        password: !formData.password ? 'Password is required' : undefined,
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h2 className="auth-title">{isLogin ? 'Log in' : 'Create account'}</h2>

        {isLogin && (
          <div className="mb-3">
            <select
              name="role"
              className="form-select form-control"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="patient">Login as Patient</option>
              <option value="doctor">Login as Doctor</option>
            </select>
          </div>
        )}

        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Username"
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
                type="text"
                name="full_name"
                placeholder="Fullname"
                className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
                value={formData.full_name}
                onChange={handleChange}
              />
              {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="address"
                placeholder="Address"
                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <div className="invalid-feedback">{errors.address}</div>}
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

        <button type="submit" className="btn btn-light w-100 mb-2">
          {isLogin ? 'Log in' : 'Register'}
        </button>

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
