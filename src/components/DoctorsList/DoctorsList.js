'use client';

import { useState, useEffect } from 'react';
// import axios from 'axios';
import { motion } from 'framer-motion';
import DoctorCard from './DoctorCard/DoctorCard';
import SearchControls from './SearchControlls/SearchControlls';
import FiltersPanel from './FiltersPanel/FiltersPanel';
import MapView from './MapView/MapView';
import Pagination from './Pagination/Pagination';
import '@/styles/DoctorsList.css';

// Sample data - replace with actual data fetching
const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    experience: '15 years',
    rating: 4.8,
    reviews: 124,
    image: '/images/doctors/doctor-1.jpg',
    location: { lat: 40.7128, lng: -74.0060 },
    clinic: {
      name: 'Heart Care Center',
      address: '123 Medical Plaza, Suite 400, New York, NY 10001'
    },
    nextAvailable: 'Tomorrow at 10:00 AM'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurologist',
    experience: '12 years',
    rating: 4.9,
    reviews: 98,
    image: '/images/doctors/doctor-2.jpg',
    location: { lat: 40.7282, lng: -73.7949 },
    clinic: {
      name: 'Neuro Health Center',
      address: '456 Brain Street, New York, NY 10002'
    },
    nextAvailable: 'Today at 2:00 PM'
  }
];

export default function DoctorsList() {
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

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filters.specialty === 'All' || doctor.specialty === filters.specialty;
    const matchesAvailability = !filters.availability || doctor.available;
    const matchesRating = doctor.rating >= filters.minRating;
    const matchesLanguage = filters.language === 'Any' || 
                           doctor.languages?.includes(filters.language);
    const matchesGender = filters.gender === 'Any' || 
                         doctor.gender === filters.gender.toLowerCase();
    
    return matchesSearch && matchesSpecialty && matchesAvailability && 
           matchesRating && matchesLanguage && matchesGender;
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'experience') return b.experience - a.experience;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'availability') return (b.nextAvailable.localeCompare(a.nextAvailable));
    return 0;
  });

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = sortedDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(sortedDoctors.length / doctorsPerPage);

  return (
    <div className="doctors-list-container">
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
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mb-6 flex justify-between items-center">
            <p className="text-lg">{filteredDoctors.length} Doctors Found</p>
            {(filters.specialty !== 'All' || filters.availability || filters.minRating > 0 || 
             filters.language !== 'Any' || filters.gender !== 'Any') && (
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentDoctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : (
            <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-lg">
              <h3 className="text-xl font-semibold mb-2">No doctors match your search criteria</h3>
              <p className="mb-4">Try adjusting your filters or search term</p>
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
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
}