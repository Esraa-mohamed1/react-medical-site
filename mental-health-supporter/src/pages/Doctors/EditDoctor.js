import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DoctorForm from '../../components/DoctorUserProfile/DoctorForm/DoctorForm';
import './Doctors.css';

const EditDoctor = () => {
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

  const handleSubmit = async (updatedDoctor) => {
    try {
      // Simulate API update
      console.log("Updating doctor:", updatedDoctor);
      // In a real app, you would call your API here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Show success message
      alert("Doctor profile updated successfully!");
      
      // Navigate back to view page
      navigate(`/doctors/${id}`);
    } catch (error) {
      console.error("Error updating doctor:", error);
      alert("Failed to update doctor profile. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate(`/doctors/${id}`);
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading doctor data...</p>
    </div>
  );

  if (!doctor) return <div className="error-message">Doctor not found</div>;

  return (
    <div className="edit-doctor-page">
      <DoctorForm 
        doctor={doctor} 
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditDoctor;