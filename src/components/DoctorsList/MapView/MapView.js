'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';
import './MapView.css';

// Dynamically import the map components with no SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

const MapView = ({ doctors }) => {
  return (
    <div className="map-view-container">
      <div className="map-container">
        {typeof window !== 'undefined' && (
          <MapContainer 
            center={[30.0444, 31.2357]} 
            zoom={13} 
            style={{height: "600px", width: "100%", borderRadius: "8px"}}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {doctors.map(doctor => (
              doctor.location && (
                <Marker position={doctor.location.coordinates} key={doctor.id}>
                  <Popup>
                    <div className="map-popup">
                      <Image
                        src={doctor.image}
                        alt={`${doctor.name}'s profile`}
                        width={50}
                        height={50}
                        className="doctor-marker-image"
                      />
                      <h4>{doctor.name}</h4>
                      <p>{doctor.specialty}</p>
                      <div className="rating">
                        <FaStar className="star-icon" />
                        <span>{doctor.rating}</span>
                        <span>({doctor.reviews} reviews)</span>
                      </div>
                      <button className="book-button">Book Appointment</button>
                    </div>
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
        )}
      </div>
      <div className="map-sidebar">
        <h3>Doctors Near You</h3>
        <div className="map-doctors-list">
          {doctors.map(doctor => (
            <div key={doctor.id} className="map-doctor-card">
              <Image
                src={doctor.image}
                alt={`${doctor.name}'s profile`}
                width={80}
                height={80}
                className="doctor-info-image"
              />
              <div className="map-doctor-info">
                <h4>{doctor.name}</h4>
                <p>{doctor.specialty}</p>
                <div className="rating">
                  <FaStar className="star-icon" />
                  <span>{doctor.rating}</span>
                  <span>({doctor.reviews} reviews)</span>
                </div>
                <div className="location">
                  <FaMapMarkerAlt />
                  <span>{doctor.location.address}</span>
                </div>
                <button className="book-button">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;