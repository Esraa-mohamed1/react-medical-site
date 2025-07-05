import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiCalendar, FiClock, FiPlus, FiEdit2, FiTrash2, FiDollarSign, FiCheck, FiX } from 'react-icons/fi';
import Swal from 'sweetalert2';
import DoctorSidebar from '../components/DoctorSidebar';
import '../../../features/doctors/style/style.css';

const AvailabilityPage = () => {
  const [availableDates, setAvailableDates] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    start_time: '',
    end_time: '',
    price: '',
    available: true
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('loggedUser'));
    const token = localStorage.getItem('access');
    
    if (!userData || userData.role !== 'doctor' || !token) {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'Only doctors can manage availability',
        confirmButtonColor: '#3085d6'
      }).then(() => navigate('/login'));
      return;
    }
    
    fetchAvailableDates(token);
  }, [navigate]);

  const fetchAvailableDates = async (token) => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://pearla.pythonanywhere.com/api/time_slots/available/my/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAvailableDates(response.data);
    } catch (error) {
      console.error('Error fetching availability:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load availability dates',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = (form) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const errors = [];

    if (!formData.date || formData.date < todayStr) {
      errors.push('Please select a valid date (today or future)');
    }

    if (!formData.start_time || !formData.end_time) {
      errors.push('Please select both start and end times');
    } else if (formData.start_time >= formData.end_time) {
      errors.push('End time must be after start time');
    }

    if (formData.date === todayStr) {
      const now = new Date();
      const [startHour, startMinute] = formData.start_time.split(':').map(Number);
      if (startHour < now.getHours() || 
          (startHour === now.getHours() && startMinute < now.getMinutes())) {
        errors.push('Start time cannot be in the past');
      }
    }

    if (formData.price && (isNaN(formData.price) || formData.price < 0)) {
      errors.push('Please enter a valid price (positive number)');
    }

    if (errors.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        html: errors.join('<br>'),
        confirmButtonColor: '#3085d6'
      });
      return false;
    }

    if (form.checkValidity() === false) {
      setValidated(true);
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setFormData({
      date: '',
      start_time: '',
      end_time: '',
      price: '',
      available: true
    });
    setEditingId(null);
    setShowForm(false);
    setValidated(false);
  };

  const handleCreateTimeSlot = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (!validateForm(form)) return;

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('access');
      const userData = JSON.parse(localStorage.getItem('loggedUser'));
      
      const payload = {
        date: formData.date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        price: formData.price || null,
        available: formData.available,
        doctor_id: userData.id
      };

      await axios.post(
        'https://pearla.pythonanywhere.com/api/time_slots/available/create/',
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Time slot created successfully.',
        confirmButtonColor: '#3085d6'
      });
      
      resetForm();
      fetchAvailableDates(token);
    } catch (error) {
      console.error('Error creating time slot:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.detail || 
             Object.values(error.response?.data || {}).flat().join('\n') || 
             'Failed to create time slot',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (availability) => {
    setEditingId(availability.id);
    setFormData({
      date: availability.date,
      start_time: availability.start_time,
      end_time: availability.end_time,
      price: availability.price || '',
      available: availability.available
    });
    setShowForm(true);
  };

  const handleUpdateTimeSlot = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (!validateForm(form)) return;

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('access');
      
      const payload = {
        date: formData.date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        price: formData.price || null,
        available: formData.available
      };

      await axios.patch(
        `https://pearla.pythonanywhere.com/api/time_slots/available/my/${editingId}/update/`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Time slot updated successfully.',
        confirmButtonColor: '#3085d6'
      });
      
      resetForm();
      fetchAvailableDates(token);
    } catch (error) {
      console.error('Error updating time slot:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.detail || 
             Object.values(error.response?.data || {}).flat().join('\n') || 
             'Failed to update time slot',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem('access');
      await axios.delete(
        `https://pearla.pythonanywhere.com/api/time_slots/available/my/${id}/delete/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Time slot deleted successfully.',
        confirmButtonColor: '#3085d6'
      });
      fetchAvailableDates(token);
    } catch (error) {
      console.error('Error deleting time slot:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.detail || 'Failed to delete time slot',
        confirmButtonColor: '#3085d6'
      });
    }
  };

  const toggleAvailability = async (id, currentAvailable) => {
    try {
      const token = localStorage.getItem('access');
      const newAvailableStatus = !currentAvailable;
      
      await axios.patch(
        `https://pearla.pythonanywhere.com/api/time_slots/available/${id}/set-available/`,
        { available: newAvailableStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        icon: 'success',
        title: 'Status Updated!',
        text: `Time slot is now ${newAvailableStatus ? 'available' : 'unavailable'}`,
        confirmButtonColor: '#3085d6'
      });

      fetchAvailableDates(token);
    } catch (error) {
      console.error('Error toggling availability:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.detail || 'Failed to update availability',
        confirmButtonColor: '#3085d6'
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatFullDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (available) => {
    return (
      <span className={`badge ${available ? 'bg-success' : 'bg-danger'} text-white`}>
        {available ? 'Available' : 'Unavailable'}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="doctor-dashboard-bg">
        <DoctorSidebar />
        <div className="doctor-dashboard-main enhanced-main-container">
          <div className="enhanced-main-card d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main enhanced-main-container">
        <div className="enhanced-main-card">
          <ToastContainer position="top-right" autoClose={5000} />
          
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">
                <FiCalendar className="me-2 text-primary" />Manage Your Schedule
              </h2>
              <p className="text-muted mb-0">Set your available dates and times for patient appointments</p>
            </div>
            <button 
              className="btn btn-primary d-flex align-items-center"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              <FiPlus className="me-2" />Add New Time Slot
            </button>
          </div>

          {showForm && (
            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-4">
                  {editingId ? 'Edit Time Slot' : 'Add New Time Slot'}
                </h5>
                <form 
                  onSubmit={editingId ? handleUpdateTimeSlot : handleCreateTimeSlot}
                  noValidate
                  className={validated ? 'was-validated' : ''}
                >
                  <div className="row g-3 mb-3">
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Date *</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        required
                      />
                      <div className="invalid-feedback">
                        Please select a valid date
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        <FiClock className="me-2 text-primary" />Start Time *
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        value={formData.start_time}
                        min={formData.date === new Date().toISOString().split('T')[0] ? 
                          new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(0,5) : undefined}
                        onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                        required
                      />
                      <div className="invalid-feedback">
                        Please select a start time
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">End Time *</label>
                      <input
                        type="time"
                        className="form-control"
                        value={formData.end_time}
                        min={formData.start_time}
                        onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                        required
                      />
                      <div className="invalid-feedback">
                        Please select an end time after start time
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        <FiDollarSign className="me-2 text-primary" />Price
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          className="form-control"
                          value={formData.price}
                          min="0"
                          step="0.01"
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          placeholder="0.00"
                        />
                      </div>
                      <div className="invalid-feedback">
                        Please enter a valid price (positive number)
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Availability</label>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          checked={formData.available}
                          onChange={(e) => setFormData({...formData, available: e.target.checked})}
                        />
                        <label className="form-check-label">
                          {formData.available ? 'Available' : 'Unavailable'}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-3 mt-3">
                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          {editingId ? 'Updating...' : 'Adding...'}
                        </>
                      ) : (
                        editingId ? 'Update Slot' : 'Add Slot'
                      )}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary" 
                      onClick={resetForm} 
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">
                <FiCalendar className="me-2 text-primary" />Your Available Time Slots
              </h5>
              
              {availableDates.length === 0 ? (
                <div className="text-center py-5">
                  <div className="mb-4">
                    <FiCalendar size={64} className="text-muted" />
                  </div>
                  <h5 className="text-muted mb-2">No time slots set yet</h5>
                  <p className="text-muted mb-4">Add your first time slot to start accepting patient appointments</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      resetForm();
                      setShowForm(true);
                    }}
                  >
                    <FiPlus className="me-2" />Add Your First Time Slot
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Price</th>
                       
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {availableDates.map((slot) => (
                        <tr key={slot.id}>
                          <td>
                            <div className="fw-semibold">{formatFullDate(slot.date)}</div>
                            <div className="text-muted small">{formatDate(slot.date)}</div>
                          </td>
                          <td>
                            {slot.start_time} - {slot.end_time}
                          </td>
                          <td>
                            {slot.price ? `$${parseFloat(slot.price).toFixed(2)}` : 'Not set'}
                          </td>
                        
                          <td>
                            <div className="d-flex gap-2">
                              <button 
                                onClick={() => handleEdit(slot)}
                                className="btn btn-sm btn-outline-primary"
                                title="Edit"
                              >
                                <FiEdit2 />
                              </button>
                              <button 
                                onClick={() => handleDelete(slot.id)}
                                className="btn btn-sm btn-outline-danger"
                                title="Delete"
                              >
                                <FiTrash2 />
                              </button>
                         
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityPage;