import React from 'react';

// Example component structure for a colored doctor page
const DoctorPage = ({ children }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6D5ACF 0%, #4D3ACF 100%)',
        padding: '0',
        margin: '0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(hsl(240, 6%, 97%) 0%)',
          borderRadius: '18px',
          margin: '32px auto',
          maxWidth: '1100px',
          width: '95%',
          boxShadow: '0 4px 32px rgba(77,58,207,0.10)',
          padding: '32px',
        }}
      >
        {/* Place your doctor page content/components here */}
        {children || <h2 style={{ color: '#4D3ACF', textAlign: 'center' }}>Doctor Page</h2>}
      </div>
    </div>
  );
};

export default DoctorPage;
