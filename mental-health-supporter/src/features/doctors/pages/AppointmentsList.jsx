import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiCalendar, FiClock, FiUser, FiSearch, FiInbox, FiChevronLeft, FiChevronRight, FiFilter } from 'react-icons/fi';
import debounce from 'lodash.debounce';
import DoctorSidebar from '../components/DoctorSidebar';
import '../../../features/doctors/style/style.css';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 6;
  const [isLoading, setIsLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState({});
  const [statusFilter, setStatusFilter] = useState('all');

  const navigate = useNavigate();
  
  const fetchAppointments = useCallback(async (search) => {
    try {
      setIsLoading(true);
      const userData = JSON.parse(localStorage.getItem("loggedUser"));
      const token = localStorage.getItem("access");
      
      if (!userData || userData.role !== "doctor" || !token) {
        toast.error("Only doctors can view appointments");
        navigate('/login');
        return;
      }

      const response = await axios.get(
        `http://127.0.0.1:8000/api/medical/appointments/doctor/`, 
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { search: search }
        }
      );
      
      // Process the response to ensure proper price and status fields
      const processedAppointments = Array.isArray(response.data) 
        ? response.data 
        : (response.data.results || []);
      
      // Ensure each appointment has price and status fields
      const normalizedAppointments = processedAppointments.map(appointment => ({
        ...appointment,
        price: appointment.price || 0, // Default to 0 if price is missing
        status: appointment.status || 'scheduled' // Default to 'scheduled' if status is missing
      }));
      
      setAppointments(normalizedAppointments);
      setCurrentPage(1); // Reset to first page on new search
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error.response?.data?.detail || "Failed to fetch appointments");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const debouncedFetchAppointments = useCallback(debounce(fetchAppointments, 500), [fetchAppointments]);

  useEffect(() => {
    debouncedFetchAppointments(searchTerm);
    return () => {
      debouncedFetchAppointments.cancel();
    };
  }, [searchTerm, debouncedFetchAppointments]);

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      setUpdatingStatus(prev => ({ ...prev, [appointmentId]: true }));
      const token = localStorage.getItem("access");
      
      await axios.patch(
        `http://127.0.0.1:8000/api/medical/appointments/${appointmentId}/update/`,
        { status: newStatus },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update the appointment in the local state
      setAppointments(prev => 
        prev.map(appointment => 
          appointment.id === appointmentId 
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );

      toast.success(`Appointment status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating appointment status:", error);
      toast.error(error.response?.data?.detail || "Failed to update appointment status");
    } finally {
      setUpdatingStatus(prev => ({ ...prev, [appointmentId]: false }));
    }
  };

  // Pagination calculations
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  
  // Filtered appointments by status
  const filteredAppointments = statusFilter === 'all'
    ? appointments
    : appointments.filter(a => a.status.toLowerCase() === statusFilter);

  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  // Helper functions for display
  const formatPrice = (price) => {
    if (price === null || price === undefined) return '-';
    return `$${parseFloat(price).toFixed(2)}`;
  };

  const getStatusBadge = (status) => {
    const statusText = status || 'scheduled';
    let badgeClass = '';
    
    switch(statusText.toLowerCase()) {
      case 'scheduled':
        badgeClass = 'bg-warning text-dark';
        break;
      case 'completed':
        badgeClass = 'bg-success';
        break;
      case 'cancelled':
        badgeClass = 'bg-danger';
        break;
      case 'confirmed':
        badgeClass = 'bg-primary';
        break;
      case 'no-show':
        badgeClass = 'bg-secondary';
        break;
      default:
        badgeClass = 'bg-info text-dark';
    }
    
    return (
      <span className={`badge rounded-pill px-3 py-2 ${badgeClass}`}>
        {statusText.charAt(0).toUpperCase() + statusText.slice(1)}
      </span>
    );
  };

  const getDisplayDate = (appointment) => {
    if (appointment.date) return appointment.date;
    if (!appointment.appointment_date) return 'No date';
    return new Date(appointment.appointment_date).toLocaleDateString();
  };

  const getDisplayTime = (appointment) => {
    if (appointment.start_time && appointment.end_time) {
      return `${appointment.start_time} - ${appointment.end_time}`;
    }
    if (appointment.appointment_date) {
      return new Date(appointment.appointment_date).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
    return 'No time';
  };

  const getDisplayPatient = (appointment) => {
    if (appointment.patient_info?.full_name) return appointment.patient_info.full_name;
    if (appointment.patient_info?.first_name || appointment.patient_info?.last_name) {
      return `${appointment.patient_info.first_name || ''} ${appointment.patient_info.last_name || ''}`.trim();
    }
    return appointment.patient_info?.username || 'Walk-in';
  };

  if (isLoading && filteredAppointments.length === 0) {
    return (
      <div className="doctor-dashboard-bg">
        <DoctorSidebar />
        <div className="doctor-dashboard-main enhanced-main-container">
          <div className="enhanced-main-card d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
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
          <div className="section-header mb-4">My Appointments</div>
          
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 mb-4">
            <div>
              <p className="text-muted mb-0">
                Total: <span className="fw-bold text-primary">{filteredAppointments.length}</span> appointments
              </p>
            </div>
            
            <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
              <FiFilter className="text-primary" />
              <select
                className="form-select form-select-sm"
                style={{ minWidth: 140 }}
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                aria-label="Filter by status"
              >
                <option value="all">All Statuses</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="confirmed">Confirmed</option>
                <option value="no-show">No Show</option>
              </select>
            </div>
          </div>
          
          <div className="section-card enhanced-section-card">
            <div className="table-responsive">
              <table className="records-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Patient</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAppointments.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        No appointments found.
                      </td>
                    </tr>
                  ) : (
                    currentAppointments.map(appointment => (
                      <tr key={appointment.id}>
                        <td>{getDisplayDate(appointment)}</td>
                        <td>{getDisplayTime(appointment)}</td>
                        <td>{getDisplayPatient(appointment)}</td>
                        <td className="text-nowrap">
                          {formatPrice(appointment.price)}
                        </td>
                        <td>
                          {getStatusBadge(appointment.status)}
                        </td>
                        <td>
                          <button 
                            className="edit-btn btn-sm"
                            onClick={() => navigate(`/doctor/appointments/${appointment.id}`)}
                            aria-label="View appointment details"
                            title="View Details"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination">
                  <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => setCurrentPage(currentPage - 1)} 
                      disabled={currentPage === 1}
                    >
                      <FiChevronLeft />
                    </button>
                  </li>
                  
                  {[...Array(totalPages)].map((_, idx) => (
                    <li key={idx} className={`page-item${currentPage === idx + 1 ? ' active' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => setCurrentPage(idx + 1)}
                      >
                        {idx + 1}
                      </button>
                    </li>
                  ))}
                  
                  <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => setCurrentPage(currentPage + 1)} 
                      disabled={currentPage === totalPages}
                    >
                      <FiChevronRight />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsList;