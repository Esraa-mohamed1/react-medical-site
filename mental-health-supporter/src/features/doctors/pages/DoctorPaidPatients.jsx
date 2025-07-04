import React, { useEffect, useState } from 'react';
import DoctorSidebar from '../components/DoctorSidebar';
import { getPaidPatients } from '../../../services/doctors/AppointmentService';
import { 
  FaEnvelope, 
  FaPhone, 
  FaBirthdayCake, 
  FaVenusMars, 
  FaUser,
  FaCalendarAlt,
  FaStethoscope,
  FaFileAlt,
  FaChevronDown
} from 'react-icons/fa';
import '../../../features/doctors/style/style.css';
import { Link } from 'react-router-dom';

const DoctorPaidPatients = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const appts = await getPaidPatients();
        setAppointments(appts);
      } catch (err) {
        setError('Failed to fetch patient data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleCardExpand = (appointmentId) => {
    setExpandedCard(expandedCard === appointmentId ? null : appointmentId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderPatientInfo = (patient) => {
    return (
      <>
        <div className="col-md-6">
          <div className="patient-info-item mb-3">
            <FaEnvelope className="me-2 text-primary" />
            <span>{patient.email || 'Email not provided'}</span>
          </div>
          
          {patient.phone && (
            <div className="patient-info-item mb-3">
              <FaPhone className="me-2 text-primary" />
              <span>{patient.phone}</span>
            </div>
          )}
        </div>
        <div className="col-md-6">
          {patient.gender && (
            <div className="patient-info-item mb-3">
              <FaVenusMars className="me-2 text-primary" />
              <span>{patient.gender}</span>
            </div>
          )}
          
          {patient.date_of_birth && (
            <div className="patient-info-item mb-3">
              <FaBirthdayCake className="me-2 text-primary" />
              <span>{formatDate(patient.date_of_birth)}</span>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main enhanced-main-container">
        <div className="enhanced-main-card">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-header mb-0">
              <FaUser className="me-2" />My Patients
            </h2>
            <div className="text-muted">
              {appointments.length} {appointments.length === 1 ? 'Patient' : 'Patients'}
            </div>
          </div>
          
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '40vh' }}>
              <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center my-5">{error}</div>
          ) : appointments.length === 0 ? (
            <div className="alert alert-info text-center my-5">No patients found.</div>
          ) : (
            <div className="patients-grid-container">
              {appointments.map((appt) => {
                const patient = appt.patient_info;
                return (
                  <div key={appt.id} className={`patient-card ${expandedCard === appt.id ? 'expanded' : ''}`}>
                    <div 
                      className="patient-card-header d-flex justify-content-between align-items-center p-3"
                      onClick={() => toggleCardExpand(appt.id)}
                    >
                      <div className="d-flex align-items-center">
                        <div className="patient-avatar me-3">
                          {patient.profile_image ? (
                            <img 
                              src={patient.profile_image} 
                              alt={patient.full_name || 'Patient'} 
                              className="rounded-circle"
                              width="60"
                              height="60"
                            />
                          ) : (
                            <div className="avatar-placeholder rounded-circle">
                              <FaUser size={24} />
                            </div>
                          )}
                        </div>
                        <div>
                          <h5 className="mb-0 patient-name">{patient.full_name || 'Unknown Patient'}</h5>
                          <small className="text-muted">
                            <FaCalendarAlt className="me-1" /> {formatDate(appt.appointment_date)}
                          </small>
                        </div>
                      </div>
                      <FaChevronDown 
                        className={`chevron-icon ${expandedCard === appt.id ? 'rotate-180' : ''}`} 
                      />
                    </div>
                    
                    {expandedCard === appt.id && (
                      <div className="patient-card-content p-3">
                        <div className="row">
                          {renderPatientInfo(patient)}
                        </div>
                        
                        <div className="patient-actions mt-3">
                          <Link 
                            to={`/doctor/patient-details/${appt.id}`}
                            className="btn btn-primary me-2"
                          >
                            <FaStethoscope className="me-1" /> Medical History
                          </Link>
                          <Link 
                            to={`/doctor/patient-records/${appt.id}`}
                            className="btn btn-outline-primary"
                          >
                            <FaFileAlt className="me-1" /> Documents
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorPaidPatients;