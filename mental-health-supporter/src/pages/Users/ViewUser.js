import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../../components/DoctorUserProfile/UserCard/UserCard';

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [id]);

  if (loading) return <div className="loading">Loading user data...</div>;
  if (!user) return <div className="error">User not found</div>;

  return (
    <div className="view-user-page">
      <h1>User Profile</h1>
      <UserCard user={user} />
    </div>
  );
};

export default ViewUser;