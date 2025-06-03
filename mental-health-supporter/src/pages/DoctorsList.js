import React, { useState, useEffect, useMemo } from 'react';
import Hero from '../components/DoctorsListComponent/Hero/Hero';
import SearchFilters from '../components/DoctorsListComponent/SearchFilters/SearchFilters';
import Sort from '../components/DoctorsListComponent/Sort/Sort';
import DoctorsCard from '../components/DoctorsListComponent/DoctorsCard/DoctorsCard';
import Pagination from '../components/DoctorsListComponent/Pagination/Pagination';
import './DoctorsList.css';

const DoctorsList = () => {
  const allDoctors = useMemo(() => [
    {
      id: 1,
      name: "Dr. Mohamed El Anany",
      title: "Professor of Surgery and oncology",
      photo: "../components/DoctorsListComponent/images/doctor.png",
      rating: 4.8,
      ratingCount: 514,
      specialty: "General Surgeon",
      location: "New Cairo : 15 street from 79 street",
      fee: "600 EGP",
      waitingTime: "10 Minutes",
      callCost: "16676 - Cost of regular call",
      city: "Cairo",
      area: "New Cairo",
      insurance: ["Allianz", "MetLife"]
    },
    {
      id: 2,
      name: "Dr. Ahmed Samy",
      title: "Cardiologist",
      photo: "../components/DoctorsListComponent/images/doctor.png",
      rating: 4.9,
      ratingCount: 423,
      specialty: "Cardiology",
      location: "Nasr City : 20 street from Abbas El Akkad",
      fee: "800 EGP",
      waitingTime: "15 Minutes",
      callCost: "16676 - Cost of regular call",
      city: "Cairo",
      area: "Nasr City",
      insurance: ["Allianz"]
    },
    {
      id: 3,
      name: "Dr. Hala Zaki",
      title: "Dermatologist",
      photo: "../components/DoctorsListComponent/images/doctor.png",
      rating: 4.7,
      ratingCount: 387,
      specialty: "Dermatology",
      location: "Alexandria : Downtown Medical Center",
      fee: "500 EGP",
      waitingTime: "20 Minutes",
      callCost: "16676 - Cost of regular call",
      city: "Alexandria",
      area: "Downtown",
      insurance: ["MetLife"]
    },
    {
      id: 4,
      name: "Dr. Omar Hassan",
      title: "General Surgeon",
      photo: "../components/DoctorsListComponent/images/doctor.png",
      rating: 4.5,
      ratingCount: 298,
      specialty: "General Surgeon",
      location: "Cairo : Maadi Hospital",
      fee: "450 EGP",
      waitingTime: "30 Minutes",
      callCost: "16676 - Cost of regular call",
      city: "Cairo",
      area: "Maadi",
      insurance: ["Allianz", "MetLife"]
    },
    {
      id: 5,
      name: "Dr. Yasmine Adel",
      title: "Cardiologist",
      photo: "../components/DoctorsListComponent/images/doctor.png",
      rating: 4.9,
      ratingCount: 512,
      specialty: "Cardiology",
      location: "Alexandria : Smouha Medical Complex",
      fee: "750 EGP",
      waitingTime: "25 Minutes",
      callCost: "16676 - Cost of regular call",
      city: "Alexandria",
      area: "Smouha",
      insurance: ["MetLife"]
    },
    {
      id: 6,
      name: "Dr. Karim Farouk",
      title: "Surgeon",
      photo: "../components/DoctorsListComponent/images/doctor.png",
      rating: 4.6,
      ratingCount: 345,
      specialty: "Surgery",
      location: "Cairo : Zamalek Specialized Hospital",
      fee: "900 EGP",
      waitingTime: "15 Minutes",
      callCost: "16676 - Cost of regular call",
      city: "Cairo",
      area: "Zamalek",
      insurance: ["Allianz"]
    },
    {
      id: 7,
      name: "Dr. Nada Sherif",
      title: "Dermatologist",
      photo: "../components/DoctorsListComponent/images/doctor.png",
      rating: 4.8,
      ratingCount: 421,
      specialty: "Dermatology",
      location: "Cairo : Heliopolis Skin Center",
      fee: "550 EGP",
      waitingTime: "10 Minutes",
      callCost: "16676 - Cost of regular call",
      city: "Cairo",
      area: "Heliopolis",
      insurance: ["Allianz", "MetLife"]
    },
    {
      id: 8,
      name: "Dr. Tarek Mohamed",
      title: "Cardiologist",
      photo: "../components/DoctorsListComponent/images/doctor.png",
      rating: 4.7,
      ratingCount: 376,
      specialty: "Cardiology",
      location: "Alexandria : Sporting Medical Center",
      fee: "700 EGP",
      waitingTime: "20 Minutes",
      callCost: "16676 - Cost of regular call",
      city: "Alexandria",
      area: "Sporting",
      insurance: ["Allianz"]
    },
    {
      id: 9,
      name: "Dr. Rania Ashraf",
      title: "General Surgeon",
      photo: "../components/DoctorsListComponent/images/doctor.png",
      rating: 4.4,
      ratingCount: 267,
      specialty: "General Surgeon",
      location: "Cairo : 6th of October City Hospital",
      fee: "400 EGP",
      waitingTime: "35 Minutes",
      callCost: "16676 - Cost of regular call",
      city: "Cairo",
      area: "6th of October City",
      insurance: ["MetLife"]
    },
    {
      id: 10,
      name: "Dr. Ali Mahmoud",
      title: "Surgeon",
      photo: "../components/DoctorsListComponent/images/doctor.png",
      rating: 4.9,
      ratingCount: 498,
      specialty: "Surgery",
      location: "Alexandria : Miami Medical Center",
      fee: "850 EGP",
      waitingTime: "15 Minutes",
      callCost: "16676 - Cost of regular call",
      city: "Alexandria",
      area: "Miami",
      insurance: ["Allianz", "MetLife"]
    },
    {
      id: 11,
      name: "Dr. Laila Kamal",
      title: "Dermatologist",
      photo: "../components/DoctorsListComponent/images/doctor.png",
      rating: 4.5,
      ratingCount: 312,
      specialty: "Dermatology",
      location: "Cairo : Dokki Skin Clinic",
      fee: "500 EGP",
      waitingTime: "25 Minutes",
      callCost: "16676 - Cost of regular call",
      city: "Cairo",
      area: "Dokki",
      insurance: ["Allianz"]
    }
  ], []);

  const [filteredDoctors, setFilteredDoctors] = useState(allDoctors);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    specialty: '',
    city: '',
    area: '',
    insurance: ''
  });
  const [sortOption, setSortOption] = useState('mostPopular');
  const doctorsPerPage = 6;

  useEffect(() => {
    let result = [...allDoctors];
    
    // Apply search
    if (searchTerm) {
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply filters
    if (filters.specialty) {
      result = result.filter(doctor => 
        doctor.specialty === filters.specialty
      );
    }
    if (filters.city) {
      result = result.filter(doctor => 
        doctor.city === filters.city
      );
    }
    if (filters.area) {
      result = result.filter(doctor => 
        doctor.area === filters.area
      );
    }
    if (filters.insurance) {
      result = result.filter(doctor => 
        doctor.insurance.includes(filters.insurance)
      );
    }
    
    // Apply sorting
    switch(sortOption) {
      case 'highestRating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowestPrice':
        result.sort((a, b) => parseFloat(a.fee) - parseFloat(b.fee));
        break;
      case 'highestPrice':
        result.sort((a, b) => parseFloat(b.fee) - parseFloat(a.fee));
        break;
      case 'mostPopular':
      default:
        result.sort((a, b) => b.ratingCount - a.ratingCount);
    }
    
    setFilteredDoctors(result);
    setCurrentPage(1);
  }, [searchTerm, filters, sortOption, allDoctors]);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
  <div className="doctors-list-page">
    {/* Hero section with sticky positioning */}
    <div className="hero-section sticky-hero">
      <Hero />
    </div>
    
    <div className="content-area">
      <div className="filters-section">
        <SearchFilters 
          onSearch={handleSearch} 
          onFilterChange={handleFilterChange}
        />
      </div>
      
      <div className="doctors-list-container">
        <Sort 
          activeOption={sortOption}
          onChangeSort={handleSortChange}
          doctorsCount={filteredDoctors.length}
        />
        <div className="doctors-cards">
          {currentDoctors.length > 0 ? (
            currentDoctors.map(doctor => (
              <DoctorsCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <div className="no-results">No doctors match your search criteria.</div>
          )}
        </div>
        {filteredDoctors.length > doctorsPerPage && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            paginate={paginate}
          />
        )}
      </div>
    </div>
  </div>
);
};
export default DoctorsList;