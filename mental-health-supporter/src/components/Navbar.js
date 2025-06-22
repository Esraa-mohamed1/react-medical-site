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
            {loggedUser && loggedUser.role && loggedUser.id ? (
              <Dropdown show={showDropdown} onToggle={(isOpen) => setShowDropdown(isOpen)}>
                <Dropdown.Toggle as={Nav.Link} className="dropdown-toggle-no-caret">
                  <div className="profile-icon">
                    <FaUser size={24} />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Item as={Link} to={profileUrl}>
                    <FaUser className="me-2" /> View Profile
                  </Dropdown.Item>
                  {loggedUser.role === 'doctor' && (
                    <Dropdown.Item onClick={handleDashboardClick}>
                      <FaTachometerAlt className="me-2" /> Dashboard
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
                <Nav.Link as={Link} to="/register-select" className="nav-link">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
