import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../../components/DoctorUserProfile/UserCard/UserCard';
import './Users.css';

const ViewUser = () => {
  const { id } = useParams();
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

  if (loading) return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading user data...</p>
    </div>
  );
  
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div className="error">User not found</div>;

  return (
    <div className="view-user-page">
      <UserCard user={user} />
    </div>
  );
};

export default ViewUser;