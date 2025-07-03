import React, { useState } from 'react';
import './SearchFilters.css';
import { useTranslation } from 'react-i18next';



const SearchFilters = ({ onSearch, onFilterChange }) => {
  const { t } = useTranslation();
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
<label htmlFor="specialization">{t('searchFilters.selectSpecialty')}</label>
          <select
            id="specialization"
            className="filter-select"
            onChange={(e) => handleFilterChange('specialization', e.target.value)}
            value={filters.specialization}
          >
            <option value="">{t('searchFilters.allSpecialties')}</option>
<option value="Clinical Psychology">{t('searchFilters.clinicalPsychology')}</option>
<option value="Psychiatry">{t('searchFilters.psychiatry')}</option>
<option value="Psychotherapy">{t('searchFilters.psychotherapy')}</option>
<option value="Counseling Psychology">{t('searchFilters.counselingPsychology')}</option>
<option value="Behavioral Therapy">{t('searchFilters.behavioralTherapy')}</option>
          </select>
        </div>

        <div className="filter-group">
<label htmlFor="city">{t('searchFilters.inThisCity')}</label>
          <select
            id="city"
            className="filter-select"
            onChange={(e) => handleFilterChange('city', e.target.value)}
            value={filters.city}
          >
            <option value="">{t('searchFilters.allCities')}</option>
<option value="Cairo">{t('searchFilters.cairo')}</option>
<option value="Alexandria">{t('searchFilters.alexandria')}</option>
<option value="Minya">{t('searchFilters.minya')}</option>
          </select>
        </div>

        <div className="filter-group">
<label htmlFor="available">{t('searchFilters.availability')}</label>
          <select
            id="available"
            className="filter-select"
            onChange={(e) => handleFilterChange('available', e.target.value)}
            value={filters.available}
          >
            <option value="">{t('searchFilters.availability')}</option>
<option value="true">{t('searchFilters.available')}</option>
<option value="false">{t('searchFilters.notAvailable')}</option>
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
          {t('searchFilters.clearAll')}
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;