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
    onFilterChange('specialization', '');
    onFilterChange('city', '');
    onFilterChange('available', '');
    onSearch('');
  };

  return (
    <div className="search-filters">
      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="specialization">{t('filters.specialty')}</label>
          <select
            id="specialization"
            className="filter-select"
            onChange={(e) => handleFilterChange('specialization', e.target.value)}
            value={filters.specialization}
          >
            <option value="">{t('filters.allSpecialties')}</option>
            <option value="General Surgeon">{t('filters.generalSurgeon')}</option>
            <option value="Cardiology">{t('filters.cardiology')}</option>
            <option value="Dermatology">{t('filters.dermatology')}</option>
            <option value="Surgery">{t('filters.surgery')}</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="city">{t('filters.city')}</label>
          <select
            id="city"
            className="filter-select"
            onChange={(e) => handleFilterChange('city', e.target.value)}
            value={filters.city}
          >
            <option value="">{t('filters.allCities')}</option>
            <option value="Cairo">{t('filters.cairo')}</option>
            <option value="Alexandria">{t('filters.alexandria')}</option>
            <option value="Minya">{t('filters.minya')}</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="available">{t('filters.availability')}</label>
          <select
            id="available"
            className="filter-select"
            onChange={(e) => handleFilterChange('available', e.target.value)}
            value={filters.area}
          >
            <option value=""></option>
            <option value="true">{t('filters.available')}</option>
            <option value="false">{t('filters.notAvailable')}</option>
          </select>
        </div>
      </div>

      <div className="filter-actions">
        <button
          className="clear-filters-button"
          onClick={clearAllFilters}
          disabled={
            !filters.specialty &&
            !filters.city &&
            !filters.area &&
            !filters.insurance &&
            !searchInput
          }
        >
          {t('filters.clearAll')}
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
