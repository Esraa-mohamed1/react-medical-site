import React, { useEffect, useState } from 'react';
import DoctorSidebar from '../components/DoctorSidebar';
import { getPaidPatients } from '../../../services/doctors/AppointmentService';
import { 
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

  // Helper to get the correct profile image URL
  const getProfileImageUrl = (imgPath) => {
    if (!imgPath) return '/images/doctor.png';
    if (imgPath.startsWith('http')) return imgPath;
    return `${process.env.REACT_APP_API_BASE_URL || ''}${imgPath}`;
  };

  return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main enhanced-main-container">
        <div className="enhanced-main-card">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-header">
              <FaUser className="me-2" />My Patients
            </h2>
            <div className="patient-count">
              {appointments.length} {appointments.length === 1 ? 'Patient' : 'Patients'}
            </div>
          </div>
          
          {loading ? (
            <div className="spinner-container">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center my-5">{error}</div>
          ) : appointments.length === 0 ? (
            <div className="alert alert-info text-center my-5">No patients found.</div>
          ) : (
            <div className="patients-list">
              {appointments.map((appt) => {
                const patient = appt.patient_info;
                const profileImgUrl = getProfileImageUrl(patient.profile_image);
                console.log('Profile image URL:', profileImgUrl);
                return (
                  <div key={appt.id} className={`patient-card ${expandedCard === appt.id ? 'expanded' : ''}`}>
                    <div 
                      className="patient-card-header"
                      onClick={() => toggleCardExpand(appt.id)}
                    >
                      <div className="patient-basic-info d-flex align-items-center gap-3" style={{flexDirection: 'row'}}>
                        {/* Patient profile image */}
                        {patient.profile_image ? (
                          <img
                            src={profileImgUrl}
                            alt={patient.full_name || 'Patient'}
                            className="patient-profile-img"
                            style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid #6dd5ed' }}
                            onError={e => { e.target.onerror = null; e.target.src = '/images/doctor.png'; }}
                          />
                        ) : (
                          <FaUser className="patient-profile-img" style={{ width: 48, height: 48, borderRadius: '50%', background: '#e0e0e0', color: '#888', padding: 8 }} />
                        )}
                        <div className="d-flex flex-column justify-content-center">
                          <h3 className="patient-name mb-0">{patient.full_name || 'Unknown Patient'}</h3>
                          <div className="appointment-date">
                            <FaCalendarAlt className="me-1" /> 
                            {formatDate(appt.appointment_date)}
                          </div>
                        </div>
                      </div>
                      <FaChevronDown 
                        className={`chevron-icon ${expandedCard === appt.id ? 'rotate-180' : ''}`} 
                      />
                    </div>
                    
                    {expandedCard === appt.id && (
                      <div className="patient-card-details">
                        {patient.email && (
                          <div className="patient-detail">
                            <span className="detail-label">Email:</span>
                            <span className="detail-value">{patient.email}</span>
                          </div>
                        )}
                        
                        {patient.phone && (
                          <div className="patient-detail">
                            <span className="detail-label">Phone:</span>
                            <span className="detail-value">{patient.phone}</span>
                          </div>
                        )}
                        
                        <div className="patient-actions">
                          <Link 
                            to={`/doctor/patient-details/${appt.id}`}
                            className="action-btn medical-history"
                          >
                            <FaStethoscope className="me-1" /> Medical History
                          </Link>
                          <Link 
                            to={`/doctor/patient-records/${appt.id}`}
                            className="action-btn documents"
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