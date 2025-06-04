import React from 'react';
import {
  FaCalendarAlt,
  FaUser,
  FaFileAlt,
  FaClinicMedical,
  FaThLarge,
  FaList,
} from 'react-icons/fa';
import './AppointmentPage.css';

export default function Sidebar({ onToggleView, activeView }) {
  return (
    <div className="sidebar bg-light p-3 vh-100 border-end d-flex flex-column justify-content-between">
      <div>
        <h4 className="mb-4 d-flex align-items-center">
          <FaClinicMedical className="me-2 text-primary" /> Medicare
        </h4>
        <ul className="nav flex-column mb-4">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              <FaCalendarAlt className="me-2" />
              Appointment
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <FaUser className="me-2" />
              Patient
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <FaFileAlt className="me-2" />
              Report
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <FaClinicMedical className="me-2" />
              Clinic
            </a>
          </li>
        </ul>
      </div>

      {/* View Toggle Buttons */}
      <div className="mt-auto">
        <button
          className={`btn w-100 mb-2 ${activeView === 'calendar' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onToggleView('calendar')}
        >
          <FaThLarge className="me-2" />
          Calendar
        </button>
        <button
          className={`btn w-100 ${activeView === 'list' ? 'btn-secondary' : 'btn-outline-secondary'}`}
          onClick={() => onToggleView('list')}
        >
          <FaList className="me-2" />
          List
        </button>
      </div>
    </div>
  );
}
