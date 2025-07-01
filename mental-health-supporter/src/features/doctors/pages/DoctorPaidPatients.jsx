import React, { useEffect, useState } from 'react';
import { getPaidPatients } from '../../../services/doctors/AppointmentService';
import CustomNavbar from '../../../components/Navbar';
import Footer from '../../homePage/components/Footer';
import PatientCard from '../components/PatientCard';
import PatientDetailsModal from '../components/PatientDetailsModal';
import './style.css';

const DoctorPaidPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const data = await getPaidPatients();
        setPatients(data);
      } catch (err) {
        setError('Failed to fetch paid patients.');
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleCardClick = (appt) => {
    setSelectedAppointment(appt);
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
    setSelectedAppointment(null);
  };

  const refreshPatients = async () => {
    try {
      setLoading(true);
      const data = await getPaidPatients();
      setPatients(data);
    } catch (err) {
      setError('Failed to fetch paid patients.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'radial-gradient(circle at top left, #e0f7fa, #e8eaf6, #f3e5f5)', minHeight: '100vh' }}>
      <CustomNavbar />
      <div className="container py-5">
        <h1 className="fw-bold text-dark display-5 mb-3 text-center">My Paid Patients</h1>
        <p className="text-muted text-center mb-4">Welcome, Doctor! Here are your paid patients and their appointment details.</p>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '40vh' }}>
            <div className="spinner-border text-info" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : patients.length === 0 ? (
          <div className="alert alert-info text-center">No paid patients found.</div>
        ) : (
          <div className="row g-4">
            {patients.map((appt) => (
              <div className="col-md-6 col-lg-4" key={appt.id}>
                <PatientCard appointment={appt} onClick={handleCardClick} />
              </div>
            ))}
          </div>
        )}
      </div>
      <PatientDetailsModal
        show={modalShow}
        onHide={handleModalClose}
        appointment={selectedAppointment}
        onUpdate={refreshPatients}
      />
      <Footer />
    </div>
  );
};

export default DoctorPaidPatients; 