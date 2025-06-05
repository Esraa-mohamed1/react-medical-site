import React, { useState } from 'react';
import { appointments } from '../../data/appointments';
import './AppointmentPage.css';

export default function AppointmentList() {
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredAppointments = appointments.filter((appt) =>
    statusFilter === 'All' ? true : appt.status === statusFilter
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-primary mb-0">Appointment Records</h4>

        {/* Filter Dropdown */}
        <select
          className="form-select w-auto shadow-sm rounded-pill px-3"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Canceled">Canceled</option>
          <option value="Waiting">Waiting</option>
        </select>
      </div>

      <div className="table-responsive shadow rounded-4 overflow-hidden bg-white">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-primary text-center">
            <tr>
              <th>#</th>
              <th>Patient</th>
              <th>Reason</th>
              <th>Time</th>
              <th>Day</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredAppointments.map((appt, index) => (
              <tr key={appt.id} className="table-row-custom">
                <td>{index + 1}</td>
                <td className="fw-semibold">{appt.patient}</td>
                <td className="text-muted">{appt.reason}</td>
                <td>
                  <span className="badge bg-light text-dark px-2 py-1 border">
                    {appt.start} - {appt.end}
                  </span>
                </td>
                <td>{appt.day}</td>
                <td>
                  <span className={`badge status-${appt.status.toLowerCase()} me-2`}>
                    {appt.status}
                  </span>
                  {appt.status === 'Waiting' && (
                    <button className="btn btn-sm btn-info text-white rounded-pill px-3">
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredAppointments.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  No appointments found for "<strong>{statusFilter}</strong>"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
