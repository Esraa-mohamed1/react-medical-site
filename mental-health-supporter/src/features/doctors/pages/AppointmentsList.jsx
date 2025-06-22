import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiCalendar, FiClock, FiUser, FiSearch, FiInbox, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import debounce from 'lodash.debounce';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 6;
  const [isLoading, setIsLoading] = useState(true);

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
      
      setAppointments(response.data);
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


  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const goToDetails = (id) => {
    navigate(`/doctor/appointments/${id}`);
  };

  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  const getStatusBadge = (status) => {
    if (!status) return 'bg-secondary';
    switch(status.toLowerCase()) {
      case 'pending':
        return 'bg-warning text-dark';
      case 'confirmed':
        return 'bg-success';
      case 'canceled':
        return 'bg-danger';
      case 'completed':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  };
  
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4">
          <div>
            <h1 className="fw-bold text-dark">My Appointments</h1>
            <p className="text-muted">
              You have {appointments.length} appointments.
            </p>
          </div>
          <div className="input-group mt-3 mt-sm-0" style={{ maxWidth: '300px' }}>
            <span className="input-group-text bg-white"><FiSearch /></span>
            <input
              type="text"
              placeholder="Search appointments..."
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Appointments Grid */}
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
            <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : currentAppointments.length > 0 ? (
          <>
            <div className="row g-4">
              {currentAppointments.map(appointment => (
                <div className="col-md-6 col-lg-4" key={appointment.id}>
                  <div 
                    className="card h-100 shadow-sm border-0 rounded-3 cursor-pointer"
                    onClick={() => goToDetails(appointment.id)}
                  >
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h5 className="card-title fw-bold text-dark">
                          {appointment.patient_data?.name || 'Walk-in'}
                        </h5>
                        <span className={`badge rounded-pill ${getStatusBadge(appointment.status)}`}>
                          {appointment.status || 'Unknown'}
                        </span>
                      </div>
                      <div className="text-muted">
                        <p className="d-flex align-items-center mb-2">
                          <FiCalendar className="text-primary me-2" />
                          <span>{appointment.date || 'No date'}</span>
                        </p>
                        <p className="d-flex align-items-center mb-2">
                          <FiClock className="text-primary me-2" />
                          <span>{appointment.time || 'No time'}</span>
                        </p>
                        <p className="d-flex align-items-center">
                          <FiUser className="text-primary me-2" />
                          <span>Appointment #{appointment.id}</span>
                        </p>
                      </div>
                      <div className="mt-auto text-end">
                        <span className="fw-bold text-primary">
                          View Details &rarr;
                        </span>
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
                      <button className="page-link" onClick={() => setCurrentPage(p => p - 1)}>
                        <FiChevronLeft />
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(p => p + 1)}>
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