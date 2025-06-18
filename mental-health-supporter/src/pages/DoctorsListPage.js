import React from 'react';
// import { useNavigate } from 'react-router-dom';
import DoctorsListComponent from '../components/DoctorsListComponent/DoctorsList';
import CustomNavbar from './../components/Navbar';

export default function DoctorsListPage() {
  //   const navigate = useNavigate();

  const handleDoctorSelect = (doctorId) => {
    console.log('Selected doctor ID:', doctorId);
    // navigate to a doctor's profile page
    // navigate(`/doctor-profile/${doctorId}`);
  };

  return (
    <div>
      <CustomNavbar />
      <DoctorsListComponent onSelectDoctor={handleDoctorSelect} />
    </div>
  );
}