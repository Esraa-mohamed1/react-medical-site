import React from 'react';
import { Link } from 'react-router-dom';
import './UserCard.css';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <h2 className="user-card__title">{user.name}</h2>
      <p className="user-card__info">
        <strong>Age:</strong> <span>{user.age}</span>
      </p>
      <p className="user-card__info">
        <strong>Gender:</strong> <span>{user.gender}</span>
      </p>
      <p className="user-card__info">
        <strong>Contact:</strong> <span>{user.contact}</span>
      </p>
      <p className="user-card__info">
        <strong>Email:</strong> <span>{user.email}</span>
      </p>
      <Link 
        to={`/users/${user.id}/edit`} 
        className="user-card__edit-btn"
      >
        <i className="fas fa-edit" style={{marginRight: '8px'}}></i>
        Edit Profile
      </Link>
    </div>
  );
};

export default UserCard;