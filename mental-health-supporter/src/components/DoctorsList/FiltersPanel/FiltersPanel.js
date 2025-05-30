import React from 'react';
import './FiltersPanel.css';

const FiltersPanel = ({ filters, setFilters, setCurrentPage, setShowFilters }) => {
  return (
    <div className="filters-panel">
      <div className="filter-group">
        <label>Specialty</label>
        <select
          value={filters.specialty}
          onChange={(e) => setFilters({...filters, specialty: e.target.value})}
        >
          <option value="All">All Specialties</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Neurology">Neurology</option>
          <option value="Orthopedics">Orthopedics</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Minimum Rating</label>
        <select
          value={filters.minRating}
          onChange={(e) => setFilters({...filters, minRating: parseFloat(e.target.value)})}
        >
          <option value={0}>Any Rating</option>
          <option value={4.0}>4.0+ Stars</option>
          <option value={4.5}>4.5+ Stars</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Language</label>
        <select
          value={filters.language}
          onChange={(e) => setFilters({...filters, language: e.target.value})}
        >
          <option value="Any">Any Language</option>
          <option value="English">English</option>
          <option value="Arabic">Arabic</option>
          <option value="French">French</option>
          <option value="Chinese">Chinese</option>
          <option value="German">German</option>
          <option value="Korean">Korean</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Gender</label>
        <select
          value={filters.gender}
          onChange={(e) => setFilters({...filters, gender: e.target.value})}
        >
          <option value="Any">Any Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="filter-group checkbox-group">
        <input
          type="checkbox"
          id="availability-filter"
          checked={filters.availability}
          onChange={(e) => setFilters({...filters, availability: e.target.checked})}
        />
        <label htmlFor="availability-filter">Available Today</label>
      </div>

      <button 
        className="apply-filters"
        onClick={() => {
          setCurrentPage(1);
          setShowFilters(false);
        }}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FiltersPanel;