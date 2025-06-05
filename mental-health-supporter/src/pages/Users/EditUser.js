import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserForm from '../../components/DoctorUserProfile/UserForm/UserForm';
import './Users.css';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API loading with delay
    const timer = setTimeout(() => {
      try {
        // Mock data - replace with API call in real app
        const mockUser = {
          id: id,
          name: "Alice Johnson",
          age: 32,
          gender: "Female",
          contact: "+1987654321",
          email: "alice.johnson@example.com"
        };
        setUser(mockUser);
        setLoading(false);
      } catch (err) {
        setError("Failed to load user data");
        setLoading(false);
      }
    }, 800); // Simulate network delay

    return () => clearTimeout(timer);
  }, [id]);

  const handleSubmit = (updatedUser) => {
    console.log("Updated user:", updatedUser);
    // Simulate API call with delay
    setTimeout(() => {
      alert("User updated successfully!");
      navigate(`/users/${id}`);
    }, 500);
  };

  if (loading) return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading user data...</p>
    </div>
  );
  
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div className="error">User not found</div>;

  return (
    <div className="edit-user-page">
      <UserForm user={user} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditUser;