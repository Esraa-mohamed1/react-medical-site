import React, { useState } from 'react';
import './SearchFilters.css';

const SearchFilters = ({ onSearch, onFilterChange }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({
    specialization: '',
    city: '',
    available: '',
  });

  // const handleSearch = () => {
  //   onSearch(searchInput);
  // };

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     handleSearch();
  //   }
  // };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    onFilterChange(filterName, value);
  };

  const clearAllFilters = () => {
    setFilters({
      specialization: '',
      city: '',
      available: '',
    });
    setSearchInput('');
    // Trigger filter changes with empty values
    onFilterChange('specialization', '');
    onFilterChange('city', '');
    onFilterChange('available', '');
    onSearch('');
  };

  return (
    <div className="search-filters">
      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="specialization">Select a specialty</label>
          <select
            id="specialization"
            className="filter-select"
            onChange={(e) => handleFilterChange('specialization', e.target.value)}
            value={filters.specialization}
          >
            <option value="">All Specialties</option>
            <option value="Clinical Psychology">Clinical Psychology</option>
            <option value="Psychiatry">Psychiatry</option>
            <option value="Psychotherapy">Psychotherapy</option>
            <option value="Counseling Psychology">Counseling Psychology</option>
            <option value="Behavioral Therapy">Behavioral Therapy</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="city">In this city</label>
          <select
            id="city"
            className="filter-select"
            onChange={(e) => handleFilterChange('city', e.target.value)}
            value={filters.city}
          >
            <option value="">All Cities</option>
            <option value="Cairo">Cairo</option>
            <option value="Alexandria">Alexandria</option>
            <option value="Minya">Minya</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="available">Availability</label>
          <select
            id="available"
            className="filter-select"
            onChange={(e) => handleFilterChange('available', e.target.value)}
            value={filters.area}
          >
            <option value="">Availability</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
      </div>

      <div className="filter-row">
        {/* <div className="filter-group">
          <label htmlFor="insurance">My insurance is</label>
          <select 
            id="insurance" 
            className="filter-select"
            onChange={(e) => handleFilterChange('insurance', e.target.value)}
            value={filters.insurance}
          >
            <option value="">All Insurance</option>
            <option value="Allianz">Allianz</option>
            <option value="MetLife">MetLife</option>
          </select>
        </div> */}

        {/* <div className="filter-group search-by-name">
          <label htmlFor="search">Search by name or specialty</label>
          <div className="search-input-container">
            <input 
              type="text" 
              id="search" 
              placeholder="Doctor name or specialty" 
              className="search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div> */}
      </div>

      <div className="filter-actions">
        <button
          className="clear-filters-button"
          onClick={clearAllFilters}
          disabled={!filters.specialization && !filters.city && !filters.available && !searchInput}
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;