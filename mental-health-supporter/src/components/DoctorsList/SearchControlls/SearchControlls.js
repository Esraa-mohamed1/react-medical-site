import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import './SearchControlls.css';

const SearchControls = ({ 
  searchTerm, 
  setSearchTerm, 
  setCurrentPage, 
  viewMode, 
  setViewMode, 
  showFilters, 
  setShowFilters, 
  sortBy, 
  setSortBy 
}) => {
  return (
    <div className="controls-section">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search doctors by name, specialty..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="view-controls">
        <button 
          className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
          onClick={() => setViewMode('grid')}
        >
          Grid View
        </button>
        <button 
          className={`view-toggle ${viewMode === 'map' ? 'active' : ''}`}
          onClick={() => setViewMode('map')}
        >
          Map View
        </button>
        <button 
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter /> Filters
        </button>
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option class="optionclass" value="rating">Sort by: Highest Rating</option>
          <option class="optionclass" value="experience">Sort by: Most Experienced</option>
          <option class="optionclass" value="name">Sort by: Name (A-Z)</option>
          <option class="optionclass" value="availability">Sort by: Availability</option>
        </select>
      </div>
    </div>
  );
};

export default SearchControls;