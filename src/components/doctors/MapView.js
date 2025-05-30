'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function MapView({ doctors, onDoctorSelect }) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    // Initialize Google Maps
    const initMap = () => {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 40.7128, lng: -74.0060 }, // Default to New York
        zoom: 12,
        styles: [
          {
            featureType: 'all',
            elementType: 'all',
            stylers: [
              { invert_lightness: true },
              { saturation: 10 },
              { lightness: 30 },
              { gamma: 0.5 },
              { hue: '#435158' }
            ]
          }
        ]
      });

      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Add markers for each doctor
      doctors.forEach(doctor => {
        const marker = new google.maps.Marker({
          position: doctor.location,
          map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#3B82F6',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2
          }
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-semibold">${doctor.name}</h3>
              <p class="text-sm">${doctor.specialty}</p>
              <p class="text-sm">${doctor.clinic.address}</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
          onDoctorSelect(doctor);
        });

        markersRef.current.push(marker);
      });
    };

    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, [doctors, onDoctorSelect]);

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <FaMapMarkerAlt className="text-blue-400" />
        <h2 className="text-2xl font-bold">Find Doctors Near You</h2>
      </div>

      <div
        ref={mapRef}
        className="w-full h-[600px] rounded-lg overflow-hidden"
      />
    </motion.div>
  );
} 