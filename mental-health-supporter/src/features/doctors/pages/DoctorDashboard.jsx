import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorSidebar from '../components/DoctorSidebar';
import { FaUsers, FaCalendarAlt, FaComments, FaBell } from 'react-icons/fa';
import './style.css';

const DoctorDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to patients page for now
    navigate('/doctor/paid-patients');
  }, [navigate]);

  // This component will redirect, but keeping the structure for future use
  return (
    <div className="doctor-dashboard-bg">
      <DoctorSidebar />
      <div className="doctor-dashboard-main">
        <div className="dashboard-content">
          <h1>Doctor Dashboard</h1>
          <p>Redirecting to patients page...</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard; 