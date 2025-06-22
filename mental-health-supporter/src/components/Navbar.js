import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaClinicMedical, FaSignOutAlt, FaCog, FaTachometerAlt } from 'react-icons/fa';
import './Navbar.css';

const CustomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to detect URL changes
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('loggedUser')));
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleAuthChange = () => {
      setLoggedUser(JSON.parse(localStorage.getItem('loggedUser')));
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  let profileUrl = '';
  if (loggedUser && loggedUser.role && loggedUser.id) {
    if (loggedUser.role === 'doctor') {
      profileUrl = `/doctors/${loggedUser.id}`;
    } else if (loggedUser.role === 'patient') {
      profileUrl = `/patients-list/${loggedUser.id}`;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    window.dispatchEvent(new Event('authChange')); // Notify components
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

  const handleDashboardClick = () => {
    setShowDropdown(false);
    navigate('/doctor/dashboard');
  };

  return (
    <Navbar expand="lg" className="shadow-sm py-3" bg="white" dir="ltr">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaClinicMedical className="me-2" size={28} color="#6a0dad" />
          <span className="text-purple fw-bold fs-3">Pearla</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/doctors" className="nav-link">Doctors</Nav.Link>
            <Nav.Link as={Link} to="/articles" className="nav-link">Articles</Nav.Link>
          </Nav>
          <Nav>
            {loggedUser ? (
              <Dropdown align="end" show={showDropdown} onToggle={handleDropdownToggle}>
                <Dropdown.Toggle variant="primary" className="d-flex align-items-center">
                  <FaUser className="me-2" />
                  {loggedUser.name || 'User'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {loggedUser.role === 'doctor' ? (
                    <Dropdown.Item onClick={handleDashboardClick}>
                      <FaTachometerAlt className="me-2" />
                      Dashboard
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item onClick={handleProfileClick} disabled={!profileUrl}>
                      <FaUser className="me-2" />
                      My Profile
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={handleAccountSettings}>
                    <FaCog className="me-2" />
                    Account Settings
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-dark mx-2 fw-medium">Login</Nav.Link>
                <Nav.Link as={Link} to="/register" className="text-dark mx-2 fw-medium">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
