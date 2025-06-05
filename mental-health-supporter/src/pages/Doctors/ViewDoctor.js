import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DoctorCard from '../../components/DoctorUserProfile/DoctorCard/DoctorCard';
import './Doctors.css';

const ViewDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        // Mock data with all the fields you requested
        const mockDoctor = {
          id: id,
          name: "Mohamed El Anany",
          title: "Professor of Surgery and oncology",
          photo: "../components/DoctorsListComponent/images/doctor.png",
          rating: 4.8,
          ratingCount: 514,
          specialty: "General Surgeon",
          location: "New Cairo : 15 street from 79 street",
          fee: "600 EGP",
          waitingTime: "10 Minutes",
          callCost: "16676 - Cost of regular call",
          city: "Cairo",
          area: "New Cairo",
          insurance: ["Allianz", "MetLife"],
          email: "m.elanany@example.com",
          license: "MD-12345"
        };
        setDoctor(mockDoctor);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleEdit = () => {
    navigate(`/doctors/${id}/edit`);
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading doctor profile...</p>
    </div>
  );

  if (!doctor) return <div className="error-message">Doctor not found</div>;

  return (
    <div className="doctor-profile-page">
      <DoctorCard doctor={doctor} onEdit={handleEdit} />
    </div>
  );
};

export default ViewDoctor;