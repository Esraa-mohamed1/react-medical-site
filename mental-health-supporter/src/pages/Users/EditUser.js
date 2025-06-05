import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserForm from '../../components/DoctorUserProfile/UserForm/UserForm';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleSubmit = (updatedUser) => {
    console.log("Updated user:", updatedUser); // Replace with API call
    alert("User updated successfully!");
    navigate(`/users/${id}`);
  };

  if (loading) return <div className="loading">Loading user data...</div>;
  if (!user) return <div className="error">User not found</div>;

  return (
    <div className="edit-user-page">
      <h1>Edit User Profile</h1>
      <UserForm user={user} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditUser;