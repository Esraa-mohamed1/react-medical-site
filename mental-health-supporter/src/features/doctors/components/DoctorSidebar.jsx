import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiCalendar, FiUser, FiClock, FiLogOut } from 'react-icons/fi';
import './DoctorSidebar.css';

const DoctorSidebar = ({ onLogout }) => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark vh-100 position-fixed" style={{ width: '280px' }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">Doctor Dashboard</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/doctor/appointments" className="nav-link text-white" activeClassName="active">
            <FiCalendar className="me-2" />
            Appointments
          </NavLink>
        </li>
        <li>
          <NavLink to="/doctor/availability" className="nav-link text-white" activeClassName="active">
            <FiClock className="me-2" />
            Availability
          </NavLink>
        </li>
        <li>
          <NavLink to="/doctor/profile" className="nav-link text-white" activeClassName="active">
            <FiUser className="me-2" />
            Profile
          </NavLink>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <button onClick={onLogout} className="d-flex align-items-center text-white text-decoration-none w-100 btn btn-dark text-start">
          <FiLogOut className="me-2" />
          <strong>Logout</strong>
        </button>
      </div>
    </div>
  );
};

export default DoctorSidebar; 