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
    const fetchDoctor = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
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

  const handleSubmit = async (updatedDoctor) => {
    try {
      console.log("Updating doctor:", updatedDoctor);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would:
      // 1. Update your state/store
      // 2. Possibly make an API call to save changes
      // 3. Then navigate back
      
      // For now, we'll just log and navigate
      navigate(`/doctors/${id}`);
    } catch (error) {
      console.error("Error updating doctor:", error);
      throw error; // This will be caught in DoctorForm
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      navigate(`/doctors/${id}`);
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3">Loading doctor data...</p>
    </div>
  );

  if (!doctor) return (
    <div className="alert alert-danger error-message">
      Doctor not found
    </div>
  );

  return (
    <div className="edit-doctor-page container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <DoctorForm 
            doctor={doctor} 
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default EditDoctor;