import React from 'react';
import './SearchFilters.css';

const SearchFilters = () => {
  return (
    <div className="search-filters">
      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="specialty">Select a specialty</label>
          <select id="specialty" className="filter-select">
            <option>Choose specialty</option>
            <option>Cardiology</option>
            <option>Dermatology</option>
            <option>Surgery</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="city">In this city</label>
          <select id="city" className="filter-select">
            <option>Choose city</option>
            <option>Cairo</option>
            <option>Alexandria</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="area">In this area</label>
          <select id="area" className="filter-select">
            <option>Choose area</option>
            <option>New Cairo</option>
            <option>Nasr City</option>
          </select>
        </div>
      </div>
      
      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="insurance">My insurance is</label>
          <select id="insurance" className="filter-select">
            <option>Choose insurance</option>
            <option>Allianz</option>
            <option>MetLife</option>
          </select>
        </div>
        
        <div className="filter-group search-by-name">
          <label htmlFor="search">Or search by name</label>
          <div className="search-input-container">
            <input 
              type="text" 
              id="search" 
              placeholder="Doctor name or hospital" 
              className="search-input"
            />
            <button className="search-button">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;