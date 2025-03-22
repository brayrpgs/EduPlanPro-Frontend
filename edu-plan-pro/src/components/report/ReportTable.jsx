import React, { useState, useRef } from "react";
import SearchInput from "../search/SearchInput";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";
import Pagination from "../pagination/Pagination";
import Loading from "../componentsgeneric/Loading";
import { FetchValidate } from "../../utilities/FetchValidate";
import { useNavigate } from "react-router-dom";

const ReportTable = () => {
  // State Management
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const navigate = useNavigate();
  
  // Referencia para el timeout de debounce
  const searchTimeoutRef = useRef(null);
  
  // Flag para controlar si se está ejecutando una búsqueda
  const isSearchingRef = useRef(false);
  
  // Columnas de la tabla
  const columns = [
    "PROGRAMA DEL CURSO",
    "PLAN DE ESTUDIO",
    "NRC",
    "AÑO",
    "CREDITOS",
    "CICLO",
    "FIRMA",
    "CORREO DEL PROFESOR",
    "NOMBRE DEL PROFESOR",
    "APELLIDOS",
    "CARRERA",
    "CODIGO DE CARRERA",
    "ESCUELA",
    "FACULTAD"
  ];

  // Filtros para cada columna
  const [filters, setFilters] = useState({
    "PROGRAMA DEL CURSO": "",
    "PLAN DE ESTUDIO": "",
    "NRC": "",
    "AÑO": "",
    "CREDITOS": "",
    "CICLO": "",
    "FIRMA": "",
    "CORREO DEL PROFESOR": "",
    "NOMBRE DEL PROFESOR": "",
    "APELLIDOS": "",
    "CARRERA": "",
    "CODIGO DE CARRERA": "",
    "ESCUELA": "",
    "FACULTAD": ""
  });

  // Función para verificar si hay un filtro activo
  const hasActiveFilter = () => {
    return Object.values(filters).some(value => value !== "");
  };

  // Función para realizar la búsqueda
  const performSearch = async (page) => {
    // Evitar múltiples búsquedas simultáneas
    if (isSearchingRef.current) {
      return;
    }
    
    // No realizar búsqueda si no hay filtros
    if (!hasActiveFilter()) {
      setReports([]);
      setTotalItems(0);
      setFiltersApplied(false);
      return;
    }
    
    // Marcar que estamos buscando
    isSearchingRef.current = true;
    setLoading(true);
    
    try {
      // Preparar los parámetros
      const params = columns.map(column => {
        if (column === "AÑO" || column === "CREDITOS") {
          return filters[column] ? parseInt(filters[column]) : null;
        }
        return filters[column];
      });

      const requestData = {
        params: params,
        page: page
      };

      // Realizar la solicitud
      const url = `http://localhost:3001/reports`;
      const options = {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      };

      console.log("Realizando búsqueda con página:", page);
      
      const response = await FetchValidate(url, options, navigate);

      if (!response) {
        console.error("Error en la solicitud");
        return;
      }

      setReports(response.data?.rows || []);
      setTotalItems(response.data?.totalMatches || 0);
      setFiltersApplied(true);
    } catch (error) {
      console.error("Error cargando datos de reportes:", error);
    } finally {
      setLoading(false);
      // Marcar que terminamos de buscar
      isSearchingRef.current = false;
    }
  };

  // Manejador para el cambio de página
  const handlePageChange = (page) => {
    // Actualizar la página actual
    setCurrentPage(page);
    
    // Cancelar cualquier búsqueda pendiente
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }
    
    // Realizar la búsqueda inmediatamente con la nueva página
    performSearch(page);
  };

  // Manejador para el cambio de filtros
  const handleSearch = (value, column) => {
    // Actualizar el filtro
    setFilters(prevFilters => ({
      ...prevFilters,
      [column]: value
    }));
    
    // Cancelar cualquier búsqueda pendiente
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }
    
    // Programar una nueva búsqueda con debounce
    searchTimeoutRef.current = setTimeout(() => {
      setCurrentPage(1); // Restablecer a la primera página
      performSearch(1);
      searchTimeoutRef.current = null;
    }, 500);
  };

  // Manejador para limpiar filtros
  const handleClearFilters = () => {
    // Cancelar cualquier búsqueda pendiente
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }
    
    // Restablecer todos los filtros
    const resetFilters = {};
    columns.forEach(column => {
      resetFilters[column] = "";
    });
    setFilters(resetFilters);
    
    // Limpiar resultados y estado
    setCurrentPage(1);
    setReports([]);
    setTotalItems(0);
    setFiltersApplied(false);
  };

  // Seleccionar las 6 primeras columnas para mostrar
  const visibleColumns = columns.slice(0, 6);
  const hiddenColumns = columns.slice(6);

  return (
    <main>
      <div className="mt-[3vh] justify-start flex pr-[15vw] pl-[15vw]">
        <div className="bg-UNA-Blue-Dark w-full max-w-screens flex rounded-[0.5vh] items-center">
          <h1 className="ml-[1vw] my-[0.5vh] text-[2vw] text-white">
            Reportes
          </h1>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full pl-[15vw] pr-[15vw]">
        <div className="flex flex-row w-full items-center justify-end gap-[0.3vw] mb-[1vh]">
          <div
            title="Limpiar filtros."
            className="flex h-[3.8vh] items-center cursor-pointer hover:scale-110"
            onClick={handleClearFilters}
          >
            <FilterOffIcon />
          </div>
        </div>
        
        {/* Contenedor principal con ancho fijo para controlar la visibilidad */}
        <div className="w-full flex justify-center items-center mt-0">
          {/* Añadimos un contenedor con ancho fijo para las primeras 6 columnas */}
          <div style={{ 
            width: '72vw', /* 6 columnas × 12vw = 72vw */
            position: 'relative',
            overflow: 'hidden' 
          }}>
            {/* Contenedor con scroll horizontal */}
            <div className="overflow-x-auto" style={{ 
              width: '100%',
              position: 'relative'
            }}>
              <table className="table-auto" style={{ minWidth: '168vw' }}> {/* 14 columnas × 12vw = 168vw */}
                <thead>
                  <tr>
                    {/* Primeras 6 columnas visibles */}
                    {visibleColumns.map((column) => (
                      <th key={column} className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red whitespace-nowrap min-w-[12vw] bg-white">
                        {column}
                        <div className="w-full flex flex-col" title={`Filtrar por ${column}`}>
                          <SearchInput
                            onSearch={(value) => handleSearch(value, column)}
                            filter={filters[column]}
                            setFilter={(value) => handleSearch(value, column)}
                            className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                          />
                        </div>
                      </th>
                    ))}
                    
                    {/* Columnas ocultas que aparecerán al hacer scroll */}
                    {hiddenColumns.map((column) => (
                      <th key={column} className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red whitespace-nowrap min-w-[12vw] bg-white">
                        {column}
                        <div className="w-full flex flex-col" title={`Filtrar por ${column}`}>
                          <SearchInput
                            onSearch={(value) => handleSearch(value, column)}
                            filter={filters[column]}
                            setFilter={(value) => handleSearch(value, column)}
                            className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                          />
                        </div>
                      </th>
                    ))}
                    
                    {/* Columna de acciones fija */}
                    <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] w-[8vw] text-[1vw] text-UNA-Red sticky right-0 bg-white z-10 shadow-md">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reports.length > 0 ? (
                    reports.map((report, index) => (
                      <tr key={index}>
                        {/* Primeras 6 columnas visibles */}
                        {visibleColumns.map((column) => (
                          <td key={`${index}-${column}`} className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw] bg-white">
                            {report[column]}
                          </td>
                        ))}
                        
                        {/* Columnas ocultas que aparecerán al hacer scroll */}
                        {hiddenColumns.map((column) => (
                          <td key={`${index}-${column}`} className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw] bg-white">
                            {report[column]}
                          </td>
                        ))}
                        
                        {/* Columna de acciones fija */}
                        <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-[0.9vw] sticky right-0 bg-white z-10 shadow-md">
                          <div className="flex items-center flex-row justify-center w-full h-full gap-[0.2vw]">
                            <button className="bg-UNA-Blue-Dark text-white px-[0.5vw] py-[0.3vh] rounded hover:bg-UNA-Blue-Light">
                              Ver
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length + 1}
                        className="px-[1vw] py-[1vh] text-[0.9vw] text-center items-center pt-[3.5vh]"
                      >
                        {!filtersApplied 
                          ? "Ingrese al menos un filtro para buscar reportes."
                          : "No se encontraron reportes con los filtros seleccionados."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="w-full h-[8vh] flex justify-center items-center">
          {filtersApplied && totalItems > 0 && (
            <Pagination
              totalItems={totalItems}
              itemsPerPage="8"
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
      {loading && <Loading />}
    </main>
  );
};

export default ReportTable;