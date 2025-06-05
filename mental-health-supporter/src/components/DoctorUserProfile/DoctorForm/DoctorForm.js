import React, { useState } from 'react';
import './DoctorForm.css';

const DoctorForm = ({ doctor, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(doctor);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="doctor-form-container">
      <form onSubmit={handleSubmit} className="doctor-form">
        <h2 className="form-title">
          <i className="fas fa-user-md"></i> Edit Doctor Profile
        </h2>
        
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Specialization</label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Orthopedics">Orthopedics</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Contact Number</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">License Number</label>
            <input
              type="text"
              name="license"
              value={formData.license || ''}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-button"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Saving...
              </>
            ) : (
              <>
                <i className="fas fa-save"></i> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorForm;