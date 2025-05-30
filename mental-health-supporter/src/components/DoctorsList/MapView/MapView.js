import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

const MapView = ({ doctors }) => {
  return (
    <div className="map-view-container">
      <div className="map-container">
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
                    <img src={doctor.image} alt={doctor.name} />
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
      </div>
      <div className="map-sidebar">
        <h3>Doctors Near You</h3>
        <div className="map-doctors-list">
          {doctors.map(doctor => (
            <div key={doctor.id} className="map-doctor-card">
              <img src={doctor.image} alt={doctor.name} />
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