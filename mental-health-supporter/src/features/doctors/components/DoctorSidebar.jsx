import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FaUserMd, FaCalendarAlt, FaUsers, FaRegClock, FaFileAlt, FaComments, FaPills, FaBell, FaCog } from 'react-icons/fa';
import './DoctorSidebar.css';

const navLinks = [
  { to: '/doctor/dashboard', label: 'Home', icon: <FaUserMd /> },
  { to: '/doctor/appointments', label: 'Appointment', icon: <FaCalendarAlt /> },
  { to: '/doctor/paid-patients', label: 'Patients', icon: <FaUsers /> },
  { to: '/doctor/schedule', label: 'Schedule', icon: <FaRegClock /> },
  { to: '/doctor/documents', label: 'Documents', icon: <FaFileAlt /> },
  { to: '/doctor-chats', label: 'Messages', icon: <FaComments /> },
  { to: '/doctor/notifications', label: 'Notification', icon: <FaBell /> },
  { to: '/settings', label: 'Settings', icon: <FaCog /> },
];

const DoctorSidebar = () => {
  const location = useLocation();
  const doctor = JSON.parse(localStorage.getItem('loggedUser')) || { username: 'Dr. Name', role: 'doctor' };
  return (
    <aside className="doctor-sidebar">
      <div className="sidebar-header">
        <span className="sidebar-logo">🩺</span>
        <span className="sidebar-title">Pearla</span>
      </div>
      <nav className="sidebar-nav">
        {navLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
          >
            <span className="sidebar-icon">{link.icon}</span>
            <span className="sidebar-label">{link.label}</span>
          </NavLink>
        ))}
        <Link
          to="/doctor/appointments"
          className={`sidebar-link${location.pathname.startsWith('/doctor/appointments') ? ' active' : ''}`}
        >
          Appointments
        </Link>
        <Link
          to="/doctor/availability"
          className={`sidebar-link${location.pathname.startsWith('/doctor/availability') ? ' active' : ''}`}
        >
          Schedule
        </Link>
        <Link
          to="/doctor/documents"
          className={`sidebar-link${location.pathname.startsWith('/doctor/documents') ? ' active' : ''}`}
        >
          Documents
        </Link>
      </nav>
      <div className="sidebar-profile">
        <img src={doctor.profile_image || 'https://randomuser.me/api/portraits/men/32.jpg'} alt="Doctor" className="sidebar-avatar" />
        <div>
          <div className="sidebar-profile-name">{doctor.username || 'Dr. Name'}</div>
          <div className="sidebar-profile-role">{doctor.role || 'Doctor'}</div>
        </div>
      </div>
    </aside>
  );
};

export default DoctorSidebar; 