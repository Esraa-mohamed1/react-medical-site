import React from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserMd, FaCalendarAlt, FaUsers, FaRegClock, FaFileAlt, FaComments, FaPills, FaBell, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { BsBell } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import useSupabaseNotifications from '../../../useSupabaseNotifications';
import './DoctorSidebar.css';

const navLinks = [
  { to: '/doctor/dashboard', label: 'Dashboard', icon: <FaUserMd /> },
  { to: '/doctor/appointments', label: 'Appointments', icon: <FaCalendarAlt /> },
  { to: '/doctor/paid-patients', label: 'Patients', icon: <FaUsers /> },
  { to: '/doctor/availability', label: 'Schedule', icon: <FaRegClock /> },
  { to: '/doctor/documents', label: 'Documents', icon: <FaFileAlt /> },
  { to: '/doctor-chats', label: 'Messages', icon: <FaComments /> },
  // Notifications will be handled separately below
];

const profileLinks = [
  { to: '/doctor/profile', label: 'View Profile', icon: <FaUser /> },
  { to: '/settings', label: 'Settings', icon: <FaCog /> },
];

const DoctorSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = JSON.parse(localStorage.getItem('loggedUser')) || { username: 'Dr. Name', role: 'doctor' };
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Listen for notifications if user is logged in
  useSupabaseNotifications(doctor?.id);

  // Fetch all notifications for the user when the dropdown is opened
  useEffect(() => {
    const fetchNotifications = async () => {
      if (doctor?.user_id && showNotifications) {
        const { data, error } = await import('../../../supabaseClient').then(m => m.supabase)
          .then(supabase =>
            supabase
              .from('notifications')
              .select('*')
              .eq('user_id', doctor.user_id)
              .order('created_at', { ascending: false })
          );
        if (!error && data) setNotifications(data);
      }
    };
    fetchNotifications();
  }, [doctor?.user_id, showNotifications]);

  // Real-time updates: add new notifications to the list
  useSupabaseNotifications(doctor?.user_id, (newNotification) => {
    setNotifications((prev) => [newNotification, ...prev]);
  });

  // Compact profile logic
  const profileImageSrc = doctor.profile_image || '/images/doctor.png';
  const handleProfileClick = () => {
    navigate('/doctor/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('loggedUser');
    navigate('/login');
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
          {/* Notification icon with dropdown */}
          <div style={{ position: 'relative', display: 'block', margin: '10px 0', cursor: 'pointer' }}>
            <div
              className="sidebar-link"
              style={{ display: 'flex', alignItems: 'center' }}
              onClick={() => setShowNotifications((prev) => !prev)}
            >
              <span className="sidebar-icon"><BsBell /></span>
              <span className="sidebar-label">Notifications</span>
              {notifications.length > 0 && (
                <span style={{
                  marginLeft: '8px',
                  background: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  minWidth: '20px',
                  textAlign: 'center',
                  marginRight: 'auto',
                }}>{notifications.length}</span>
              )}
            </div>
            {showNotifications && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '40px',
                background: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                zIndex: 1000,
                minWidth: '250px',
                maxHeight: '300px',
                overflowY: 'auto',
                borderRadius: '8px',
                left: 'unset',
              }}>
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
          {/* Logout button at the bottom of the sidebar */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '16px 0', background: 'inherit' }}>
            <button 
              className="sidebar-link logout-button text-danger"
              onClick={handleLogout}
              style={{ background: 'none', border: 'none', width: '100%', textAlign: 'start', padding: 0, margin: 0, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              <span className="sidebar-icon"><FaSignOutAlt /></span>
              <span className="sidebar-label">Logout</span>
            </button>
          </div>
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
