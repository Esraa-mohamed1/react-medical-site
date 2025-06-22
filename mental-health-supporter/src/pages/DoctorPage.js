import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import CustomNavbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import DoctorInfo from '../components/DoctorProfile/DoctorInfo';
import ClinicDetails from '../components/DoctorProfile/ClinicDetails';
import AppointmentBooking from '../components/DoctorProfile/AppointmentBooking';
import PatientReviews from '../components/DoctorProfile/PatientReviews';
import ContactInfo from '../components/DoctorProfile/ContactInfo';
import { fetchDoctorById } from '../services/api';

const DoctorPage = () => {
  const { doctor_id } = useParams();
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { t } = useTranslation();

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

  if (loading) return <div className="text-center my-5">{t('doctorPage.loading')}</div>;
  if (error) return <div className="alert alert-danger text-center my-5">{t('doctorPage.error', { error })}</div>;
  if (!doctorData) return null;

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
            <ClinicDetails clinic={clinicData} />
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
      <footer className="bg-dark text-white py-4">
        <Container>
          <div className="text-center">
            <p className="mb-0">{t('doctorPage.footer')}</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default DoctorPage;
