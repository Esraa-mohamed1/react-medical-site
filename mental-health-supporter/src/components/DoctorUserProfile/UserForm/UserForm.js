import React, { useState } from 'react';
import './UserForm.css';

const UserForm = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2 className="user-form__title">Edit User Profile</h2>
      
      <div className="user-form__group">
        <label className="user-form__label">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="user-form__input"
          required
          placeholder="Enter full name"
        />
      </div>
      
      <div className="user-form__group">
        <label className="user-form__label">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="user-form__input"
          required
          min="1"
          placeholder="Enter age"
        />
      </div>
      
      <div className="user-form__group">
        <label className="user-form__label">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="user-form__select"
          required
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div className="user-form__group">
        <label className="user-form__label">Contact Number</label>
        <input
          type="tel"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="user-form__input"
          required
          placeholder="Enter contact number"
        />
      </div>
      
      <div className="user-form__group">
        <label className="user-form__label">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="user-form__input"
          required
          placeholder="Enter email address"
        />
      </div>
      
      <button type="submit" className="user-form__submit">
        <i className="fas fa-save" style={{marginRight: '8px'}}></i>
        Save Changes
      </button>
    </form>
  );
};

export default UserForm;