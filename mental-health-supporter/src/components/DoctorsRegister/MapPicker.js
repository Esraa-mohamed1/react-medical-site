import React, { useRef, useEffect, useState } from 'react';

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // <-- Replace with your key

export default function MapPicker({ show, onClose, onPick, lat, lng }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInstance = useRef(null);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    if (!show) return;
    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }
    // eslint-disable-next-line
  }, [show]);

  function initMap() {
    if (!mapRef.current) return;
    const center = {
      lat: lat ? parseFloat(lat) : 30.0444, // Default: Cairo
      lng: lng ? parseFloat(lng) : 31.2357
    };
    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 8
    });
    markerRef.current = new window.google.maps.Marker({
      position: center,
      map: mapInstance.current,
      draggable: true
    });
    mapInstance.current.addListener('click', (e) => {
      markerRef.current.setPosition(e.latLng);
    });
  }

  function handlePick() {
    if (markerRef.current && markerRef.current.getPosition) {
      const pos = markerRef.current.getPosition();
      if (pos) {
        onPick({
          lat: pos.lat(),
          lng: pos.lng()
        });
      }
    }
    onClose();
  }

  function handleUseMyLocation() {
    if (!window.google || !markerRef.current || !mapInstance.current) {
      alert('Map is still loading. Please try again in a moment.');
      return;
    }
    if (navigator.geolocation) {
      setLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocating(false);
          const userLatLng = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          markerRef.current.setPosition(userLatLng);
          mapInstance.current.setCenter(userLatLng);
          mapInstance.current.setZoom(14);
        },
        (error) => {
          setLocating(false);
          if (error.code === 1) {
            alert('Location access denied. Please allow location access in your browser.');
          } else {
            alert('Unable to retrieve your location.');
          }
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }

  if (!show) return null;
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.4)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#fff',padding:20,borderRadius:8,minWidth:350}}>
        <div ref={mapRef} style={{width:400,height:300}}></div>
        <div style={{marginTop:10,display:'flex',justifyContent:'flex-end',gap:8}}>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-info" onClick={handleUseMyLocation} disabled={locating}>
            {locating ? 'Locating...' : 'Use My Location'}
          </button>
          <button className="btn btn-primary" onClick={handlePick}>Pick Location</button>
        </div>
      </div>
    </div>
  );
}
