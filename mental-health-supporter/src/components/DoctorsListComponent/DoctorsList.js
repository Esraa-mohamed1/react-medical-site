import React, { useState, useEffect } from 'react';
import Hero from './Hero/Hero';
import SearchFilters from './SearchFilters/SearchFilters';
import Sort from './Sort/Sort';
import DoctorsCard from './DoctorsCard/DoctorsCard';
import Pagination from './Pagination/Pagination';
import './DoctorsList.css';
import { getDoctors } from './../../services/doctors/DoctorServices';
import { useTranslation } from 'react-i18next';


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

  // const [sortOption, setSortOption] = useState('mostPopular');
  const doctorsPerPage = 6;

  // Fix the useEffect implementation
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        let queryParms = getQueryParams(filters, searchTerm);

        // Apply sorting
        // switch (sortOption) {
        //   case 'highestRating':
        //     result.sort((a, b) => b.rating - a.rating);
        //     break;
        //   case 'lowestPrice':
        //     result.sort((a, b) => parseFloat(a.fee) - parseFloat(b.fee));
        //     break;
        //   case 'highestPrice':
        //     result.sort((a, b) => parseFloat(b.fee) - parseFloat(a.fee));
        //     break;
        //   case 'mostPopular':
        //   default:
        //     result.sort((a, b) => b.ratingCount - a.ratingCount);
        // }

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
  }, [filters]);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const getQueryParams = (filters, searchTerm) => {
    let queryParms = [];
    // Apply search
    if (searchTerm) {
      queryParms.push(`search=${searchTerm.toLowerCase()}`);
    }

    // Apply filters
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
  }
  const handleSearch = async (term) => {
    let queryParms = getQueryParams(filters, searchTerm);
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

  // const handleSortChange = (option) => {
  //   setSortOption(option);
  // };

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
        {/* Filters section (left side) */}
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

          {/* Doctors cards - one per row */}
          {currentDoctors.length > 0 ? (
            currentDoctors.map(doctor => (
              <div className="doctors-cards">
                <DoctorsCard doctor={doctor} key={doctor.doctor_id} />
              </div>
            ))
          ) : (
            <div className="no-results">{t('doctorsList.noResults')}</div>
          )}
        </div>
      </div>

      {/* Full-width pagination container - MOVED OUTSIDE content-area */}
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