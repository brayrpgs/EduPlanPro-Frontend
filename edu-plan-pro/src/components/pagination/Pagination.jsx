import React from "react";
import NextPage from "../icons/PaginationIcons/NextPage";
import PreviousPage from "../icons/PaginationIcons/PreviousPage";
import FirstPage from "../icons/PaginationIcons/FirstPage";
import LastPage from "../icons/PaginationIcons/LastPage";

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
          title={`Página ${i}`}
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-[2.3vw] h-[4vh] flex justify-center items-center text-[2vh] rounded-[50%] ${
            currentPage === i ? "bg-UNA-Red text-white font-bold" : ""
          }`}        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex flex-row items-center justify-center w-full h-full mt-[1.5vh] gap-[0.5vw]">
      <button
        className="disabled:cursor-not-allowed disabled:opacity-50 bg-none border-none margin-0 outline-none w-[3vw] h-[3vh] rounded-[50%] flex text-center justify-center items-center"
        title="Primera página"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        <FirstPage />
      </button>

      <button
        className="disabled:cursor-not-allowed disabled:opacity-50 bg-none border-none margin-0 outline-none w-[3vw] h-[3vh] rounded-[50%] flex text-center justify-center items-center"
        title="Página anterior"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <PreviousPage />
      </button>

      {startPage > 1 && <span className="my-0 mx-[1vw]">...</span>}
      {generatePageButtons()}
      {endPage < totalPages && <span className="my-0 mx-[1vw]">...</span>}

      <button
        className="disabled:cursor-not-allowed disabled:opacity-50 bg-none border-none margin-0 outline-none w-[3vw] h-[3vh] rounded-[50%] flex text-center justify-center items-center"
        title="Página siguiente"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <NextPage />
      </button>

      <button
        className="disabled:cursor-not-allowed disabled:opacity-50 bg-none border-none margin-0 outline-none w-[3vw] h-[3vh] rounded-[50%] flex text-center justify-center items-center"
        title="Última página"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <LastPage />
      </button>
    </div>
  );
}

export default Pagination;
