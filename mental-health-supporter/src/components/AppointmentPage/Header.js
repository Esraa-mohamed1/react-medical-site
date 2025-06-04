import React from 'react';
import { FaUserMd } from 'react-icons/fa';
import './AppointmentPage.css';

export default function Header() {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
      <div>
        <h5 className="mb-0 text-primary">Appointment Schedule</h5>
        <small className="text-muted">Stay on top of your day</small>
      </div>
      <div className="d-flex align-items-center">
        <FaUserMd className="me-2 fs-4 text-info" />
        <span className="me-2 fw-bold">Dr. Clara Redfield</span>
        <img
          src="https://via.placeholder.com/32"
          alt="avatar"
          className="rounded-circle border"
        />
      </div>
    </div>
  );
}
