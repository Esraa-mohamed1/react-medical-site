import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaClinicMedical, FaSignOutAlt, FaCog, FaGlobe } from 'react-icons/fa';
import { BsChatDots, BsBell } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import './Navbar.css';
import useSupabaseNotifications from '../useSupabaseNotifications';
import useUserNotifications from '../useUserNotifications';

const CustomNavbar = () => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  let profileUrl = '';
  if (loggedUser && loggedUser.role && loggedUser.id) {
    if (loggedUser.role === 'doctor') {
      profileUrl = `/doctors-list/${loggedUser.id}`;
    } else if (loggedUser.role === 'patient') {
      profileUrl = `/patients-list/${loggedUser.id}`;
    }
  }

  const changeLanguage = (lng) => {
    document.body.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  /**
   * changeMarginDirection: set margin direction based on current language
   * @param {margin value of right / left margins} marginVal 
   * @returns 
   */
  const changeMarginDirection = (marginVal) => {
    return i18n.language === 'en' ? `me-${marginVal}` : `ms-${marginVal}`
  }

  const handleLogout = () => {
    localStorage.clear();
    setShowDropdown(false);
    navigate('/login');
  };

  const handleAccountSettings = () => {
    setShowDropdown(false);
    navigate('/settings');
  };

  const handleProfileClick = () => {
    setShowDropdown(false);
    if (profileUrl) {
      navigate(profileUrl);
    }
  };

  const handleDropdownToggle = (isOpen) => {
    setShowDropdown(isOpen);
  };

  // Listen for notifications if user is logged in
  useSupabaseNotifications(loggedUser?.id);
  const [notifications, setNotifications] = useState([]);

  // Fetch all notifications for the user when the dropdown is opened
  useEffect(() => {
    const fetchNotifications = async () => {
      if (loggedUser?.user_id && showNotifications) {
        const { data, error } = await import('../supabaseClient').then(m => m.supabase)
          .then(supabase =>
            supabase
              .from('notifications')
              .select('*')
              .eq('user_id', loggedUser.user_id)
              .order('created_at', { ascending: false })
          );
        if (!error && data) setNotifications(data);
      }
    };
    fetchNotifications();
  }, [loggedUser?.user_id, showNotifications]);

  // Real-time updates: add new notifications to the list
  useSupabaseNotifications(loggedUser?.user_id, (newNotification) => {
    setNotifications((prev) => [newNotification, ...prev]);
  });

  return (
    <Navbar expand="lg" className="shadow-sm py-3" bg="white">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaClinicMedical className={changeMarginDirection(2)} size={28} color="green" />
          <span className="text-success fw-bold fs-3">{t('navbar.brand')}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={changeMarginDirection('auto')}>
            <Nav.Link as={Link} to="/" className="text-success mx-2 fw-medium">{t('navbar.home')}</Nav.Link>
            <Nav.Link as={Link} to={loggedUser?.role === 'doctor' ? "/doctor/appointments" : "/doctors-list"} className="text-success mx-2 fw-medium">{loggedUser?.role === 'doctor' ? t('navbar.Appointments') : t('navbar.doctors')}</Nav.Link>
            <Nav.Link as={Link} to={loggedUser?.role === 'doctor' ? "/doctor/availability" : "/artical"} className="text-success mx-2 fw-medium">{loggedUser?.role === 'doctor' ? t('navbar.SetTimes') : t('navbar.articles')}</Nav.Link>
            {/* Doctor chat link - only for doctors */}
            {loggedUser?.role === 'doctor' && (
              <Nav.Link as={Link} to="/doctor-chats" className="text-success mx-2 fw-medium" title={t('navbar.chats') || 'Chats'}>
                {/* React-icons Bootstrap chat icon */}
                <BsChatDots style={{ fontSize: '1.3rem', verticalAlign: 'middle' }} />
              </Nav.Link>
            )}
            {/* Doctor paid patients link - only for doctors */}
            {loggedUser?.role === 'doctor' && (
              <Nav.Link as={Link} to="/doctor/paid-patients" className="text-success mx-2 fw-medium">
                {t('navbar.myPatients') || 'My Patients'}
              </Nav.Link>
            )}
          </Nav>

          {/* Language Switcher */}
          <Dropdown align="end" className={changeMarginDirection(3)}>
            <Dropdown.Toggle variant="outline-light" className={`d-flex align-items-center text-success custom-dropdown-toggle`}>
              <FaGlobe className={changeMarginDirection(2)} />
              {i18n.language === 'ar' ? 'ع' : language.toUpperCase()}
            </Dropdown.Toggle>
            <Dropdown.Menu className='text-success'>
              <Dropdown.Item className='text-success' onClick={() => changeLanguage('en')}>{t('navbar.english')}</Dropdown.Item>
              <Dropdown.Item className='text-success' onClick={() => changeLanguage('ar')}>{t('navbar.arabic')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {loggedUser && loggedUser.role && loggedUser.id ? (
            <Dropdown align="end" show={showDropdown} onToggle={handleDropdownToggle}>
              <Dropdown.Toggle variant="primary" className="d-flex align-items-center">
                <FaUser className={changeMarginDirection(2)} />
                {loggedUser['username'] || 'User'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleProfileClick} disabled={!profileUrl}>
                  <FaUser className={changeMarginDirection(2)} />
                  {t('navbar.viewProfile')}
                </Dropdown.Item>
                <Dropdown.Item onClick={handleAccountSettings}>
                  <FaCog className={changeMarginDirection(2)} />
                  {t('navbar.accountSettings')}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="text-danger">
                  <FaSignOutAlt className={changeMarginDirection(2)} />
                  {t('navbar.logout')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/login" className="text-success mx-2 fw-medium">{t('navbar.login')}</Nav.Link>
              <Nav.Link as={Link} to="/register-select" className="text-success mx-2 fw-medium">{t('navbar.register')}</Nav.Link>
            </Nav>
          )}

          {/* Notification icon for all logged in users */}
          {loggedUser && loggedUser.id && (
            <div style={{ position: 'relative', display: 'inline-block', margin: '0 10px', cursor: 'pointer' }} onClick={() => setShowNotifications((prev) => !prev)}>
              <BsBell size={22} />
              {notifications.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
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
              {/* Notification dropdown */}
              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '30px',
                  background: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  zIndex: 1000,
                  minWidth: '250px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  borderRadius: '8px',
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
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
