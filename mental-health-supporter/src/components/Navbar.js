import React from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaClinicMedical, FaSignOutAlt, FaCog } from 'react-icons/fa';

const CustomNavbar = () => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const profileUrl = loggedUser['role'] === 'patient' ? `/patients-list/${loggedUser['id']}` : `/doctors-list/${loggedUser['id']}`;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleAccountSettings = () => {
    navigate('/settings');
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
            <Nav.Link as={Link} to="/" className="text-dark mx-2 fw-medium">Home</Nav.Link>
            <Nav.Link as={Link} to="/doctors-list" className="text-dark mx-2 fw-medium">Doctors</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="text-dark mx-2 fw-medium">Contact</Nav.Link>
          </Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="primary" className="d-flex align-items-center">
              <FaUser className="me-2" />
              {loggedUser['name']}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={profileUrl}>
                <FaUser className="me-2" />
                View Profile
              </Dropdown.Item>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
