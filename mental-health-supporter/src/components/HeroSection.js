import React from 'react';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaPhoneAlt } from 'react-icons/fa';
// import doctorImage from '../assets/images/doctor.jpg';

const HeroSection = ({ doctor }) => {
  // Doctor profile image (circle)
  const profileImage = doctor.profile_image || '/images/1.jpeg';
  return (
    <motion.div 
      className="hero-class py-5 text-white"
      style={{
        background: 'linear-gradient(135deg, #6D5ACF 0%, #4D3ACF 100%)',
        position: 'relative',
        minHeight: '400px',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      dir="rtl"
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row align-items-center flex-row-reverse">
          <div className="col-lg-7 text-start d-flex flex-column align-items-start align-items-lg-end">
            <div className="mb-4" style={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
              <img
                src={profileImage}
                alt={doctor.full_name || doctor.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            </div>
            <div className="d-flex align-items-center w-100 mb-3 flex-wrap flex-row-reverse" style={{gap: 16}}>
              <motion.h1 
                className="display-4 fw-bold mb-0"
                initial={{ x: 50 }} 
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
                style={{ whiteSpace: 'nowrap' }}
              >
                {doctor.full_name || doctor.name}
              </motion.h1>
              <div className="d-flex gap-2 ms-auto">
                <Button 
                  href="#booking" 
                  variant="light" 
                  className="fw-semibold d-flex align-items-center"
                  style={{ color: '  #2A5C5F' }}  
                >
                  <FaCalendarAlt className="ms-2" />
                  Book Appointment
                </Button>
                <Button 
                  variant="outline-light" 
                  className="d-flex align-items-center"
                  style={{ color: '  #2A5C5F' }}   
                >
                  <FaPhoneAlt className="ms-2"/>
                  Contact Doctor
                </Button>
              </div>
            </div>

            <motion.div
              className="d-flex align-items-center mb-4 justify-content-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="badge bg-light fs-6 ms-3" style={{ color: '#2A5C5F' }}>{doctor.specialty}</span>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i} 
                    className={`fas fa-star ${i < doctor.rating ? 'text-warning' : 'text-light opacity-25'}`}
                  ></i>
                ))}
                <span className="me-2"   style={{ color: '  #2A5C5F' }} >({doctor.reviewsCount}+ reviews)</span>
              </div>
            </motion.div>

            <motion.p 
              className="lead mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {doctor.bio}
            </motion.p>
          </div>

          {/* Profile image is now in a circle at the top of the hero section */}
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
