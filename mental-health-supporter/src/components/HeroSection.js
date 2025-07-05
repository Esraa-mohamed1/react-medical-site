import React from 'react';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaPhoneAlt } from 'react-icons/fa';
import './HeroSection.css';

const HeroSection = ({ doctor }) => {
  const profileImage = localStorage.getItem('image_profile') || doctor.profile_image || '/images/1.jpeg';

  return (
    <motion.div 
      className="hero-sectionn"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <div className="hero-content">
          <div className="profile-container">
            <img
              src={profileImage}
              alt={doctor.full_name || doctor.name}
              className="profile-image"
            />
          </div>
          <div className="text-content">
            <h2 className="hero-title">
              <span>Teleconsult Our Patient</span>
              <span>Advisors</span>
            </h2>
            <p className="hero-subtitle">Get expert advice from our team</p>
          </div>
          <motion.div
            className="button-container"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button 
              variant="light" 
              className="book-button"
            >
              <FaPhoneAlt className="button-icon" />
              Book a Call
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;