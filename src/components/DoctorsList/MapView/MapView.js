'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import '@/styles/DoctorsList.css';

const MapView = ({ doctors, onDoctorSelect }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
    };
  }, [doctors]);

  const initializeMap = () => {
    const mapOptions = {
      center: { lat: 40.7128, lng: -74.0060 }, // New York
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
            { hue: '#3B82F6' }
          ]
        }
      ]
    };

    const map = new window.google.maps.Map(mapRef.current, mapOptions);

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add markers for each doctor
    doctors.forEach(doctor => {
      const marker = new window.google.maps.Marker({
        position: doctor.location,
        map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#3B82F6',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-bold">${doctor.name}</h3>
            <p class="text-sm">${doctor.specialty}</p>
            <p class="text-sm">${doctor.clinic.address}</p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        if (onDoctorSelect) {
          onDoctorSelect(doctor);
        }
      });

      markersRef.current.push(marker);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="map-container"
    >
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </motion.div>
  );
};

export default MapView;