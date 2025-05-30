import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaClinicMedical } from 'react-icons/fa';

const CustomNavbar = () => {
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
            <Nav.Link as={Link} to="/doctors" className="text-dark mx-2 fw-medium">Doctors</Nav.Link>
            {/* <Nav.Link as={Link} to="/clinics" className="text-dark mx-2 fw-medium">Clinics</Nav.Link> */}
            <Nav.Link as={Link} to="/contact" className="text-dark mx-2 fw-medium">Contact</Nav.Link>
          </Nav>
          <div className="d-flex gap-2">
            {/* <Button variant="outline-primary" className="d-flex align-items-center">
              <FaSignInAlt className="me-2" />
              Login
            </Button>
            <Button variant="primary" className="d-flex align-items-center">
              <FaUser className="me-2" />
              Register
            </Button> */}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
