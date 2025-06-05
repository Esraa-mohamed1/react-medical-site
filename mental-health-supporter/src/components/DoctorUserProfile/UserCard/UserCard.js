import React from 'react';
import { Link } from 'react-router-dom';
import './UserCard.css';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <h2 className="user-card__title">{user.name}</h2>
      <p className="user-card__info"><strong>Age:</strong> {user.age}</p>
      <p className="user-card__info"><strong>Gender:</strong> {user.gender}</p>
      <p className="user-card__info"><strong>Contact:</strong> {user.contact}</p>
      <p className="user-card__info"><strong>Email:</strong> {user.email}</p>
      <Link 
        to={`/users/${user.id}/edit`} 
        className="user-card__edit-btn"
      >
        Edit Profile
      </Link>
    </div>
  );
};

export default UserCard;