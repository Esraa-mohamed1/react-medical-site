import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import DoctorCard from './DoctorCard/DoctorCard.js';
import SearchControls from './SearchControlls/SearchControlls';
import FiltersPanel from './FiltersPanel/FiltersPanel';
import MapView from './MapView/MapView';
import Pagination from './Pagination/Pagination';
import './DoctorsList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Correct import


import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    specialty: 'All',
    availability: false,
    minRating: 0,
    language: 'Any',
    gender: 'Any'
  });
  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); 
  const doctorsPerPage = 3;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const mockDoctors = [
          {
            id: 1,
            name: "Dr. Ahmed Mohamed",
            specialty: "Cardiology",
            rating: 4.8,
            reviews: 124,
            image: "https://randomuser.me/api/portraits/men/1.jpg",
            available: true,
            languages: ["English", "Arabic"],
            experience: 15,
            gender: "male",
            location: {
              coordinates: [30.0444, 31.2357],
              address: "123 Medical St, Cairo"
            },
            nextAvailable: "Today, 3:00 PM"
          },
          {
            id: 2,
            name: "Dr. Sarah Johnson",
            specialty: "Pediatrics",
            rating: 4.9,
            reviews: 215,
            image: "https://randomuser.me/api/portraits/women/2.jpg",
            available: false,
            languages: ["English", "French"],
            experience: 10,
            gender: "female",
            location: {
              coordinates: [30.0444, 31.2457],
              address: "456 Children's Ave, Cairo"
            },
            nextAvailable: "Tomorrow, 10:00 AM"
          },
          {
            id: 3,
            name: "Dr. Michael Chen",
            specialty: "Neurology",
            rating: 4.7,
            reviews: 98,
            image: "https://randomuser.me/api/portraits/men/3.jpg",
            available: true,
            languages: ["English", "Chinese"],
            experience: 12,
            gender: "male",
            location: {
              coordinates: [30.0544, 31.2357],
              address: "789 Brain St, Cairo"
            },
            nextAvailable: "Today, 5:30 PM"
          },
          {
            id: 4,
            name: "Dr. Fatima Al-Mansoori",
            specialty: "Dermatology",
            rating: 4.6,
            reviews: 176,
            image: "https://randomuser.me/api/portraits/women/4.jpg",
            available: true,
            languages: ["Arabic", "English", "French"],
            experience: 8,
            gender: "female",
            location: {
              coordinates: [30.0344, 31.2257],
              address: "321 Skin Care Blvd, Cairo"
            },
            nextAvailable: "Today, 2:00 PM"
          },
          {
            id: 5,
            name: "Dr. Robert Wilson",
            specialty: "Orthopedics",
            rating: 4.5,
            reviews: 87,
            image: "https://randomuser.me/api/portraits/men/5.jpg",
            available: false,
            languages: ["English"],
            experience: 18,
            gender: "male",
            location: {
              coordinates: [30.0444, 31.2557],
              address: "654 Bone St, Cairo"
            },
            nextAvailable: "Friday, 9:00 AM"
          },
          {
            id: 6,
            name: "Dr. Aisha Hassan",
            specialty: "Pediatrics",
            rating: 4.9,
            reviews: 203,
            image: "https://randomuser.me/api/portraits/women/6.jpg",
            available: true,
            languages: ["Arabic", "English"],
            experience: 14,
            gender: "female",
            location: {
              coordinates: [30.0444, 31.2657],
              address: "987 Child Health Ave, Cairo"
            },
            nextAvailable: "Today, 4:15 PM"
          },
          {
            id: 7,
            name: "Dr. David Kim",
            specialty: "Cardiology",
            rating: 4.7,
            reviews: 112,
            image: "https://randomuser.me/api/portraits/men/7.jpg",
            available: true,
            languages: ["English", "Korean"],
            experience: 11,
            gender: "male",
            location: {
              coordinates: [30.0644, 31.2357],
              address: "753 Heart St, Cairo"
            },
            nextAvailable: "Tomorrow, 11:30 AM"
          },
          {
            id: 8,
            name: "Dr. Leila Abadi",
            specialty: "Dermatology",
            rating: 4.8,
            reviews: 145,
            image: "https://randomuser.me/api/portraits/women/8.jpg",
            available: false,
            languages: ["Arabic", "English", "German"],
            experience: 9,
            gender: "female",
            location: {
              coordinates: [30.0444, 31.2157],
              address: "159 Skin Health Blvd, Cairo"
            },
            nextAvailable: "Monday, 8:00 AM"
          }
        ];
        
        setDoctors(mockDoctors);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filters.specialty === 'All' || doctor.specialty === filters.specialty;
    const matchesAvailability = !filters.availability || doctor.available;
    const matchesRating = doctor.rating >= filters.minRating;
    const matchesLanguage = filters.language === 'Any' || 
                           doctor.languages.includes(filters.language);
    const matchesGender = filters.gender === 'Any' || 
                         doctor.gender === filters.gender.toLowerCase();
    
    return matchesSearch && matchesSpecialty && matchesAvailability && 
           matchesRating && matchesLanguage && matchesGender;
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'experience') return b.experience - a.experience;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'availability') return (b.available - a.available) || (a.nextAvailable.localeCompare(b.nextAvailable));
    return 0;
  });

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = sortedDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(sortedDoctors.length / doctorsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading doctors...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
      <div className="doctors-list-wrapper">
    <div className="doctors-list-container">
      <header className="page-header">

<div className="mental-health-header text-center">
  <h2 className="d-flex justify-content-center align-items-center gap-2">
    <i className="bi bi-activity fs-3"></i> 
    <span>Mental Health Supporter</span>
  </h2>
  <p className="text-muted mb-3">Book appointments with top-rated specialists near you</p>
  
      <button className="btn btn-primary">
    <i className="bi bi-heart-pulse me-2"></i> 
    Find Support
  </button>
  </div>

      </header>
    </div>

      <SearchControls 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCurrentPage={setCurrentPage}
        viewMode={viewMode}
        setViewMode={setViewMode}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {showFilters && (
        <FiltersPanel 
          filters={filters}
          setFilters={setFilters}
          setCurrentPage={setCurrentPage}
          setShowFilters={setShowFilters}
        />
      )}

      {viewMode === 'grid' ? (
        <>
          <div className="results-summary">
            <p>{filteredDoctors.length} Doctors Found</p>
            {(filters.specialty !== 'All' || filters.availability || filters.minRating > 0 || 
             filters.language !== 'Any' || filters.gender !== 'Any') && (
              <button 
                className="clear-filters"
                onClick={() => {
                  setFilters({
                    specialty: 'All',
                    availability: false,
                    minRating: 0,
                    language: 'Any',
                    gender: 'Any'
                  });
                  setCurrentPage(1);
                }}
              >
                Clear all filters
              </button>
            )}
          </div>

          {currentDoctors.length > 0 ? (
            <>
              <div className="doctors-grid">
                {currentDoctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  paginate={paginate}
                />
              )}
            </>
          ) : (
            <div className="no-results">
              <h3>No doctors match your search criteria</h3>
              <p>Try adjusting your filters or search term</p>
              <button 
                className="clear-filters"
                onClick={() => {
                  setFilters({
                    specialty: 'All',
                    availability: false,
                    minRating: 0,
                    language: 'Any',
                    gender: 'Any'
                  });
                  setSearchTerm('');
                  setCurrentPage(1);
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </>
      ) : (
        <MapView doctors={filteredDoctors} />
      )}
    </div>
  );
};

export default DoctorsList;