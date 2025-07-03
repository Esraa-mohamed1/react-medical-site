import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPatientDoctorAppointments } from '../services/doctors/AppointmentService';
import CustomNavbar from '../components/Navbar';
import Footer from '../features/homePage/components/Footer';
import './PatientDetailsPage.css';

const PatientAppointmentsPage = () => {
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctorId, setDoctorId] = useState('1'); // Default doctor_id, can be replaced with a selector

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        if (loggedUser && loggedUser.id && doctorId) {
          const data = await getPatientDoctorAppointments(loggedUser.id, doctorId);
          setAppointments(data);
        }
      } catch (err) {
        setError('Failed to fetch appointments.');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [loggedUser, doctorId]);

  return (
    <>
      <CustomNavbar />
      <div className="containerr">
        <div className="card">
          <div className="section">
            <h2 className="sectionTitle">My Appointments</h2>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="doctorId">Doctor ID: </label>
              <input
                id="doctorId"
                type="text"
                value={doctorId}
                onChange={e => setDoctorId(e.target.value)}
                style={{ borderRadius: '8px', padding: '0.2rem 0.5rem', border: '1px solid #b2dfdb' }}
              />
            </div>
            {loading ? (
              <div>Loading appointments...</div>
            ) : error ? (
              <div className="statusMessage error">{error}</div>
            ) : appointments.length === 0 ? (
              <div>No appointments found.</div>
            ) : (
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt.id}>
                      <td>{new Date(appt.appointment_date).toLocaleDateString()}</td>
                      <td>{new Date(appt.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                      <td>{appt.status}</td>
                      <td>
                        <button
                          className="chat-btn"
                          onClick={() => navigate(`/chat/${appt.doctor_id}/${appt.id}`)}
                        >
                          Chat with Doctor
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientAppointmentsPage; 