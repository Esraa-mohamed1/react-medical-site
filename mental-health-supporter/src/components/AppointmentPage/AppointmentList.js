import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import emailjs from '@emailjs/browser';
import { appointments as appointmentData } from '../../data/appointments';
import './AppointmentPage.css';

const MySwal = withReactContent(Swal);

export default function AppointmentList() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [appointments, setAppointments] = useState([]);

  // Initialize appointments and check for duplicate IDs
  useEffect(() => {
    // Verify all IDs are unique
    const ids = appointmentData.map(appt => appt.id);
    const uniqueIds = new Set(ids);
    
    if (ids.length !== uniqueIds.size) {
      console.error('Warning: Duplicate appointment IDs found! This will cause update issues.');
      // Assign new unique IDs if duplicates exist
      const fixedAppointments = appointmentData.map((appt, index) => ({
        ...appt,
        id: appt.id + '-' + index // Append index to make unique
      }));
      setAppointments(fixedAppointments);
    } else {
      setAppointments([...appointmentData]);
    }
  }, []);

  const filteredAppointments = appointments.filter((appt) =>
    statusFilter === 'All' ? true : appt.status === statusFilter
  );

  const updateStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );
  };

  const handleApprove = async (appt) => {
    try {
      await emailjs.send(
        'service_8n9vwvi',
        'template_de8p6iu',
        {
          to_email: appt.email,
          to_name: appt.patient,
          date: appt.date,
          time: `${appt.start} - ${appt.end}`,
          subject: 'Appointment Approved',
          message: `Hello ${appt.patient}, your appointment on ${appt.date} at ${appt.start} has been approved.`
        },
        '5-PlVApTbA3Ploji7'
      );
      
      updateStatus(appt.id, 'Approved');
      await Swal.fire('Approved!',  'Email sent that approved appointment','success');
    } catch (err) {
      console.error('Error:', err);
      await Swal.fire('Error', 'error');
    }
  };

  const handleReject = async (appt) => {
    try {
      await emailjs.send(
        'service_8n9vwvi',
        'template_jqg3525',
        {
          to_email: appt.email,
          to_name: appt.patient,
          date: appt.date,
          time: `${appt.start} - ${appt.end}`,
          subject: 'Appointment Rejected',
          message: `Hello ${appt.patient}, your appointment on ${appt.date} at ${appt.start} has been rejected.`
        },
        '5-PlVApTbA3Ploji7'
      );
      
      updateStatus(appt.id, 'Rejected');
      await Swal.fire('Rejected', 'Email sent that reject appointment', 'info');
    } catch (err) {
      console.error('Error:', err);
      await Swal.fire('Error', 'Failed to update appointment.', 'error');
    }
  };

  const handleView = (appt) => {
    MySwal.fire({
      title: `<strong>Patient Information</strong>`,
      html: `
        <div style="text-align: left; font-size: 16px;">
          <p><strong>Name:</strong> ${appt.patient}</p>
          <p><strong>Email:</strong> ${appt.email}</p>
          <p><strong>Reason:</strong> ${appt.reason}</p>
          <p><strong>Date:</strong> ${appt.date} (${appt.day})</p>
          <p><strong>Time:</strong> ${appt.start} - ${appt.end}</p>
        </div>
      `,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Approve',
      denyButtonText: 'Reject',
      cancelButtonText: 'Close',
      customClass: {
        popup: 'rounded-xl shadow-lg',
        confirmButton: 'bg-success text-white px-4 py-2 rounded',
        denyButton: 'bg-danger text-white px-4 py-2 rounded',
        cancelButton: 'bg-secondary text-white px-4 py-2 rounded',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleApprove(appt);
      } else if (result.isDenied) {
        handleReject(appt);
      }
    });
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-primary mb-0">Appointment Records</h4>
        <select
          className="form-select w-auto shadow-sm rounded-pill px-3"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
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
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredAppointments.map((appt, index) => (
              <tr key={`${appt.id}-${index}`} className="table-row-custom">
                <td>{index + 1}</td>
                <td className="fw-semibold">{appt.patient}</td>
                <td className="text-muted">{appt.reason}</td>
                <td>
                  <span className="badge bg-light text-dark px-2 py-1 border">
                    {appt.start} - {appt.end}
                  </span>
                </td>
                <td>{appt.date}</td>
                <td>
                  <span className={`badge px-3 py-2 text-white rounded-pill me-2
                    ${appt.status === 'Approved' ? 'bg-primary' :
                      appt.status === 'Rejected' ? 'bg-danger' :
                      appt.status === 'Completed' ? 'bg-success' :
                      appt.status === 'Canceled' ? 'bg-secondary' :
                      appt.status === 'Waiting' ? 'bg-warning text-dark' : 'bg-light text-dark'}`}>
                    {appt.status}
                  </span>
                  {appt.status === 'Waiting' && (
                    <button
                      className="btn btn-sm btn-info text-white rounded-pill px-3"
                      onClick={() => handleView(appt)}
                    >
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}