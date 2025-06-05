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
    // Simulate API call
    const fetchDoctor = async () => {
      try {
        // In a real app, replace with actual API call
        const mockDoctor = {
          id: id,
          name: "John Smith",
          specialization: "Cardiology",
          contact: "+1234567890",
          email: "john.smith@example.com",
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