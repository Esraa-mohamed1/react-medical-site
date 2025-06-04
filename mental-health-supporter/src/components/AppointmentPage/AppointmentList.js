import React from 'react';
import { appointments } from '../../data/appointments';
import './AppointmentPage.css';

export default function AppointmentList() {
  return (
    <div className="container py-4">
      <h5 className="mb-4">All Appointments</h5>
      <table className="table table-bordered table-hover bg-white">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Patient</th>
            <th>Reason</th>
            <th>Time</th>
            <th>Day</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt, index) => (
            <tr key={appt.id}>
              <td>{index + 1}</td>
              <td>{appt.patient}</td>
              <td>{appt.reason}</td>
              <td>{appt.start} - {appt.end}</td>
              <td>{appt.day}</td>
              <td>
                <span className={`badge status-${appt.status.toLowerCase()}`}>
                  {appt.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
