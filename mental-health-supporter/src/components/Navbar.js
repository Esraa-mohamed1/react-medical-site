import React, { useState } from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaClinicMedical, FaSignOutAlt, FaCog, FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';


const CustomNavbar = () => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    document.body.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  if (!loggedUser || !loggedUser.role || !loggedUser.id) {
    return null; // لا تظهر الـ Navbar إذا لم تتوفر بيانات المستخدم
  }
  let profileUrl = '';
  if (loggedUser.role === 'doctor') {
    profileUrl = `/doctors/${loggedUser.id}`;
  } else if (loggedUser.role === 'patient') {
    profileUrl = `/patients-list/${loggedUser.id}`;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleAccountSettings = () => {
    navigate('/settings');
  };

  /**
   * changeMarginDirection: set margin direction based on current language
   * @param {margin value of right / left margins} marginVal 
   * @returns 
   */
  const changeMarginDirection = (marginVal) => {
    return i18n.language === 'en' ? `me-${marginVal}` : `ms-${marginVal}`
  }

  return (
    <Navbar expand="lg" className="shadow-sm py-3" bg="white">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaClinicMedical className={changeMarginDirection(2)} size={28} color="#6a0dad" />
          <span className="text-purple fw-bold fs-3">Pearla</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={changeMarginDirection('auto')}>
            <Nav.Link as={Link} to="/" className="text-dark mx-2 fw-medium">{t('navbar.home')}</Nav.Link>
            {loggedUser['role'] !== 'doctor' && <Nav.Link as={Link} to="/doctors-list" className="text-dark mx-2 fw-medium">{t('navbar.doctors')}</Nav.Link>}
            <Nav.Link as={Link} to="/contact" className="text-dark mx-2 fw-medium">{t('navbar.contactUs')}</Nav.Link>
          </Nav>

          {/* Language Switcher */}
          <Dropdown align="end" className={changeMarginDirection(3)}>
            <Dropdown.Toggle variant="outline-secondary" className="d-flex align-items-center">
              <FaGlobe className={changeMarginDirection(2)} />
              {language.toUpperCase()}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => changeLanguage('en')}>English</Dropdown.Item>
              <Dropdown.Item onClick={() => changeLanguage('ar')}>العربية</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown align="end">
            <Dropdown.Toggle variant="primary" className="d-flex align-items-center">
              <FaUser className={changeMarginDirection(2)} />
              {loggedUser['name']}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ textAlign: language === 'ar' ? 'right' : '' }}>
              <Dropdown.Item as={Link} to={profileUrl}>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;