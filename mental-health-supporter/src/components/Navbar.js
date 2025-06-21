import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaClinicMedical, FaSignOutAlt, FaCog, FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';

const CustomNavbar = ({ t }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState(i18n.language || 'en');

  const loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || {};
  const profileUrl = loggedUser.role === 'patient'
    ? `/patients-list/${loggedUser.id}`
    : `/doctors-list/${loggedUser.id}`;

  useEffect(() => {
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleAccountSettings = () => {
    navigate('/settings');
  };

  return (
    <Navbar expand="lg" className="custom-navbar shadow-sm py-3" bg="white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Container fluid className="d-flex align-items-center justify-content-between flex-wrap">

        {/* Logo */}
        <div className={language === 'ar' ? 'order-3 ms-3' : 'order-1 me-3'}>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <FaClinicMedical className="me-2" size={28} color="#6a0dad" />
            <span className="text-purple fw-bold fs-3">Pearla</span>
          </Navbar.Brand>
        </div>

        {/* Navigation Links */}
        <div className="order-2 flex-grow-1 d-flex justify-content-center">
          <Nav className="flex-row">
            <Nav.Link as={Link} to="/" className="text-dark mx-2 fw-medium">{t('navbar.home')}</Nav.Link>
            <Nav.Link as={Link} to="/doctors-list" className="text-dark mx-2 fw-medium">{t('navbar.doctors')}</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="text-dark mx-2 fw-medium">{t('navbar.contactUs')}</Nav.Link>
          </Nav>
        </div>

        {/* Language & User Dropdown */}
        <div className={language === 'ar' ? 'order-1 me-auto d-flex align-items-center' : 'order-3 ms-auto d-flex align-items-center'}>
          {/* Language Switcher */}
          <Dropdown align="end" className="mx-2">
            <Dropdown.Toggle variant="outline-secondary" className="d-flex align-items-center">
              <FaGlobe className="me-2" />
              {language.toUpperCase()}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => changeLanguage('en')}>English</Dropdown.Item>
              <Dropdown.Item onClick={() => changeLanguage('ar')}>العربية</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* User Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle variant="primary" className="d-flex align-items-center">
              <FaUser className="me-2" />
              {loggedUser['name']}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={profileUrl}>
                <FaUser className="me-2" />
                profile
              </Dropdown.Item>
              <Dropdown.Item onClick={handleAccountSettings}>
                <FaCog className="me-2" />
                {t('navbar.settings')}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className="text-danger">
                <FaSignOutAlt className="me-2" />
                {t('navbar.logout')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>

    </Navbar>

  );
};

export default withTranslation()(CustomNavbar);
