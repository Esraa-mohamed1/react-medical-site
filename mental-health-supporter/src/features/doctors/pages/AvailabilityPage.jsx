import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomNavbar from '../../../components/Navbar';
import { FiCalendar, FiClock, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';

const AvailabilityPage = () => {
  const [availableDates, setAvailableDates] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    time: ''
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
      // Fetch only the slots created by the logged-in doctor
      const response = await axios.get('http://localhost:8000/api/time_slots/available/my/', {
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

    // Prevent previous date
    const todayStr = new Date().toISOString().split('T')[0];
    if (!formData.date || formData.date < todayStr) {
      toast.error('Please select a valid date (today or future)');
      return;
    }
    // Prevent previous time if today
    if (formData.date === todayStr) {
      const now = new Date();
      const [inputHour, inputMinute] = formData.time.split(':').map(Number);
      if (
        inputHour < now.getHours() ||
        (inputHour === now.getHours() && inputMinute < now.getMinutes())
      ) {
        toast.error('Please select a valid time (not in the past)');
        return;
      }
    }
    // Prevent duplicate slot (same date and time)
    const isDuplicate = availableDates.some(slot => slot.date === formData.date && slot.time === formData.time && slot.id !== editingId);
    if (isDuplicate) {
      Swal.fire({
        icon: 'warning',
        title: 'Duplicate Slot',
        text: 'A slot with this date and time already exists.'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('access');

      if (editingId) {
        await axios.put(
          `http://localhost:8000/api/time_slots/available/my/${editingId}/update/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Time slot updated successfully.'
        });
      } else {
        await axios.post(
          'http://localhost:8000/api/medical/time-slots/available/create/',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: 'Time slot added successfully.'
        });
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
      time: availability.time
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this time slot?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      try {
        const token = localStorage.getItem('access');
        await axios.delete(`http://localhost:8000/api/time_slots/available/my/${id}/delete/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Time slot deleted successfully.'
        });
        fetchAvailableDates(token);
      } catch (error) {
        console.error('Error deleting time slot:', error);
        toast.error(error.response?.data?.detail || 'Failed to delete time slot');
      }
    });
  };

  const resetForm = () => {
    setFormData({
      date: '',
      time: ''
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
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Date *</label>
                        <input
                          type="date"
                          className="form-control form-control-lg"
                          value={formData.date}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold"><FiClock className="me-2 text-primary" />Time *</label>
                        <input
                          type="time"
                          className="form-control form-control-lg"
                          value={formData.time}
                          min={formData.date === new Date().toISOString().split('T')[0] ? new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(0,5) : undefined}
                          onChange={(e) => setFormData({...formData, time: e.target.value})}
                          required
                        />
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
                  <>
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th className="border-0 ps-4">Date</th>
                            <th className="border-0">Time Slot</th>
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
                                  <span className="fw-medium">{availability.time}</span>
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
                    <div className="row g-3 mt-3">
                      {availableDates.map((availability) => (
                        <div key={availability.id} className="col-md-6">
                          <div className="card border">
                            <div className="card-body">
                              <h6 className="card-title">
                                {formatDate(availability.date)}
                              </h6>
                              <p className="card-text mb-2">
                                <strong>Time:</strong> {availability.time}
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
                  </>
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