import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiCalendar, FiClock, FiUser, FiSearch, FiInbox, FiChevronLeft, FiChevronRight, FiFilter } from 'react-icons/fi';
import debounce from 'lodash.debounce';
import CustomNavbar from '../../../components/Navbar';

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
    if (!appointment?.appointment_date) return 'No date';
    const date = new Date(appointment.appointment_date);
    return date.toLocaleDateString();
  };
  const getDisplayTime = (appointment) => {
    if (!appointment?.appointment_date) return 'No time';
    const date = new Date(appointment.appointment_date);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const getDisplayPatient = (appointment) => {
    if (!appointment?.patient_info) return 'Walk-in';
    const { first_name, last_name, username } = appointment.patient_info;
    if (first_name || last_name) return `${first_name} ${last_name}`.trim();
    return username;
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
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border" style={{width: '3rem', height: '3rem', color: '#2A5C5F'}} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <CustomNavbar />
      <div className="container py-5">
        {/* Summary & Filter */}
        <div className="row mb-4">
          <div className="col-lg-8 mx-auto d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
            <div>
              <h1 className="fw-bold text-dark display-5 mb-1">My Appointments</h1>
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
        </div>
        {/* Search Card */}
        <div className="card shadow-sm border-0 rounded-4 mb-4 p-4 bg-white">
          <div className="row align-items-center g-3">
            <div className="col-12 col-md-6 mx-auto">
              <div className="input-group">
                <span className="input-group-text bg-white"><FiSearch /></span>
                <input
                  type="text"
                  placeholder="Search appointments..."
                  className="form-control rounded-end"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ boxShadow: 'none' }}
                  aria-label="Search appointments"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Appointments Grid */}
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
            <div className="spinner-border " style={{width: '3rem', height: '3rem', color: '#2A5C5F'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredCurrentAppointments.length > 0 ? (
          <>
            <div className="row g-4">
              {filteredCurrentAppointments.map(appointment => (
                <div className="col-md-6 col-lg-4" key={appointment.id}>
                  <div
                    className="card h-100 border-0 rounded-4 shadow-sm bg-blue-50 position-relative appointment-card transition"
                    style={{
                      background: 'linear-gradient(135deg, #eaf3fb 0%, #f6fafd 100%)',
                      transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'scale(1.025)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(49,123,196,0.10)';
                      e.currentTarget.style.background = 'linear-gradient(135deg, #d0e6fa 0%, #eaf3fb 100%)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(49,123,196,0.08)';
                      e.currentTarget.style.background = 'linear-gradient(135deg, #eaf3fb 0%, #f6fafd 100%)';
                    }}
                  >
                    <div className="card-header bg-white border-0 rounded-top-4 d-flex align-items-center gap-3 mb-2" style={{minHeight: 56}}>
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{width: 40, height: 40, fontSize: 18}}>
                        {appointment.patient_info ? getInitials(appointment.patient_info.username) : 'U'}
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title fw-bold text-dark mb-0 fs-6">
                          {getDisplayPatient(appointment)}
                        </h5>
                        <span className="text-muted small">Patient</span>
                      </div>
                      <div className="text-muted">
                        <p className="d-flex align-items-center mb-2">
                          <FiCalendar className="me-2" />
                          <span>{getDisplayDate(appointment)}</span>
                        </p>
                        <p className="d-flex align-items-center mb-2">
                          <FiClock className="me-2" />
                          <span>{getDisplayTime(appointment)}</span>
                        </p>
                        <p className="d-flex align-items-center">
                          <FiUser className="me-2" />
                          <span>Appointment #{appointment.id}</span>
                        </p>
                        <p className="d-flex align-items-center">
                          <span className="fw-semibold">Title:</span> {appointment.title}
                        </p>
                        <p className="d-flex align-items-center">
                          <span className="fw-semibold">Payment Status:</span> {appointment.payment_status}
                        </p>
                      </div>
                      {/* Status Update Section */}
                      <div className="mt-2 mb-3">
                        <label className="form-label small text-muted mb-1">Update Status:</label>
                        <select
                          className="form-select form-select-sm"
                          value={appointment.status || 'scheduled'}
                          onChange={(e) => handleStatusUpdate(appointment.id, e.target.value)}
                          disabled={updatingStatus[appointment.id]}
                          aria-label="Update appointment status"
                        >
                          <option value="scheduled">Scheduled</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div className="mt-auto">
                        <button 
                          className="btn btn-outline-primary btn-sm w-100"
                          onClick={() => goToDetails(appointment.id)}
                          aria-label="View appointment details"
                          title="View Details"
                        >
                          View Details &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-5">
                <nav>
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(p => p - 1)} aria-label="Previous page">
                        <FiChevronLeft />
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(i + 1)} aria-label={`Go to page ${i + 1}`}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(p => p + 1)} aria-label="Next page">
                        <FiChevronRight />
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="text-center card shadow-sm p-5">
            <FiInbox className="mx-auto h1 text-muted" style={{fontSize: '4rem'}}/>
            <h3 className="mt-4 fw-bold text-dark">No appointments found</h3>
            <p className="mt-2 text-muted">
              {searchTerm ? `No appointments match your search for "${searchTerm}".` : "When you have appointments, they will show up here."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;