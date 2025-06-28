import React, { useState } from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaClinicMedical, FaSignOutAlt, FaCog, FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

const CustomNavbar = () => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
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
              <Nav.Link as={Link} to="/doctor-chats" className="text-success mx-2 fw-medium">
                {t('navbar.chats') || 'Chats'}
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
