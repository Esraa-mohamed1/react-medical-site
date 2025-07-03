import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomNavbar from '../../../components/Navbar';
import { FiCalendar, FiClock, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import Footer from "../../homePage/components/Footer";
import { useDispatch } from 'react-redux';
import { addAvailability } from '../availabilitySlice';
import '../../../features/doctors/style/style.css';
import DoctorSidebar from '../components/DoctorSidebar';

const AvailabilityPage = () => {
  const [availableDates, setAvailableDates] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      // Map API fields to camelCase for UI
      const mapped = response.data.map(slot => ({
        ...slot,
        startTime: slot.start_time,
        endTime: slot.end_time
      }));
      setAvailableDates(mapped);
    } catch (error) {
      console.error('Error fetching availability:', error);
      toast.error('Failed to load availability dates');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todayStr = new Date().toISOString().split('T')[0];
    if (!formData.date || formData.date < todayStr) {
      toast.error('Please select a valid date (today or future)');
      return;
    }
    if (!formData.startTime || !formData.endTime) {
      toast.error('Please select both start and end times');
      return;
    }
    if (formData.startTime >= formData.endTime) {
      toast.error('End time must be after start time');
      return;
    }
    if (formData.date === todayStr) {
      const now = new Date();
      const [startHour, startMinute] = formData.startTime.split(':').map(Number);
      if (
        startHour < now.getHours() ||
        (startHour === now.getHours() && startMinute < now.getMinutes())
      ) {
        toast.error('Please select a valid start time (not in the past)');
        return;
      }
    }
    // Prevent duplicate slot (same date and time range)
    const isDuplicate = availableDates.some(slot => slot.date === formData.date && slot.startTime === formData.startTime && slot.endTime === formData.endTime && slot.id !== editingId);
    if (isDuplicate) {
      Swal.fire({
        icon: 'warning',
        title: 'Duplicate Slot',
        text: 'A slot with this date and time range already exists.'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('access');
      const payload = {
        date: formData.date,
        start_time: formData.startTime, // always snake_case for backend
        end_time: formData.endTime
      };
      if (editingId) {
        await axios.put(
          `http://localhost:8000/api/time_slots/available/my/${editingId}/update/`,
          payload,
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
        // Use Redux thunk to add availability with correct keys
        await dispatch(addAvailability(payload));
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
      startTime: availability.startTime,
      endTime: availability.endTime
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
      startTime: '',
      endTime: ''
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
          <ToastContainer />
          {/* Header Section */}
          <div className="section-header mb-4">
            <FiCalendar className="me-2 text-primary" />Manage Your Time Slots
          </div>
          <p className="text-muted mb-4">Set your available dates and times for patient appointments</p>
          <div className="d-flex justify-content-end gap-3 mb-4">
            <button 
              className="review-btn"
              onClick={() => setShowForm(true)}
            >
              <FiPlus className="me-2" />Add New Time Slot
            </button>
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <div className="section-card enhanced-section-card mb-4">
              <div className="section-header mb-3">{editingId ? 'Edit Time Slot' : 'Add New Time Slot'}</div>
              <form onSubmit={handleSubmit}>
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
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold"><FiClock className="me-2 text-primary" />Start Time *</label>
                    <input
                      type="time"
                      className="form-control"
                      value={formData.startTime}
                      min={formData.date === new Date().toISOString().split('T')[0] ? new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(0,5) : undefined}
                      onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">End Time *</label>
                    <input
                      type="time"
                      className="form-control"
                      value={formData.endTime}
                      min={formData.startTime}
                      onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="d-flex gap-3 mt-3">
                  <button type="submit" className="review-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : (editingId ? 'Update Slot' : 'Add Slot')}
                  </button>
                  <button type="button" className="edit-btn" onClick={resetForm} disabled={isSubmitting}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Time Slots Table */}
          <div className="section-card enhanced-section-card">
            <div className="section-header mb-3">
              <FiCalendar className="me-2 text-primary" />Your Available Time Slots
            </div>
            {availableDates.length === 0 ? (
              <div className="text-center py-5">
                <div className="mb-4">
                  <FiCalendar size={64} className="text-muted" />
                </div>
                <h5 className="text-muted mb-2">No time slots set yet</h5>
                <p className="text-muted mb-4">Add your first time slot to start accepting patient appointments</p>
                <button 
                  className="review-btn"
                  onClick={() => setShowForm(true)}
                >
                  <FiPlus className="me-2" />Add Your First Time Slot
                </button>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="records-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableDates.map((availability) => (
                      <tr key={availability.id}>
                        <td>{formatFullDate(availability.date)}</td>
                        <td>{availability.start_time || availability.startTime}</td>
                        <td>{availability.end_time || availability.endTime}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <button 
                              onClick={() => handleEdit(availability)}
                              className="edit-btn btn-sm"
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
  );
};

export default AvailabilityPage;