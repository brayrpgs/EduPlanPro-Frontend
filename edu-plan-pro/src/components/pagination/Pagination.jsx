import React from 'react';

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Configuración de rango de páginas visibles
  const visiblePages = 5; // Número máximo de botones a mostrar
  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = Math.min(totalPages, startPage + visiblePages - 1);

  if (endPage - startPage < visiblePages - 1) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  const generatePageButtons = () => {
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{ fontWeight: currentPage === i ? 'bold' : 'normal' }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
        Primera
      </button>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Anterior
      </button>

      {startPage > 1 && <span>...</span>}
      {generatePageButtons()}
      {endPage < totalPages && <span>...</span>}

      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Siguiente
      </button>
      <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
        Última
      </button>
    </div>
  );
}

export default Pagination;
