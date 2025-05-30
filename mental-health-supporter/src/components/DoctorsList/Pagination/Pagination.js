import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];
  
  // Always show first page
  if (totalPages > 0) {
    pageNumbers.push(1);
  }

  // Show pages around current page
  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);
  
  for (let i = startPage; i <= endPage; i++) {
    if (i > 1 && i < totalPages) {
      pageNumbers.push(i);
    }
  }

  // Always show last page if different from first
  if (totalPages > 1) {
    pageNumbers.push(totalPages);
  }

  // Remove duplicates and sort
  const uniquePages = [...new Set(pageNumbers)].sort((a, b) => a - b);

  return (
    <div className="pagination">
      <button 
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        &laquo; Previous
      </button>
      
      {uniquePages.map((number, index) => (
        <React.Fragment key={number}>
          {index > 0 && number - uniquePages[index - 1] > 1 && (
            <span className="pagination-ellipsis">...</span>
          )}
          <button
            onClick={() => paginate(number)}
            className={`pagination-button ${currentPage === number ? 'active' : ''}`}
          >
            {number}
          </button>
        </React.Fragment>
      ))}
      
      <button 
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;