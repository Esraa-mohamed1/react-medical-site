import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterSelectPage.css';
import CustomNavbar from './../components/Navbar'; 
import Footer from "./../features/homePage/components/Footer";

const RegisterSelectPage = () => {
    const navigate = useNavigate();

    return (
        <>
        <CustomNavbar />
        <div className="register-selection-page">
            <div className="register-selection-card">
                <h2 className="register-selection-title">Select Registration Type</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
        <Footer />
        </>
    );
};

export default RegisterSelectPage;
