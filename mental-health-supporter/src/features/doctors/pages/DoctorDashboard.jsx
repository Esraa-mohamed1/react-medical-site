import React, { useEffect, useState } from 'react';
import DoctorSidebar from '../components/DoctorSidebar';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaComments, FaFileAlt, FaPills, FaChevronRight, FaBell } from 'react-icons/fa';
import { getPaidPatients } from '../../../services/doctors/AppointmentService';
import { getAvailableTimes } from '../../../services/doctors/AvailableTimeService';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [stats, setStats] = useState({
    appointments: 0,
    patients: 0,
    schedule: 0,
    documents: 0,
    messages: 0,
   

  });
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [clinicName, setClinicName] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        // Appointments & Patients
        const appts = await getPaidPatients();
        setAppointments(appts);
        setPatients(appts.map(a => a.patient_info));
        setStats(prev => ({ ...prev, appointments: appts.length, patients: appts.length }));
        // Schedule (available times)
        const user = JSON.parse(localStorage.getItem('loggedUser'));
        const doctorId = user?.doctor_id || user?.id;
        const times = await getAvailableTimes(doctorId);
        setSchedule(times);
        setStats(prev => ({ ...prev, schedule: times.length }));
        // Clinic name (from user profile or doctor object)
        setClinicName(user?.clinic_name || user?.clinic || 'My Clinic');
        // Mock data for other stats
        setStats(prev => ({
          ...prev,
          documents: 17,
          messages: 5,
       
        }));
      } catch (e) {
        console.error('Error fetching data:', e);
        setAppointments([]);
        setPatients([]);
        setSchedule([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <h1>{clinicName}</h1>
          <div className="header-actions">
              <span className="badge">3</span>
           
          </div>
        </header>
        {/* Main Content */}
        <div className="dashboard-content-wrapper">
          {/* Left Column - Appointments */}
          <div className="dashboard-left-column">
            {/* Overview Cards */}
            <section className="overview-section">
              <h2 className="section-title">Overview</h2>
              <div className="overview-cards">
                {[
                  { icon: <FaUsers />, title: 'Patients', value: stats.patients, path: '/doctor/paid-patients' },
        
                  { icon: <FaFileAlt />, title: 'Documents', value: stats.documents, path: '/doctor/documents' },
                  { icon: <FaComments />, title: 'Messages', value: stats.messages, path: '/doctor-chats' },
           
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="overview-card" 
                    onClick={() => navigate(item.path)}
                  >
                    <div className="card-icon">{item.icon}</div>
                    <div className="card-content">
                      <h3>{item.title}</h3>
                      <p>{item.value} {item.title === 'Documents' ? 'Files' : item.title === 'Messages' ? 'Unread' : 'Total'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="appointments-section">
              <div className="section-header">
                <h2 className="section-title">Applications</h2>
              </div>
              <div className="appointments-table">
                <div className="table-header">
                  <div>Visit No.</div>
                  <div>Patient Name</div>
               
                  <div>Action</div>
                </div>
                <div className="table-body">
                  {loading ? (
                    <div className="loading-row">Loading appointments...</div>
                  ) : appointments.length === 0 ? (
                    <div className="empty-row">No appointments found</div>
                  ) : (
                    appointments.map((appointment, index) => (
                      <div className="table-row" key={index}>
                        <div>#{appointment.id || appointment.appointment_id}</div>
                        <div>{appointment.patient_info?.full_name || appointment.name || '-'}</div>
                        <div>
                          <button 
                            className="consult-btn"
                            onClick={() => navigate(`/doctor/patient-details/${appointment.id || appointment.appointment_id}`)}
                          >
                            Consult
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>
          {/* Right Column - Schedule */}
          <div className="dashboard-right-column">
            <section className="schedule-section">
              <div className="section-header">
                <h2 className="section-title">Upcoming schedule</h2>
                <div className="current-time">{formatTime(currentTime)}</div>
              </div>
              <div className="schedule-list">
                {loading ? (
                  <div className="loading-schedule">Loading schedule...</div>
                ) : schedule.length === 0 ? (
                  <div className="empty-schedule">No upcoming appointments</div>
                ) : (
                  schedule.map((item, index) => (
                    <div className="schedule-item" key={index}>
                      <div className="schedule-time">{item.date} {item.start_time} - {item.end_time}</div>
                      <div className="schedule-details">
                        <div className="schedule-patient">{item.patient || 'Available'}</div>
                        <div className="schedule-purpose">{item.purpose || 'Available for booking'}</div>
                      </div>
                      <button 
                        className="begin-btn"
                        onClick={() => navigate(`/doctor/consult/${item.id || 'new'}`)}
                      >
                        Begin
                      </button>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;