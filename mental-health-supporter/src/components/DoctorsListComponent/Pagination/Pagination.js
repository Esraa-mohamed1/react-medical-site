import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages }) => {
  return (
    <div className="pagination">
      <button className="pagination-button" disabled={currentPage === 1}>
        &lt; Previous
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          className={`pagination-button ${currentPage === page ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}
      
      <button className="pagination-button" disabled={currentPage === totalPages}>
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;