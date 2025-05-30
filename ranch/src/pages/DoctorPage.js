import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CustomNavbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import DoctorInfo from '../components/DoctorProfile/DoctorInfo';
import ClinicDetails from '../components/DoctorProfile/ClinicDetails';
import AppointmentBooking from '../components/DoctorProfile/AppointmentBooking';
import PatientReviews from '../components/DoctorProfile/PatientReviews';
import ContactInfo from '../components/DoctorProfile/ContactInfo';

const DoctorPage = () => {
  // Doctor data
  const doctorData = {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    profilePicture: '/images/1.jpeg',
    bio: 'Board-certified cardiologist with 12 years of experience. Specializes in preventive cardiology and heart failure management. Completed fellowship at Mayo Clinic.',
    rating: 4.9,
    experience: 12,
    reviewsCount: 215,
    education: [
      'MD - Harvard Medical School',
      'Residency - Massachusetts General Hospital',
      'Fellowship - Mayo Clinic'
    ],
    languages: ['English', 'Spanish']
  };

  // Clinic data
  const clinicData = {
    name: 'HeartCare Specialists',
    address: '123 Medical Center Drive, Boston, MA 02115',
    fees: '$250',
    services: [
      'Cardiac Consultation',
      'Echocardiography',
      'Stress Testing',
      'Holter Monitoring',
      'Preventive Cardiology'
    ],
    openingHours: 'Monday-Friday: 8:00 AM - 5:00 PM'
  };

  // Available slots
  const availableSlots = [
    '9:00 AM - 9:30 AM',
    '10:00 AM - 10:30 AM',
    '11:00 AM - 11:30 AM',
    '2:00 PM - 2:30 PM',
    '3:00 PM - 3:30 PM'
  ];

  // Reviews data
  const reviews = [
    {
      id: 1,
      patientName: 'Michael Brown',
      rating: 5,
      comment: 'Dr. Johnson is extremely knowledgeable and took the time to explain everything clearly. The clinic is modern and well-equipped.',
      date: 'March 15, 2023'
    },
    {
      id: 2,
      patientName: 'Emily Wilson',
      rating: 5,
      comment: 'Excellent bedside manner and thorough examination. I felt completely comfortable throughout my visit.',
      date: 'February 28, 2023'
    }
  ];

  // Contact info
  const contactInfo = {
    phone: '(617) 555-0123',
    email: 'info@heartcare.com',
    address: '123 Medical Center Drive, Boston, MA 02115',
    mapLink: 'https://maps.example.com',
    socialMedia: {
      facebook: 'https://facebook.com/heartcare',
      twitter: 'https://twitter.com/heartcare',
      instagram: 'https://instagram.com/heartcare'
    }
  };

  return (
    <div className="doctor-page-ltr">
      <CustomNavbar />
      <HeroSection doctor={doctorData} />
      
      <Container className="my-5">
        <Row>
          {/* Left Column - Doctor Info and Details */}
          <Col lg={4}>
             <div className="sticky-top" style={{ top: '20px' }}>
              <AppointmentBooking slots={availableSlots} />
            </div>
           
          </Col>
          
          {/* Right Column - Appointment Booking */}
          <Col lg={8}>
          <DoctorInfo doctor={doctorData} />
            <ClinicDetails clinic={clinicData} />
            <PatientReviews reviews={reviews} />
            <ContactInfo contact={contactInfo} />
          </Col>
        </Row>
      </Container>
      
      <footer className="bg-dark text-white py-4">
        <Container>
          <div className="text-center">
            <p className="mb-0">© 2023 HeartCare Specialists. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default DoctorPage;