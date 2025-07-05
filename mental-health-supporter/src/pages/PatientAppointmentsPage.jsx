import React, { useState, useEffect } from 'react';
import { FaUser, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaStethoscope, FaCreditCard, FaFileAlt, FaPaypal, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import CustomNavbar from '../components/Navbar';
import Footer from '../features/homePage/components/Footer';
import './PatientAppointmentsPage.css';
import { useTranslation } from 'react-i18next';

const PatientAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
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
        const response = await axios.get('http://localhost:8000/api/appointments/my-appointments/', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setAppointments(response.data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError(t('patientAppointments.errorMessage'));
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [user.role, t]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'scheduled': { class: 'status-scheduled', text: t('patientAppointments.scheduled') },
      'completed': { class: 'status-completed', text: t('patientAppointments.completed') },
      'cancelled': { class: 'status-cancelled', text: t('patientAppointments.cancelled') },
      'pending': { class: 'status-pending', text: t('patientAppointments.pending') }
    };
    const config = statusConfig[status?.toLowerCase()] || { class: 'status-default', text: t('patientAppointments.unknown') };
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const paymentConfig = {
      'paid': { class: 'payment-paid', text: t('patientAppointments.paid'), icon: <FaCreditCard /> },
      'pending': { class: 'payment-pending', text: t('patientAppointments.pendingPayment'), icon: <FaCreditCard /> },
      'unpaid': { class: 'payment-unpaid', text: t('patientAppointments.unpaid'), icon: <FaCreditCard /> }
    };
    const config = paymentConfig[paymentStatus?.toLowerCase()] || { class: 'payment-default', text: t('patientAppointments.unknown'), icon: <FaCreditCard /> };
    return (
      <span className={`payment-badge ${config.class}`}>
        {config.icon} {config.text}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return t('patientAppointments.notScheduledYet');
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return t('patientAppointments.notScheduledYet');
    return timeString.slice(0, 5); // Remove seconds if present
  };

  const formatPrice = (price) => {
    if (!price) return t('patientAppointments.priceNotSet');
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
            <h2>{t('patientAppointments.accessDenied')}</h2>
            <p>{t('patientAppointments.accessDeniedMessage')}</p>
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
            <p>{t('patientAppointments.loading')}</p>
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
            <h2>{t('patientAppointments.error')}</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              {t('patientAppointments.tryAgain')}
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
          <h1>{t('patientAppointments.title')}</h1>
          <p>{t('patientAppointments.subtitle')}</p>
        </div>

        {appointments.length === 0 ? (
          <div className="no-appointments">
            <FaCalendarAlt className="no-appointments-icon" />
            <h2>{t('patientAppointments.noAppointments')}</h2>
            <p>{t('patientAppointments.noAppointmentsMessage')}</p>
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
                        alt={appointment.doctor_info.full_name || t('patientAppointments.doctorNameNotAvailable')}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                        style={{ display: 'block' }}
                      />
                    ) : null}
                    <div className="avatar-placeholder" style={{ display: appointment.doctor_info?.profile_image ? 'none' : 'flex' }}>
                      <FaUser />
                    </div>
                  </div>
                  <div className="doctor-info">
                    <h3 className="doctor-name">
                      {appointment.doctor_info?.full_name || t('patientAppointments.doctorNameNotAvailable')}
                    </h3>
                    <p className="doctor-specialization">
                      <FaStethoscope />
                      {appointment.doctor_info?.specialization || t('patientAppointments.specializationNotSpecified')}
                    </p>
                    <p className="clinic-info">
                      <FaMapMarkerAlt />
                      {appointment.doctor_info?.clinic_name || t('patientAppointments.clinicNameNotAvailable')}
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
                {/* Status and Payment */}
                <div className="status-section">
                  {getStatusBadge(appointment.status)}
                </div>
                <div className="payment-section">
                  {getPaymentStatusBadge(appointment.payment_status)}
                </div>
                {/* Session Information */}
                <div className="session-info">
                  <div className="info-row">
                    <FaCalendarAlt className="info-icon" />
                    <span className="info-label">{t('patientAppointments.date')}</span>
                    <span className="info-value">
                      {formatDate(appointment.available_time_info?.date)}
                    </span>
                  </div>
                  <div className="info-row">
                    <FaClock className="info-icon" />
                    <span className="info-label">{t('patientAppointments.time')}</span>
                    <span className="info-value">
                      {appointment.available_time_info?.start_time && appointment.available_time_info?.end_time 
                        ? `${formatTime(appointment.available_time_info.start_time)} - ${formatTime(appointment.available_time_info.end_time)}`
                        : t('patientAppointments.notScheduledYet')
                      }
                    </span>
                  </div>
                  <div className="info-row">
                    <FaCreditCard className="info-icon" />
                    <span className="info-label">{t('patientAppointments.price')}</span>
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
                      <span className="notes-label">{t('patientAppointments.notes')}</span>
                      <p>{appointment.notes}</p>
                    </div>
                  </div>
                )}
                {/* Transaction Section */}
                {appointment.paypal_transaction_id && (
                  <div className="transaction-section">
                    <FaPaypal className="transaction-icon" />
                    <div className="transaction-content">
                      <span className="transaction-label">{t('patientAppointments.transactionId')}</span>
                      <span className="transaction-id">{appointment.paypal_transaction_id}</span>
                    </div>
                  </div>
                )}
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