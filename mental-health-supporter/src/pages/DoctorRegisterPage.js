import React from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorsRegisterComponent from '../components/DoctorsRegisterComponent/DoctorRegister';

export default function DoctorsRegisterPage() {
  const navigate = useNavigate();

  const handleDoctorSelect = (doctorId) => {
    console.log('Selected doctor ID:', doctorId);
    // Redirect to login after selection/registration
    navigate('/login');
    
    // If you want to pass the doctorId to login page:
    // navigate('/login', { state: { doctorId } });
  };

  return (
    <div>
      <DoctorsRegisterComponent onSelectDoctor={handleDoctorSelect} />
    </div>
  );
}