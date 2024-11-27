import React from "react";
import NextPage from "../icons/PaginationIcons/NextPage";
import PreviousPage from "../icons/PaginationIcons/PreviousPage";
import FirstPage from "../icons/PaginationIcons/FirstPage"
import LastPage from "../icons/PaginationIcons/LastPage"
import "./Pagination.css"

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
        <button title={`Página ${i}`}
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "selected" : ""}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="pagination-container">
      <button title="Primera página" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
        <FirstPage/>
      </button>
      <button title="Página anterior"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <PreviousPage />
      </button>

      {startPage > 1 && <span>...</span>}
      {generatePageButtons()}
      {endPage < totalPages && <span>...</span>}

      <button title="Página siguiente"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <NextPage />
      </button>
      <button title="Última página"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <LastPage />
      </button>
    </div>
  );
}

export default Pagination;
