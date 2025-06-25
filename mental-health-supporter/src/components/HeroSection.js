import React from 'react';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaPhoneAlt } from 'react-icons/fa';
// import doctorImage from '../assets/images/doctor.jpg';

const HeroSection = ({ doctor }) => {
  return (
    <motion.div 
      className="hero-class py-5 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      dir="rtl"
    >
      <div className="container">
        <div className="row align-items-center flex-row-reverse">
          <div className="col-lg-7 text-start">
            <motion.h1 
              className="display-4 fw-bold mb-3"
              initial={{ x: 50 }} 
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {doctor.name}
            </motion.h1>

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
                <span className="me-2">({doctor.reviewsCount}+ reviews)</span>
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

            <motion.div
              className="d-flex gap-3 justify-content-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                href="#booking" 
                variant="light" 
                className="fw-semibold d-flex align-items-center"
              >
                <FaCalendarAlt className="ms-2" />
                Book Appointment
              </Button>
              <Button 
                variant="outline-light" 
                className="d-flex align-items-center"
              >
                <FaPhoneAlt className="ms-2" />
                Contact Doctor
              </Button>
            </motion.div>
          </div>

          {/* <div className="col-lg-5 text-center">
            <motion.img
              src={'/images/1.jpeg'}
              alt={doctor.name}
              className="img-fluid rounded-4 shadow-lg doctor-image"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            />
          </div> */}
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
