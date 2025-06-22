import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import { registerDoctor } from '../../../services/api'; // Assuming an API function
import Swal from 'sweetalert2';
import './DoctorRegister.css';

const DoctorRegister = () => {
  const navigate = useNavigate();
  const initialFormState = {
    username: '',
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    license_number: '',
    years_of_experience: '',
    address: '',
    bio: '',
  };
  const [formData, setFormData] = useState(initialFormState);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';
    if (!formData.specialization.trim()) newErrors.specialization = 'Specialization is required';
    if (!formData.license_number.trim()) newErrors.license_number = 'License number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({});

    try {
      const doctorData = { ...formData };
      delete doctorData.confirmPassword; // Don't send confirmPassword to backend

      await registerDoctor(doctorData);
      
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Your registration is complete. You will now be redirected to the login page.',
        timer: 2500,
        showConfirmButton: false,
      });

      setFormData(initialFormState); // Clear form on success

      setTimeout(() => navigate('/login'), 2500);
    } catch (error) {
      const newErrors = {};
      if (error.response && error.response.data && typeof error.response.data === 'object') {
        const errorData = error.response.data;
        for (const [field, messages] of Object.entries(errorData)) {
          newErrors[field] = Array.isArray(messages) ? messages.join(' ') : String(messages);
        }
      } else {
        newErrors.non_field_errors = 
          error.response?.data?.detail || error.message || 'An unexpected error occurred. Please try again.';
      }
      setErrors(newErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dr-container">
      <div className="dr-card">
        <div className="dr-header">
          <h2>Doctor Registration</h2>
          <p>Join our network of trusted mental health professionals.</p>
        </div>

        {errors.non_field_errors && (
          <div className="alert alert-danger" role="alert">{errors.non_field_errors}</div>
        )}
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
              {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="full_name">Full Name</label>
              <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} className={`form-control ${errors.full_name ? 'is-invalid' : ''}`} />
              {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="phone">Phone</label>
              <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>
          </div>

          <hr className="form-divider" />

          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="specialization">Specialization</label>
              <input type="text" id="specialization" name="specialization" value={formData.specialization} onChange={handleChange} className={`form-control ${errors.specialization ? 'is-invalid' : ''}`} />
              {errors.specialization && <div className="invalid-feedback">{errors.specialization}</div>}
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="license_number">License Number</label>
              <input type="text" id="license_number" name="license_number" value={formData.license_number} onChange={handleChange} className={`form-control ${errors.license_number ? 'is-invalid' : ''}`} />
              {errors.license_number && <div className="invalid-feedback">{errors.license_number}</div>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="years_of_experience">Years of Experience</label>
            <input type="number" id="years_of_experience" name="years_of_experience" value={formData.years_of_experience} onChange={handleChange} className="form-control" min="0" />
          </div>

          <div className="form-group">
            <label htmlFor="address">Clinic Address</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="form-control" />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Biography</label>
            <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} className="form-control" rows="4"></textarea>
          </div>

          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Register'}
          </button>

          <p className="dr-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegister;