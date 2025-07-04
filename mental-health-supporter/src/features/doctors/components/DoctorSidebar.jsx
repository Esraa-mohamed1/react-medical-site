import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FaUserMd, FaCalendarAlt, FaUsers, FaRegClock, 
  FaFileAlt, FaComments, FaBell, FaCog, 
  FaUser, FaSignOutAlt, FaBars, FaTimes 
} from 'react-icons/fa';
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
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const doctor = JSON.parse(localStorage.getItem('loggedUser')) || { 
    username: 'Dr. Name', 
    role: 'doctor',
    full_name: 'Dr. Name',
    specialization: 'Doctor'
  };

  const profileImageSrc = doctor.profile_image || '/images/doctor.png';
  
  const handleProfileClick = () => {
    navigate('/doctor/profile');
    closeMobileMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-button"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside className={`doctor-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo">🩺</span>
          <span className="sidebar-title">Pearla</span>
          <button 
            className="sidebar-close-button"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3 className="nav-section-title">Main Menu</h3>
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
                onClick={closeMobileMenu}
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
                onClick={closeMobileMenu}
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
        
        <div className="sidebar-profile" onClick={handleProfileClick}>
          <img
            src={profileImageSrc}
            alt="Doctor"
            className="sidebar-avatar"
            onError={e => { e.target.onerror = null; e.target.src = '/images/doctor.png'; }}
          />
          <div className="profile-info">
            <div className="sidebar-profile-name">{doctor.full_name}</div>
            <div className="sidebar-profile-role">{doctor.specialization}</div>
          </div>
        </div>
      </aside>
      
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={closeMobileMenu}
          role="button"
          tabIndex="0"
          aria-label="Close menu"
        ></div>
      )}
    </>
  );
};

export default DoctorSidebar;