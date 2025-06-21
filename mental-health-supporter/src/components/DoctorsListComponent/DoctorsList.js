import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Hero from './Hero/Hero';
import SearchFilters from './SearchFilters/SearchFilters';
// import Sort from './Sort/Sort';
import DoctorsCard from './DoctorsCard/DoctorsCard';
import Pagination from './Pagination/Pagination';
import './DoctorsList.css';
import { getDoctors } from './../../services/doctors/DoctorServices';

const DoctorsList = () => {
  const { t } = useTranslation();

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    specialization: '',
    city: '',
    available: '',
  });

  const doctorsPerPage = 6;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        let queryParms = getQueryParams(filters, searchTerm);
        let fullParams = (queryParms.length > 0 ? '?' : '') + queryParms.join('&');
        let result = await getDoctors(fullParams);
        setFilteredDoctors(result);
        setCurrentPage(1);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setFilteredDoctors([]);
      }
    };

    fetchDoctors();
  }, [filters, searchTerm]);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const getQueryParams = (filters, searchTerm) => {
    let queryParms = [];
    if (searchTerm) {
      queryParms.push(`search=${searchTerm.toLowerCase()}`);
    }
    if (filters.specialization) {
      queryParms.push(`specialization=${filters.specialization}`);
    }
    if (filters.city) {
      queryParms.push(`city=${filters.city}`);
    }
    if (filters.available) {
      queryParms.push(`available=${filters.available === 'true' ? "True" : "False"}`);
    }
    return queryParms;
  };

  const handleSearch = async (term) => {
    let queryParms = getQueryParams(filters, term);
    let fullParams = (queryParms.length > 0 ? '?' : '') + queryParms.join('&');
    let result = await getDoctors(fullParams);
    setFilteredDoctors(result);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="doctors-list-page">
      {/* Hero section */}
      <div className="hero-section">
        <Hero />
      </div>

      {/* Main search bar */}
      <div className="main-search-container">
        <div className="search-input-container">
          <input
            type="text"
            placeholder={t('doctorsList.searchPlaceholder')}
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleSearch(e.target.value)}
          />
          <button
            className="search-button"
            onClick={() => handleSearch(searchTerm)}
          >
            {t('doctorsList.searchButton')}
          </button>
        </div>
      </div>

      <div className="content-area">
        {/* Filters section */}
        <div className="filters-section">
          <SearchFilters
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="doctors-list-container">
          {/* Sort section */}
          {/* <Sort
            activeOption={sortOption}
            onChangeSort={handleSortChange}
            doctorsCount={filteredDoctors.length}
          /> */}

          {/* Doctors cards */}
          {currentDoctors.length > 0 ? (
            currentDoctors.map(doctor => (
              <div className="doctors-cards" key={doctor.doctor_id}>
                <DoctorsCard doctor={doctor} />
              </div>
            ))
          ) : (
            <div className="no-results">{t('doctorsList.noResults')}</div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <div className="pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
