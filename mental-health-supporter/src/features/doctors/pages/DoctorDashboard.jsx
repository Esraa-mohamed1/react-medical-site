import React, { useEffect, useState } from 'react';
import DoctorSidebar from '../components/DoctorSidebar';
import { FaBell, FaSearch, FaUserFriends, FaCalendarAlt, FaComments } from 'react-icons/fa';
import './style.css';

// Mock data for demonstration
const mockOverview = {
  appointments: 24,
  patients: 12,
  chats: 7,
};
const mockAppointments = [
  { id: '#876384', name: 'Jayarajan Kp', gender: 'Male', reason: 'Monthly checkup' },
  { id: '#384745', name: 'Varun P', gender: 'Male', reason: 'Consultation' },
  { id: '#234858', name: 'Nithya P', gender: 'Female', reason: 'Monthly checkup' },
  { id: '#452347', name: 'Jithesh', gender: 'Male', reason: 'Monthly checkup' },
  { id: '#097345', name: 'Vibha Ak', gender: 'Female', reason: 'Monthly checkup' },
  { id: '#123745', name: 'Manushi Pl', gender: 'Female', reason: 'Checkup' },
  { id: '#384725', name: 'Hari Raj', gender: 'Male', reason: 'Checkup' },
  { id: '#187345', name: 'Ravi Prasadh', gender: 'Male', reason: 'Monthly checkup' },
];
const mockSchedule = [
  { time: '8:30', patient: 'Vibha Jayarjan', purpose: 'General check-up' },
  { time: '9:00', patient: 'Consultation: Abdu Johnson', purpose: '' },
  { time: '9:30', patient: 'Rebecca Gifts', purpose: '' },
  { time: '10:00', patient: 'ERC Report', purpose: '' },
  { time: '10:30', patient: 'Consultation meeting', purpose: '' },
  { time: '11:00', patient: 'Victory Jones', purpose: '' },
  { time: '11:30', patient: 'Board meeting', purpose: '' },
  { time: '12:00', patient: 'Consultation', purpose: '' },
  { time: '12:30', patient: 'Team meeting', purpose: '' },
  { time: '12:40', patient: 'Break', purpose: '' },
  { time: '12:50', patient: 'Board meeting', purpose: '' },
];

const DoctorDashboard = () => {
  // Replace mock data with real API calls as needed
  const [overview, setOverview] = useState(mockOverview);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [schedule, setSchedule] = useState(mockSchedule);

  // Example: fetch data from API here
  useEffect(() => {
    // TODO: Replace with real API calls
  }, []);

  return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main">
        {/* Top Bar */}
        <div className="dashboard-topbar">
          <div className="dashboard-search">
            <FaSearch className="dashboard-search-icon" />
            <input type="text" placeholder="Search" className="dashboard-search-input" />
          </div>
          <div className="dashboard-topbar-icons">
            <FaBell className="dashboard-topbar-icon" />
            <FaBell className="dashboard-topbar-icon" />
          </div>
        </div>
        {/* Overview Cards */}
        <div className="dashboard-overview-cards">
          <div className="overview-card">
            <div className="overview-card-icon appointments"><FaCalendarAlt /></div>
            <div className="overview-card-info">
              <div className="overview-card-title">Appointments</div>
              <div className="overview-card-value">{overview.appointments}</div>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-card-icon patients"><FaUserFriends /></div>
            <div className="overview-card-info">
              <div className="overview-card-title">Patients</div>
              <div className="overview-card-value">{overview.patients}</div>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-card-icon chats"><FaComments /></div>
            <div className="overview-card-info">
              <div className="overview-card-title">Chats</div>
              <div className="overview-card-value">{overview.chats}</div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="dashboard-content-row">
          {/* Appointments Table */}
          <div className="dashboard-appointments">
            <div className="dashboard-appointments-header">
              <span>Appointments</span>
              <a href="#" className="dashboard-viewall">View All</a>
            </div>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Visit No.</th>
                  <th>Patient Name</th>
                  <th>Gender</th>
                  <th>Reason</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td>{appt.id}</td>
                    <td>{appt.name}</td>
                    <td>{appt.gender}</td>
                    <td>{appt.reason}</td>
                    <td><a href="#" className="dashboard-consult-link">Consult</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Upcoming Schedule */}
          <div className="dashboard-schedule">
            <div className="dashboard-schedule-header">
              <span>Upcoming schedule</span>
              <a href="#" className="dashboard-viewall">View All</a>
            </div>
            <div className="dashboard-schedule-list">
              {schedule.map((item, idx) => (
                <div className="dashboard-schedule-item" key={idx}>
                  <div className="dashboard-schedule-time">{item.time}</div>
                  <div className="dashboard-schedule-details">
                    <div className="dashboard-schedule-patient">{item.patient}</div>
                    {item.purpose && <div className="dashboard-schedule-purpose">{item.purpose}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard; 