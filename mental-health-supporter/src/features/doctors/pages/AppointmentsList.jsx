

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiCalendar, FiClock, FiUser, FiSearch, FiInbox, FiChevronLeft, FiChevronRight, FiFilter } from 'react-icons/fi';
import debounce from 'lodash.debounce';
import CustomNavbar from '../../../components/Navbar';
import Footer from "../../homePage/components/Footer";
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
      const data = Array.isArray(response.data) ? response.data : (response.data.results || []);
      setAppointments(data);
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

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  // Filtered appointments by status
  const filteredAppointments = statusFilter === 'all'
    ? appointments
    : appointments.filter(a => (a.status || 'scheduled').toLowerCase() === statusFilter);

  const filteredCurrentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  // Helper for avatar/initials
  const getInitials = (username) => {
    if (!username) return 'U';
    return username.slice(0, 2).toUpperCase();
  };

  // Map fields directly from API response
  const getDisplayDate = (appointment) => {
    return appointment?.date || 'No date';
  };
  const getDisplayTime = (appointment) => {
    if (!appointment?.start_time) return 'No time';
    if (appointment.end_time) {
      return `${appointment.start_time.slice(0,5)} - ${appointment.end_time.slice(0,5)}`;
    }
    return appointment.start_time.slice(0,5);
  };
  const getDisplayPatient = (appointment) => {
    if (!appointment?.patient_info) return 'Walk-in';
    return appointment.patient_info.full_name || appointment.patient_info.username;
  };
  const getDisplayEmail = (appointment) => appointment.patient_info?.email || 'Not available';
  const getDisplayNotes = (appointment) => appointment.notes || '';

  const goToDetails = (id) => {
    navigate(`/doctor/appointments/${id}`);
  };

  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  const getStatusBadge = (status) => {
    if (!status) return 'bg-secondary';
    switch(status.toLowerCase()) {
      case 'scheduled':
        return 'bg-warning text-dark';
      case 'completed':
        return 'bg-success';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
    toast.success("You have been logged out.");
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCurrentAppointments.length === 0 ? (
                    <tr><td colSpan="6" className="text-center text-muted py-4">No appointments found.</td></tr>
                  ) : filteredCurrentAppointments.map(appointment => {
                    // Debug logs for status
                    console.log('Appointment:', appointment);
                    console.log('Appointment status:', appointment.status);
                    return (
                      <tr key={appointment.id}>
                        <td>{getDisplayDate(appointment)}</td>
                        <td>{getDisplayTime(appointment)}</td>
                        <td>{getDisplayPatient(appointment)}</td>
                     
                        <td>{appointment.available_time_info?.price ? `$${appointment.available_time_info.price}` : (appointment.price ? `$${appointment.price}` : 'N/A')}</td>
                        <td>
                          <button 
                            className="view-details-btn btn-sm"
                            onClick={() => goToDetails(appointment.id)}
                            aria-label="View appointment details"
                            title="View Details"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* Pagination Controls */}
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    <FiChevronLeft />
                  </button>
                </li>
                {[...Array(totalPages)].map((_, idx) => (
                  <li key={idx} className={`page-item${currentPage === idx + 1 ? ' active' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(idx + 1)}>{idx + 1}</button>
                  </li>
                ))}
                <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    <FiChevronRight />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AppointmentsList;
