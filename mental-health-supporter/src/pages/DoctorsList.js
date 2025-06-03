import React from 'react';
import Hero from '../components/DoctorsListComponent/Hero/Hero';
import SearchFilters from '../components/DoctorsListComponent/SearchFilters/SearchFilters';
import Sort from '../components/DoctorsListComponent/Sort/Sort';
import DoctorsCard from '../components/DoctorsListComponent/DoctorsCard/DoctorsCard';
import Pagination from '../components/DoctorsListComponent/Pagination/Pagination';
import './DoctorsList.css';

const DoctorsList = () => {
  const doctors = [
    {
    id: 1,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  {
    id: 2,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  {
    id: 3,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  {
    id: 4,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  {
    id: 5,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  {
    id: 6,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  {
    id: 7,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  {
    id: 8,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  {
    id: 9,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  {
    id: 10,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  {
    id: 11,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  {
    id: 12,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  {
    id: 13,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  {
    id: 14,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  {
    id: 15,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  {
    id: 16,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  
  {
    id: 17,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  {
    id: 18,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  {
    id: 19,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  {
    id: 20,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  {
    id: 21,
    name: "Doctor Mohamed El Anany",
    title: "Professor of Surgery and oncology",
    // photo: "../components/DoctorsListComponent/images/doctor.png",
    rating: 4.8,
    ratingCount: 514,
    specialty: "General Surgeon Specialized in Adult General Surgery, Obesity Surgery",
    location: "New Cairo : 15 street from 79 street",
    fee: "600 EGP",
    waitingTime: "10 Minutes",
    callCost: "16676 - Cost of regular call"
  },
  ];

  return (
    <div className="doctors-list-page">
      <Hero />
      <SearchFilters />
      <div className="doctors-list-container">
        <Sort />
        <div className="doctors-cards">
          {doctors.map(doctor => (
            <DoctorsCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
        <Pagination currentPage={1} totalPages={10} />
      </div>
    </div>
  );
};

export default DoctorsList;