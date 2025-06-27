import React from 'react';
// import { useNavigate } from 'react-router-dom';
import DoctorsListComponent from '../components/DoctorsListComponent/DoctorsList';
import CustomNavbar from './../components/Navbar'; 
import Footer from "./../features/homePage/components/Footer";


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
      <Footer />
    </div>
  );
}