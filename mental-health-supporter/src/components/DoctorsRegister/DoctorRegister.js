import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom'; // Added Link import
import './DoctorRegister.css';

const DoctorRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    specialization: '',
    licenseNumber: '',
    yearsOfExperience: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    clinicAddress: '',
    bio: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: value 
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.specialization.trim()) newErrors.specialization = 'Specialization is required';
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Doctor Registered:', formData);
      
      setSuccessMessage('Doctor registered successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        specialization: '',
        licenseNumber: '',
        yearsOfExperience: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        clinicAddress: '',
        bio: ''
      });

      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Registration error:', error);
      setSuccessMessage('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="doctor-register-wrapper">
      <div className="doctor-register-container">
        <div className="form-header">
          <h2>Doctor Registration</h2>
          <p>Become part of our community of mental health supporters</p>
        </div>

        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="doctor-form" noValidate>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="specialization" className="form-label">Specialization</label>
            <input
              type="text"
              className={`form-control ${errors.specialization ? 'is-invalid' : ''}`}
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
            />
            {errors.specialization && <div className="invalid-feedback">{errors.specialization}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="licenseNumber" className="form-label">License Number</label>
            <input
              type="text"
              className={`form-control ${errors.licenseNumber ? 'is-invalid' : ''}`}
              id="licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
            />
            {errors.licenseNumber && <div className="invalid-feedback">{errors.licenseNumber}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="yearsOfExperience" className="form-label">Years of Experience</label>
            <input
              type="number"
              className="form-control"
              id="yearsOfExperience"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="text"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="clinicAddress" className="form-label">Clinic Address</label>
            <input
              type="text"
              className="form-control"
              id="clinicAddress"
              name="clinicAddress"
              value={formData.clinicAddress}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="bio" className="form-label">Bio</label>
            <textarea
              className="form-control"
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-footer">
            <button 
              type="submit" 
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
            
            {/* Added login link */}
            <p className="text-center mt-3">
              Already have an account?{' '}
              <Link to="/login" className="text-primary">
                Log in
              </Link>
            </p>
            
            <p className="disclaimer text-center">
              By registering, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegister;