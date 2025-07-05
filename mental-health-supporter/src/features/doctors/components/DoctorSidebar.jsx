import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FaUserMd, FaCalendarAlt, FaUsers, FaRegClock, 
  FaFileAlt, FaComments, FaBell, FaCog, 
  FaUser, FaSignOutAlt, FaBars, FaTimes 
} from 'react-icons/fa';
import { BsBell } from 'react-icons/bs';
import useSupabaseNotifications from '../../../useSupabaseNotifications';
import './DoctorSidebar.css';

// Notification dropdown styles (inline for now, can move to CSS)
const notificationDropdownStyle = {
  position: 'absolute',
  right: 0,
  top: '30px',
  background: 'white',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  zIndex: 1000,
  minWidth: '250px',
  maxHeight: '300px',
  overflowY: 'auto',
  borderRadius: '8px'
};

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
  // Notifications logic (copied from Navbar)
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  // Use doctor.id or doctor.user_id for notifications
  const userId = doctor?.user_id || doctor?.id;
  useSupabaseNotifications(userId, (newNotification) => {
    setNotifications((prev) => [newNotification, ...prev]);
  });
  // Fetch all notifications for the user when the dropdown is opened
  useEffect(() => {
    const fetchNotifications = async () => {
      if (userId && showNotifications) {
        const { data, error } = await import('../../../supabaseClient').then(m => m.supabase)
          .then(supabase =>
            supabase
              .from('notifications')
              .select('*')
              .eq('user_id', userId)
              .order('created_at', { ascending: false })
          );
        if (!error && data) setNotifications(data);
      }
    };
    fetchNotifications();
  }, [userId, showNotifications]);

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
            {navLinks.map(link => {
              if (link.label === 'Notifications') {
                return (
                  <div key={link.to} style={{ position: 'relative' }}>
                    <button
                      className="sidebar-link"
                      style={{ width: '100%', textAlign: 'right', background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', position: 'relative' }}
                      onClick={() => setShowNotifications((prev) => !prev)}
                    >
                      <span className="sidebar-icon"><BsBell /></span>
                      <span className="sidebar-label">{link.label}</span>
                      {notifications.length > 0 && (
                        <span style={{
                          position: 'absolute',
                          top: '2px',
                          left: '10px',
                          background: 'red',
                          color: 'white',
                          borderRadius: '50%',
                          padding: '2px 6px',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          minWidth: '20px',
                          textAlign: 'center',
                        }}>{notifications.length}</span>
                      )}
                    </button>
                    {showNotifications && (
                      <div style={notificationDropdownStyle}>
                        <div style={{ padding: '10px', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>Notifications</div>
                        {notifications.length === 0 ? (
                          <div style={{ padding: '10px', color: '#888' }}>No notifications</div>
                        ) : (
                          notifications.map((n, i) => (
                            <div key={n.id || i} style={{ padding: '10px', borderBottom: '1px solid #eee', fontSize: '0.95rem' }}>
                              {n.message}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
                  onClick={closeMobileMenu}
                >
                  <span className="sidebar-icon">{link.icon}</span>
                  <span className="sidebar-label">{link.label}</span>
                </NavLink>
              );
            })}
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