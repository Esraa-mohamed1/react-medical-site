import React from 'react';
import './Sort.css';

const Sort = () => {
  return (
    <div className="sort-container">
      <div className="sort-options">
        <span className="sort-label">Sort by:</span>
        <button className="sort-button active">Most Popular</button>
        <button className="sort-button">Highest Rating</button>
        <button className="sort-button">Lowest Price</button>
        <button className="sort-button">Highest Price</button>
      </div>
      <div className="doctors-count">
        14567 Doctors
      </div>
    </div>
  );
};

export default Sort;