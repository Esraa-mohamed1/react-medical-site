import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // ✅ Add this
import './DoctorRegister.css';

const DoctorRegister = () => {
    const navigate = useNavigate(); // ✅ Hook for navigation
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
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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
    if (formData.password !== formData.confirmPassword) {
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
}

 finally {
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

        
        <form onSubmit={handleSubmit} className="doctor-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name*</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name*</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="specialization">Specialization*</label>
            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className={errors.specialization ? 'error' : ''}
            >
              <option value="">Select specialization</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Neurology">Neurology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Other">Other</option>
            </select>
            {errors.specialization && <span className="error-message">{errors.specialization}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="licenseNumber">License Number*</label>
              <input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                className={errors.licenseNumber ? 'error' : ''}
              />
              {errors.licenseNumber && <span className="error-message">{errors.licenseNumber}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="yearsOfExperience">Years of Experience</label>
              <input
                type="number"
                id="yearsOfExperience"
                name="yearsOfExperience"
                min="0"
                max="50"
                value={formData.yearsOfExperience}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password*</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="clinicAddress">Clinic Address</label>
            <input
              type="text"
              id="clinicAddress"
              name="clinicAddress"
              value={formData.clinicAddress}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Professional Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-footer">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
            <p className="disclaimer">
              By registering, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegister;