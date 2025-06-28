import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import CustomNavbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import DoctorInfo from '../components/DoctorProfile/DoctorInfo';
import ClinicDetails from '../components/DoctorProfile/ClinicDetails';
import AppointmentBooking from '../components/DoctorProfile/AppointmentBooking';
import PatientReviews from '../components/DoctorProfile/PatientReviews';
import ContactInfo from '../components/DoctorProfile/ContactInfo';
import { fetchDoctorById } from '../services/api';
import Footer from "./../features/homePage/components/Footer";


const DoctorPage = () => {
  const { doctor_id } = useParams();
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getDoctor() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchDoctorById(doctor_id);
        setDoctorData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getDoctor();
  }, [doctor_id]);

  if (loading) return <div className="text-center my-5">Loading doctor information...</div>;
  if (error) return <div className="alert alert-danger text-center my-5">{error}</div>;
  if (!doctorData) return null;

  // You may need to adapt the following to match your backend's doctor data structure
  const clinicData = doctorData.clinic || {};
  const availableSlots = doctorData.availableSlots || [];
  const reviews = doctorData.reviews || [];
  const contactInfo = doctorData.contact || {};

  return (
    <div className="doctor-page-ltr">
      <CustomNavbar />
      <HeroSection doctor={doctorData} />
      <Container className="my-5">
        <Row>
          <Col lg={8}>
            <DoctorInfo doctor={doctorData} />
            <ClinicDetails clinic={doctorData} />
            {/* زر الدردشة يظهر فقط للمريض */}
            {(() => {
              const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
              const userRole = loggedUser ? loggedUser['role'] : null;
              if (userRole === 'patient') {
                return (
                  <div style={{ margin: '1.5rem 0', textAlign: 'center' }}>
                    <button
                      className="book-button"
                      style={{ background: 'linear-gradient(to right, #37ECBA, #72AFD3)', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: 30, padding: '0.8rem 2rem', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(114, 175, 211, 0.3)' }}
                      onClick={() => window.location.href = `/chat/${doctorData.doctor_id}`}
                    >
                      💬 Chat with Doctor
                    </button>
                  </div>
                );
              }
              return null;
            })()}
            <PatientReviews reviews={reviews} />
            <ContactInfo contact={contactInfo} />
          </Col>
          <Col lg={4}>
            <div className="sticky-top" style={{ top: '20px' }}>
              <AppointmentBooking doctorId={doctorData.doctor_id || doctor_id} />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default DoctorPage;