import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomNavbar from '../../../components/Navbar';

const AvailabilityPage = () => {
  const [availableDates, setAvailableDates] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    start_time: '',
    end_time: '',
    max_appointments: 1
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('loggedUser'));
    const token = localStorage.getItem('access');
    
    if (!userData || userData.role !== 'doctor' || !token) {
      toast.error('Only doctors can manage availability');
      navigate('/login');
      return;
    }
    
    fetchAvailableDates(token);
  }, [navigate]);

  const fetchAvailableDates = async (token) => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/api/medical/availability/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAvailableDates(response.data);
    } catch (error) {
      console.error('Error fetching availability:', error);
      toast.error('Failed to load availability dates');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.date || !formData.start_time || !formData.end_time) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.end_time <= formData.start_time) {
      toast.error('End time must be after start time');
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('access');
      
      if (editingId) {
        // Update existing availability
        await axios.put(
          `http://127.0.0.1:8000/api/medical/availability/${editingId}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        toast.success('Availability updated successfully');
      } else {
        // Create new availability
        await axios.post(
          'http://127.0.0.1:8000/api/medical/availability/',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        toast.success('Availability date added successfully');
      }
      
      // Reset form and refresh data
      setFormData({
        date: '',
        start_time: '',
        end_time: '',
        max_appointments: 1
      });
      setEditingId(null);
      fetchAvailableDates(token);
    } catch (error) {
      console.error('Error saving availability:', error);
      toast.error(error.response?.data?.detail || 'Failed to save availability');
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
      max_appointments: availability.max_appointments || 1
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this availability date?')) {
      return;
    }

    try {
      const token = localStorage.getItem('access');
      await axios.delete(`http://127.0.0.1:8000/api/medical/availability/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Availability date deleted successfully');
      fetchAvailableDates(token);
    } catch (error) {
      console.error('Error deleting availability:', error);
      toast.error('Failed to delete availability date');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      date: '',
      start_time: '',
      end_time: '',
      max_appointments: 1
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-vh-100 bg-light">
        <CustomNavbar />
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
          <div className="spinner-border " style={{width: '3rem', height: '3rem', color: '#2A5C5F'}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <CustomNavbar />
      <div className="container py-5">
        <ToastContainer />
        
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h1 className="mb-4 text-center">Manage Available Dates</h1>
            <p className="text-muted text-center mb-4">
              Set your available dates and times for patient appointments
            </p>

            {/* Add/Edit Form */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">
                  {editingId ? 'Edit Available Date' : 'Add New Available Date'}
                </h5>
                
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Date *</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    
                    <div className="col-md-3">
                      <label className="form-label">Start Time *</label>
                      <input
                        type="time"
                        className="form-control"
                        value={formData.start_time}
                        onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="col-md-3">
                      <label className="form-label">End Time *</label>
                      <input
                        type="time"
                        className="form-control"
                        value={formData.end_time}
                        onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Max Appointments</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.max_appointments}
                        onChange={(e) => setFormData({...formData, max_appointments: parseInt(e.target.value)})}
                        min="1"
                        max="20"
                      />
                      <div className="form-text">Maximum number of appointments for this time slot</div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <button 
                      type="submit" 
                      className="btn btn-primary me-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Saving...' : (editingId ? 'Update' : 'Add Date')}
                    </button>
                    {editingId && (
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Available Dates List */}
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Your Available Dates</h5>
                
                {availableDates.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted">No available dates set yet.</p>
                    <p className="text-muted">Add your first available date above to start accepting appointments.</p>
                  </div>
                ) : (
                  <div className="row g-3">
                    {availableDates.map((availability) => (
                      <div key={availability.id} className="col-md-6">
                        <div className="card border">
                          <div className="card-body">
                            <h6 className="card-title   ">
                              {formatDate(availability.date)}
                            </h6>
                            <p className="card-text mb-2">
                              <strong>Time:</strong> {availability.start_time} - {availability.end_time}
                            </p>
                            <p className="card-text mb-3">
                              <strong>Max Appointments:</strong> {availability.max_appointments}
                            </p>
                            <div className="d-flex gap-2">
                              <button 
                                onClick={() => handleEdit(availability)}
                                className="btn btn-sm btn-outline-primary"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDelete(availability.id)}
                                className="btn btn-sm btn-outline-danger"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityPage;