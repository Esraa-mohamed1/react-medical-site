import React, { useState, useEffect } from 'react';
import { FaUser, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaStethoscope, FaCreditCard, FaFileAlt, FaPaypal, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import CustomNavbar from '../components/Navbar';
import Footer from '../features/homePage/components/Footer';
import './PatientAppointmentsPage.css';

const PatientAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Mock user - replace with your actual auth context
  const user = JSON.parse(localStorage.getItem('loggedUser')) || { role: 'patient' };

  useEffect(() => {
    if (user.role !== 'patient') {
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('access');
        
        const response = await axios.get('https://pearla.pythonanywhere.com/api/appointments/my-appointments/', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        setAppointments(response.data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to load appointments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user.role]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'scheduled': { class: 'status-scheduled', text: 'Scheduled' },
      'completed': { class: 'status-completed', text: 'Completed' },
      'cancelled': { class: 'status-cancelled', text: 'Cancelled' },
      'pending': { class: 'status-pending', text: 'Pending' }
    };
    
    const config = statusConfig[status?.toLowerCase()] || { class: 'status-default', text: status || 'Unknown' };
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const paymentConfig = {
      'paid': { class: 'payment-paid', text: 'Paid', icon: <FaCreditCard /> },
      'pending': { class: 'payment-pending', text: 'Pending Payment', icon: <FaCreditCard /> },
      'unpaid': { class: 'payment-unpaid', text: 'Unpaid', icon: <FaCreditCard /> }
    };
    
    const config = paymentConfig[paymentStatus?.toLowerCase()] || { class: 'payment-default', text: paymentStatus || 'Unknown', icon: <FaCreditCard /> };
    return (
      <span className={`payment-badge ${config.class}`}>
        {config.icon} {config.text}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not scheduled yet';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Not scheduled yet';
    return timeString.slice(0, 5); // Remove seconds if present
  };

  const formatPrice = (price) => {
    if (!price) return 'Price not set';
    return `$${parseFloat(price).toFixed(2)}`;
  };

  // Access denied for non-patients
  if (user.role !== 'patient') {
    return (
      <>
        <CustomNavbar />
        <div className="patient-appointments-container">
          <div className="access-denied">
            <FaExclamationTriangle className="access-denied-icon" />
            <h2>Access Denied</h2>
            <p>Only patients can view their appointments.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Loading state
  if (loading) {
    return (
      <>
        <CustomNavbar />
        <div className="patient-appointments-container">
          <div className="loading-container">
            <FaSpinner className="loading-spinner" />
            <p>Loading your appointments...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <CustomNavbar />
        <div className="patient-appointments-container">
          <div className="error-container">
            <FaExclamationTriangle className="error-icon" />
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <CustomNavbar />
      <div className="patient-appointments-container">
        <div className="appointments-header">
          <h1>My Appointments</h1>
          <p>Manage and view your scheduled sessions</p>
        </div>

        {appointments.length === 0 ? (
          <div className="no-appointments">
            <FaCalendarAlt className="no-appointments-icon" />
            <h2>No Appointments Found</h2>
            <p>You don't have any appointments scheduled yet.</p>
          </div>
        ) : (
          <div className="appointments-grid">
            {appointments.map((appointment, index) => (
              <div key={index} className="appointment-card">
                {/* Doctor Information Section */}
                <div className="doctor-section">
                  <div className="doctor-avatar">
                    {appointment.doctor_info?.profile_image ? (
                      <img 
                        src={appointment.doctor_info.profile_image} 
                        alt={appointment.doctor_info.full_name || 'Doctor'}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="avatar-placeholder">
                      <FaUser />
                    </div>
                  </div>
                  
                  <div className="doctor-info">
                    <h3 className="doctor-name">
                      {appointment.doctor_info?.full_name || 'Doctor Name Not Available'}
                    </h3>
                    <p className="doctor-specialization">
                      <FaStethoscope />
                      {appointment.doctor_info?.specialization || 'Specialization not specified'}
                    </p>
                    <p className="clinic-info">
                      <FaMapMarkerAlt />
                      {appointment.doctor_info?.clinic_name || 'Clinic name not available'}
                      {appointment.doctor_info?.clinic_address && (
                        <span className="clinic-address">
                          , {appointment.doctor_info.clinic_address}
                        </span>
                      )}
                      {appointment.doctor_info?.city && (
                        <span className="clinic-city">
                          , {appointment.doctor_info.city}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Appointment Details Section */}
                <div className="appointment-details">
                  <div className="appointment-header">
                    <h4 className="appointment-title">
                      {appointment.title || 'Consultation Session'}
                    </h4>
                    <div className="status-badges">
                      {getStatusBadge(appointment.status)}
                      {getPaymentStatusBadge(appointment.payment_status)}
                    </div>
                  </div>

                  {/* Session Information */}
                  <div className="session-info">
                    <div className="info-row">
                      <FaCalendarAlt className="info-icon" />
                      <span className="info-label">Date:</span>
                      <span className="info-value">
                        {formatDate(appointment.available_time_info?.date)}
                      </span>
                    </div>
                    
                    <div className="info-row">
                      <FaClock className="info-icon" />
                      <span className="info-label">Time:</span>
                      <span className="info-value">
                        {appointment.available_time_info?.start_time && appointment.available_time_info?.end_time 
                          ? `${formatTime(appointment.available_time_info.start_time)} - ${formatTime(appointment.available_time_info.end_time)}`
                          : 'Not scheduled yet'
                        }
                      </span>
                    </div>
                    
                    <div className="info-row">
                      <FaCreditCard className="info-icon" />
                      <span className="info-label">Price:</span>
                      <span className="info-value price">
                        {formatPrice(appointment.available_time_info?.price)}
                      </span>
                    </div>
                  </div>

                  {/* Notes Section */}
                  {appointment.notes && (
                    <div className="notes-section">
                      <FaFileAlt className="notes-icon" />
                      <div className="notes-content">
                        <span className="notes-label">Notes:</span>
                        <p>{appointment.notes}</p>
                      </div>
                    </div>
                  )}

                  {/* PayPal Transaction ID */}
                  {appointment.paypal_transaction_id && (
                    <div className="transaction-section">
                      <FaPaypal className="transaction-icon" />
                      <div className="transaction-content">
                        <span className="transaction-label">Transaction ID:</span>
                        <span className="transaction-id">{appointment.paypal_transaction_id}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PatientAppointmentsPage; 