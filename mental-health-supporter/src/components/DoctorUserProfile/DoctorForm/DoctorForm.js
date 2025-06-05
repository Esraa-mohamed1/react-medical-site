import React, { useState } from 'react';
import './DoctorForm.css';

const DoctorForm = ({ doctor, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(doctor);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.split(',').map(item => item.trim())
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setAlert({
        show: true,
        message: 'Doctor profile updated successfully!',
        variant: 'success'
      });
    } catch (error) {
      setAlert({
        show: true,
        message: 'Failed to update doctor profile. Please try again.',
        variant: 'danger'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="doctor-form-container">
      {alert.show && (
        <div className={`alert alert-${alert.variant} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setAlert({...alert, show: false})}
          ></button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="doctor-form">
        <h2 className="form-title">
          <i className="fas fa-user-md me-2"></i> Edit Doctor Profile
        </h2>
        
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Specialty</label>
            <select
              name="specialty"
              value={formData.specialty || ''}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select Specialty</option>
              <option value="General Surgeon">General Surgeon</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Dermatology">Dermatology</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Consultation Fee</label>
            <input
              type="text"
              name="fee"
              value={formData.fee || ''}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              value={formData.city || ''}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Area</label>
            <input
              type="text"
              name="area"
              value={formData.area || ''}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Insurance Companies (comma separated)</label>
            <input
              type="text"
              name="insurance"
              value={formData.insurance?.join(', ') || ''}
              onChange={handleArrayChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
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
        
        <div className="form-actions mt-4">
          <button 
            type="button" 
            className="btn btn-outline-secondary cancel-button me-3"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            <i className="fas fa-times me-2"></i> Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin me-2"></i> Saving...
              </>
            ) : (
              <>
                <i className="fas fa-save me-2"></i> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorForm;