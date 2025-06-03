import React from 'react';
import './Sort.css';

const Sort = ({ activeOption, onChangeSort, doctorsCount }) => {
  const handleSort = (option) => {
    onChangeSort(option);
  };

  return (
    <div className="sort-container">
      <div className="sort-options">
        <span className="sort-label">Sort by:</span>
        <button 
          className={`sort-button ${activeOption === 'mostPopular' ? 'active' : ''}`}
          onClick={() => handleSort('mostPopular')}
        >
          Most Popular
        </button>
        <button 
          className={`sort-button ${activeOption === 'highestRating' ? 'active' : ''}`}
          onClick={() => handleSort('highestRating')}
        >
          Highest Rating
        </button>
        <button 
          className={`sort-button ${activeOption === 'lowestPrice' ? 'active' : ''}`}
          onClick={() => handleSort('lowestPrice')}
        >
          Lowest Price
        </button>
        <button 
          className={`sort-button ${activeOption === 'highestPrice' ? 'active' : ''}`}
          onClick={() => handleSort('highestPrice')}
        >
          Highest Price
        </button>
      </div>
      <div className="doctors-count">
        {doctorsCount} {doctorsCount === 1 ? 'Doctor' : 'Doctors'} Found
      </div>
    </div>
  );
};

export default Sort;