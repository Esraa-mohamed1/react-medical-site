import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DoctorSidebar from '../components/DoctorSidebar';
import PatientDetailsModal from '../components/PatientDetailsModal';
import { getPaidPatients, getAppointmentRecords } from '../../../services/doctors/AppointmentService';

const DoctorPatientDetailsPage = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      setLoading(true);
      setError(null);
      try {
        // Try to get all paid appointments and find the one with the matching id
        const appts = await getPaidPatients();
        const found = appts.find(a => String(a.id) === String(appointmentId));
        if (!found) throw new Error('Appointment not found');
        setAppointment(found);
      } catch (err) {
        setError('Failed to load appointment.');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [appointmentId]);

  if (loading) return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main enhanced-main-container d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );

  if (error || !appointment) return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main enhanced-main-container text-center p-5">
        <h3 className="fw-bold text-dark mb-3">Appointment Not Found</h3>
        <p className="text-muted">{error || 'The requested appointment could not be loaded.'}</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/doctor/paid-patients')}>Back to Patients</button>
      </div>
    </div>
  );

  return (
    <div className="doctor-dashboard-bg" style={{ minHeight: '100vh', display: 'flex' }}>
      <DoctorSidebar />
      <div className="doctor-dashboard-main enhanced-main-container" style={{ flex: 1, padding: '2rem' }}>
        <PatientDetailsModal show={true} onHide={() => navigate('/doctor/paid-patients')} appointment={appointment} />
      </div>
    </div>
  );
};

export default DoctorPatientDetailsPage; 