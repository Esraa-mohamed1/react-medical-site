import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomNavbar from '../../../components/Navbar';
import { FiCalendar, FiClock, FiUsers, FiPlus, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

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
  const [showForm, setShowForm] = useState(false);
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
      const response = await axios.get('http://127.0.0.1:8000/api/medical/time-slots/available/', {
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
        await axios.put(
          `http://127.0.0.1:8000/api/medical/time-slots/available/${editingId}/update/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        toast.success('Time slot updated successfully');
      } else {
        await axios.post(
          'http://127.0.0.1:8000/api/medical/time-slots/available/create/',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        toast.success('Time slot added successfully');
      }
      
      resetForm();
      fetchAvailableDates(token);
    } catch (error) {
      console.error('Error saving time slot:', error);
      toast.error(error.response?.data?.detail || 'Failed to save time slot');
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
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this time slot?')) {
      return;
    }

    try {
      const token = localStorage.getItem('access');
      await axios.delete(`http://127.0.0.1:8000/api/medical/time-slots/available/${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Time slot deleted successfully');
      fetchAvailableDates(token);
    } catch (error) {
      console.error('Error deleting time slot:', error);
      toast.error('Failed to delete time slot');
    }
  };

  const resetForm = () => {
    setFormData({
      date: '',
      start_time: '',
      end_time: '',
      max_appointments: 1
    });
    setEditingId(null);
    setShowForm(false);
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

  const getStatusColor = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return 'text-muted';
    if (date.getTime() === today.getTime()) return 'text-success';
    return 'text-primary';
  };

  if (isLoading) {
    return (
      <div className="min-vh-100 bg-light">
        <CustomNavbar />
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
          <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
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
        
        {/* Header Section */}
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h1 className="fw-bold text-dark mb-2">
              <FiCalendar className="me-2 text-primary" />Manage Your Time Slots
            </h1>
            <p className="text-muted">Set your available dates and times for patient appointments</p>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => setShowForm(true)}
              >
                <FiPlus className="me-2" />Add New Time Slot
              </button>
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8">
              <div className="card shadow-sm border-0 rounded-3">
                <div className="card-body">
                  <h5 className="fw-bold text-dark mb-3">{editingId ? 'Edit Time Slot' : 'Add New Time Slot'}</h5>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-3">
                      <div className="col-md-3">
                        <label className="form-label fw-semibold">Date *</label>
                        <input
                          type="date"
                          className="form-control form-control-lg"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label fw-semibold"><FiClock className="me-2 text-primary" />Start Time *</label>
                        <input
                          type="time"
                          className="form-control form-control-lg"
                          value={formData.start_time}
                          onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label fw-semibold"><FiClock className="me-2 text-primary" />End Time *</label>
                        <input
                          type="time"
                          className="form-control form-control-lg"
                          value={formData.end_time}
                          onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label fw-semibold"><FiUsers className="me-2 text-primary" />Max Appointments</label>
                        <input
                          type="number"
                          className="form-control form-control-lg"
                          value={formData.max_appointments}
                          onChange={(e) => setFormData({...formData, max_appointments: parseInt(e.target.value)})}
                          min="1"
                          max="20"
                        />
                        <div className="form-text">Maximum number of appointments for this time slot</div>
                      </div>
                    </div>
                    <div className="d-flex gap-3 mt-3">
                      <button type="submit" className="btn btn-primary px-4" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : (editingId ? 'Update Slot' : 'Add Slot')}
                      </button>
                      <button type="button" className="btn btn-outline-secondary px-4" onClick={resetForm} disabled={isSubmitting}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Time Slots Table */}
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-white border-bottom">
                <h4 className="mb-0 text-dark">
                  <FiCalendar className="me-2 text-primary" />Your Available Time Slots
                </h4>
              </div>
              <div className="card-body p-0">
                {availableDates.length === 0 ? (
                  <div className="text-center py-5">
                    <div className="mb-4">
                      <FiCalendar size={64} className="text-muted" />
                    </div>
                    <h5 className="text-muted mb-2">No time slots set yet</h5>
                    <p className="text-muted mb-4">Add your first time slot to start accepting patient appointments</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowForm(true)}
                    >
                      <FiPlus className="me-2" />Add Your First Time Slot
                    </button>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="border-0 ps-4">Date</th>
                          <th className="border-0">Time Slot</th>
                          <th className="border-0">Max Appointments</th>
                          <th className="border-0 text-end pe-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {availableDates.map((availability) => (
                          <tr key={availability.id} className="border-bottom">
                            <td className="ps-4">
                              <div className="d-flex align-items-center">
                                <div className={`fw-semibold ${getStatusColor(availability.date)}`}>{formatFullDate(availability.date)}</div>
                                <span className="badge bg-light text-dark ms-2">{formatDate(availability.date)}</span>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <FiClock className="text-primary me-2" />
                                <span className="fw-medium">{availability.start_time} - {availability.end_time}</span>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <FiUsers className="text-primary me-2" />
                                <span className="fw-medium">{availability.max_appointments}</span>
                              </div>
                            </td>
                            <td className="text-end pe-4">
                              <div className="btn-group" role="group">
                                <button 
                                  onClick={() => handleEdit(availability)}
                                  className="btn btn-outline-primary btn-sm"
                                  title="Edit"
                                >
                                  <FiEdit2 />
                                </button>
                                <button 
                                  onClick={() => handleDelete(availability.id)}
                                  className="btn btn-outline-danger btn-sm"
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
    </div>
  );
};

export default AvailabilityPage;