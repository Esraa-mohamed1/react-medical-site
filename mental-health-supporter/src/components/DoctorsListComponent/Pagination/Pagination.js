import React from 'react';
import './Pagination.css';
import { useTranslation } from 'react-i18next';


const Pagination = ({ currentPage, totalPages, paginate }) => {
  const { t } = useTranslation();

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Always show first page
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Always show last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button 
        className="pagination-button" 
        disabled={currentPage === 1}
        onClick={() => paginate(currentPage - 1)}
      >
        &lt; {t('pagination.previous')}
      </button>
      
      {getPageNumbers().map((number, index) => (
        number === '...' ? (
          <span key={index} className="pagination-ellipsis">...</span>
        ) : (
          <button
            key={index}
            className={`pagination-button ${currentPage === number ? 'active' : ''}`}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        )
      ))}
      
      <button 
        className="pagination-button" 
        disabled={currentPage === totalPages}
        onClick={() => paginate(currentPage + 1)}
      >
        {t('pagination.next')} &gt;
      </button>
    </div>
  );
};

export default Pagination;