import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterSelectPage.css';
import CustomNavbar from './../components/Navbar';
import Footer from './../features/homePage/components/Footer';

const RegisterSelectPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <CustomNavbar />
      <div className="register-selection-page">
        <div className="register-selection-card">
          {/* Left: Image */}
          <div className="register-card-image-side">
            <img
              src="/images/mental-health-medical-treatment-specialist-vector-47902136.jpg"
              alt="Register Illustration"
              className="register-selection-image"
            />
          </div>

          {/* Separator */}
          <div className="vertical-separator" />

          {/* Right: Registration options */}
          <div className="register-card-form-side">
            <h2 className="register-selection-title">Select Registration Type</h2>
            <div className="register-buttons">
              <button
                className="register-selection-btn"
                onClick={() => navigate('/doctor-register')}
              >
                Register as Doctor
              </button>
              <button
                className="register-selection-btn"
                onClick={() => navigate('/register')}
              >
                Register as Patient
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterSelectPage;
