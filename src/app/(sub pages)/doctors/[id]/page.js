'use client';

import { useState } from 'react';
import HeroSection from '@/components/doctors/profile/HeroSection';
import DoctorInfo from '@/components/doctors/profile/DoctorInfo';
import ClinicDetails from '@/components/doctors/profile/ClinicDetails';
import ContactInfo from '@/components/doctors/profile/ContactInfo';
import Reviews from '@/components/doctors/profile/Reviews';
import BookingModal from '@/components/doctors/profile/BookingModal';

// Sample data - replace with actual data fetching
const doctor = {
  id: 1,
  name: 'Dr. Sarah Johnson',
  specialization: 'Cardiologist',
  experience: '15 years',
  rating: 4.8,
  reviews: 124,
  image: '/images/doctors/doctor-1.jpg',
  education: [
    {
      degree: 'MD',
      institution: 'Harvard Medical School',
      year: '2008'
    },
    {
      degree: 'Residency in Cardiology',
      institution: 'Johns Hopkins Hospital',
      year: '2012'
    }
  ],
  certifications: [
    'Board Certified in Cardiology',
    'Advanced Cardiac Life Support',
    'Cardiac Imaging Specialist'
  ],
  languages: ['English', 'Spanish', 'French'],
  experience: [
    {
      position: 'Senior Cardiologist',
      hospital: 'Mount Sinai Hospital',
      duration: '2015 - Present'
    },
    {
      position: 'Cardiologist',
      hospital: 'Mayo Clinic',
      duration: '2012 - 2015'
    }
  ],
  clinic: {
    name: 'Heart Care Center',
    address: '123 Medical Plaza, Suite 400, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'dr.johnson@heartcare.com',
    workingHours: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 3:00 PM',
      saturday: 'Closed',
      sunday: 'Closed'
    }
  },
  nextAvailable: 'Tomorrow at 10:00 AM',
  reviews: [
    {
      id: 1,
      patientName: 'John Smith',
      rating: 5,
      comment: 'Dr. Johnson is an excellent cardiologist. She took the time to explain everything clearly and made me feel comfortable throughout the process.',
      date: 'March 15, 2024'
    },
    {
      id: 2,
      patientName: 'Emily Davis',
      rating: 4,
      comment: 'Very professional and knowledgeable. The wait time was a bit long, but the consultation was worth it.',
      date: 'March 10, 2024'
    }
  ]
};

export default function DoctorProfilePage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <HeroSection
          doctor={doctor}
          onBookAppointment={() => setIsBookingModalOpen(true)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <DoctorInfo doctor={doctor} />
            <Reviews reviews={doctor.reviews} />
          </div>

          <div className="space-y-8">
            <ClinicDetails clinic={doctor.clinic} />
            <ContactInfo doctor={doctor} />
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        doctor={doctor}
      />
    </div>
  );
} 