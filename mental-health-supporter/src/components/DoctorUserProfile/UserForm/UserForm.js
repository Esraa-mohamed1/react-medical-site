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
        <label className="user-form__label">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="user-form__input"
          required
        />
      </div>
      
      {/* Other form fields similarly */}
      
      <button type="submit" className="user-form__submit">
        Save Changes
      </button>
    </form>
  );
};

export default UserForm;