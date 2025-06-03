import React, { useState } from 'react';
import './SearchFilters.css';

const SearchFilters = ({ onSearch, onFilterChange }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({
    specialty: '',
    city: '',
    area: '',
    insurance: ''
  });

  const handleSearch = () => {
    onSearch(searchInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    onFilterChange(filterName, value);
  };

  const clearAllFilters = () => {
    setFilters({
      specialty: '',
      city: '',
      area: '',
      insurance: ''
    });
    setSearchInput('');
    // Trigger filter changes with empty values
    onFilterChange('specialty', '');
    onFilterChange('city', '');
    onFilterChange('area', '');
    onFilterChange('insurance', '');
    onSearch('');
  };

  return (
    <div className="search-filters">
      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="specialty">Select a specialty</label>
          <select 
            id="specialty" 
            className="filter-select"
            onChange={(e) => handleFilterChange('specialty', e.target.value)}
            value={filters.specialty}
          >
            <option value="">All Specialties</option>
            <option value="General Surgeon">General Surgeon</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Surgery">Surgery</option>
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
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="area">In this area</label>
          <select 
            id="area" 
            className="filter-select"
            onChange={(e) => handleFilterChange('area', e.target.value)}
            value={filters.area}
          >
            <option value="">All Areas</option>
            <option value="New Cairo">New Cairo</option>
            <option value="Nasr City">Nasr City</option>
          </select>
        </div>
      </div>
      
      <div className="filter-row">
        <div className="filter-group">
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
        </div>
        
        <div className="filter-group search-by-name">
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
        </div>
      </div>

      <div className="filter-actions">
        <button 
          className="clear-filters-button"
          onClick={clearAllFilters}
          disabled={!filters.specialty && !filters.city && !filters.area && !filters.insurance && !searchInput}
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;