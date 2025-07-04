import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaUserMd, FaCalendarAlt, FaUsers, FaRegClock, FaFileAlt, FaComments, FaBell, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './DoctorSidebar.css';

const navLinks = [
  { to: '/doctor/dashboard', label: 'Dashboard', icon: <FaUserMd /> },
  { to: '/doctor/appointments', label: 'Appointments', icon: <FaCalendarAlt /> },
  { to: '/doctor/paid-patients', label: 'Patients', icon: <FaUsers /> },
  { to: '/doctor/availability', label: 'Schedule', icon: <FaRegClock /> },
  { to: '/doctor/documents', label: 'Documents', icon: <FaFileAlt /> },
  { to: '/doctor-chats', label: 'Messages', icon: <FaComments /> },
  { to: '/doctor/notifications', label: 'Notifications', icon: <FaBell /> },
];

const profileLinks = [
  { to: '/doctor/profile', label: 'View Profile', icon: <FaUser /> },
  { to: '/settings', label: 'Settings', icon: <FaCog /> },
];

const DoctorSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = JSON.parse(localStorage.getItem('loggedUser')) || { username: 'Dr. Name', role: 'doctor' };

  // Compact profile logic
  const profileImageSrc = doctor.profile_image || '/images/doctor.png';
  const handleProfileClick = () => {
    navigate('/doctor/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <aside className="doctor-sidebar">
      <div className="sidebar-header">
        <span className="sidebar-logo">🩺</span>
        <span className="sidebar-title">Pearla</span>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-section-title">Main Menu</h3>
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
        </div>
        <div className="nav-section">
          <h3 className="nav-section-title">Account</h3>
          {profileLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              <span className="sidebar-icon">{link.icon}</span>
              <span className="sidebar-label">{link.label}</span>
            </NavLink>
          ))}
          <button 
            className="sidebar-link logout-button"
            onClick={handleLogout}
          >
            <span className="sidebar-icon"><FaSignOutAlt /></span>
            <span className="sidebar-label">Logout</span>
          </button>
        </div>
      </nav>
      <div className="sidebar-profile" style={{ cursor: 'pointer' }} onClick={handleProfileClick}>
        <img
          src={profileImageSrc}
          alt="Doctor"
          className="sidebar-avatar"
          onError={e => { e.target.onerror = null; e.target.src = '/images/doctor.png'; }}
        />
        <div className="profile-info">
          <div className="sidebar-profile-name">{doctor.full_name || doctor.username || 'Dr. Name'}</div>
          <div className="sidebar-profile-role">{doctor.specialization || doctor.role || 'Doctor'}</div>
        </div>
      </div>
    </aside>
  );
};

export default DoctorSidebar;
