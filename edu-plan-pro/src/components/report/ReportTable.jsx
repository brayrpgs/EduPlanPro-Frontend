import React, { useState, useRef } from "react";
import SearchInput from "../search/SearchInput";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";
import Pagination from "../pagination/Pagination";
import Loading from "../componentsgeneric/Loading";
import { FetchValidate } from "../../utilities/FetchValidate";
import { useNavigate } from "react-router-dom";
import { ShowPDF } from "../componentsgeneric/ShowPDF";

const ReportTable = () => {
  // State Management
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [selectedReports, setSelectedReports] = useState([]); // State for tracking selected reports
  const navigate = useNavigate();
  
  // Flag para controlar si se está ejecutando una búsqueda
  const isSearchingRef = useRef(false);

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toISOString().split("T")[0];
  };
  
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
        if (column === "CREDITOS") {
          return filters[column] ? parseInt(filters[column]) : null;
        }
        if (column === "AÑO") {
          return filters[column] ? filters[column] : null;
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

  
      
      const response = await FetchValidate(url, options, navigate);

      console.log("Respuesta de búsqueda:", response);

      if (!response) {
        console.error("Error en la solicitud");
        return;
      }

      setReports(response.data?.rows || []);
      setTotalItems(response.data?.totalMatches || 0);
      setFiltersApplied(true);
      // Limpiar selecciones al cargar nuevos datos
      setSelectedReports([]);
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
    
    // Realizar la búsqueda inmediatamente con la nueva página
    performSearch(page);
  };

  // Manejador para cuando el usuario modifica un valor en un input
  const handleFilterChange = (value, column) => {
    // Actualizar el filtro directamente
    setFilters(prevFilters => ({
      ...prevFilters,
      [column]: value
    }));
  };

  // Manejador para cuando el usuario completa la entrada (sale del campo o presiona Tab/Enter)
  const handleCompleteFilter = (column) => {
   
    
    // Solo iniciar búsqueda si hay al menos un filtro con valor
    if (hasActiveFilter()) {
      // Reiniciar a la primera página
      setCurrentPage(1);
      
      // Realizar la búsqueda con los filtros actuales
      performSearch(1);
    }
  };

  // Manejador para limpiar filtros
  const handleClearFilters = () => {
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
    // Limpiar selecciones
    setSelectedReports([]);
  };

  // Funciones para manejar selección de reportes
  const toggleReportSelection = (index) => {
    setSelectedReports(prevSelected => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter(i => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  // Función para descargar los PDFs seleccionados
  const downloadSelectedPDFs = async () => {
    if (selectedReports.length === 0) {
      alert("Por favor seleccione al menos un reporte para descargar");
      return;
    }
    
    setLoading(true);
    
    try {
      // Obtener los reportes seleccionados
      const reportsToDownload = selectedReports.map(index => reports[index]);
      
      // Procesar cada reporte seleccionado
      for (const report of reportsToDownload) {
        const pdfUrl = report.PDF_URL;
        
        if (!pdfUrl) {
          console.warn(`No hay URL de PDF disponible para el reporte: ${report["PROGRAMA DEL CURSO"]}`);
          continue;
        }
        
        // Construir nombre de archivo
        const fileName = `${report["PROGRAMA DEL CURSO"]}_${report["NRC"]}_${report["AÑO"]}.pdf`;
        
        // Descargar el archivo
        try {
          const response = await fetch(pdfUrl, {
            method: "GET",
            credentials: "include",
          });
          
          if (!response.ok) {
            throw new Error(`Error al descargar: ${response.status} ${response.statusText}`);
          }
          
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          
          // Crear enlace y descargar
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          link.remove();
          
          // Liberar la URL del objeto
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error(`Error descargando ${fileName}:`, error);
        }
      }
      
      // Desmarcar las selecciones después de la descarga
      setSelectedReports([]);
      
    } catch (error) {
      console.error("Error en la descarga de PDFs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Seleccionar las 6 primeras columnas para mostrar
  const visibleColumns = columns.slice(0, 6);
  const hiddenColumns = columns.slice(6);

  // Función para renderizar un campo de búsqueda
  const renderSearchInput = (column) => {
    return (
      <div className="w-full flex flex-col" title={`Filtrar por ${column}`}>
        <input
          type="text"
          value={filters[column]}
          onChange={(e) => handleFilterChange(e.target.value, column)}
          onBlur={() => handleCompleteFilter(column)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Tab') {
              // Prevenir comportamiento por defecto para Tab dentro del input
              if (e.key === 'Tab') {
                e.preventDefault();
              }
              handleCompleteFilter(column);
            }
          }}
          className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red font-normal"
          
        />
      </div>
    );
  };
  
  return (
    <main>
      <div className="mt-[3vh] justify-start flex pr-[15vw] pl-[15vw]">
        <div className="bg-UNA-Blue-Dark w-full max-w-screens flex rounded-[0.5vh] items-center justify-between">
          <h1 className="ml-[1vw] my-[0.5vh] text-[2vw] text-white">
            Reportes
          </h1>
          {/* Botón de descarga */}
          <button 
            onClick={downloadSelectedPDFs}
            disabled={selectedReports.length === 0}
            className={`mr-[1vw] px-[1vw] py-[0.5vh] rounded-[0.3vh] text-white text-[1vw] ${
              selectedReports.length > 0 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-gray-500 cursor-not-allowed'
            }`}
            title={selectedReports.length > 0 
              ? `Descargar ${selectedReports.length} reporte(s) seleccionado(s)`
              : 'Seleccione al menos un reporte para descargar'}
          >
            Descargar PDFs ({selectedReports.length})
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full pl-[15vw] pr-[15vw]">
        <div className="flex flex-row w-full items-center justify-end gap-[0.3vw]">
          <div
            title="Limpiar filtros."
            className="flex h-[3.8vh] items-center cursor-pointer hover:scale-110"
            onClick={handleClearFilters}
          >
            <FilterOffIcon />
          </div>
        </div>
        
        {/* Contenedor principal con ancho fijo para controlar la visibilidad */}
        <div className="flex justify-center items-center mt-0 w-full overflow-x-auto">
          {/* Añadimos un contenedor con ancho fijo para las primeras 6 columnas */}
          <div style={{ 
            width: '70vw', /* 6 columnas × 12vw = 72vw */
            position: 'static ',
            overflow: 'hidden' 
          }}>
            {/* Contenedor con scroll horizontal */}
            <div className="overflow-x-auto" style={{ 
              width: '98%',
              position: 'relative'
            }}>
              <table className="table-auto" style={{ minWidth: '100vw' }}> {/* 14 columnas × 12vw = 168vw */}
                <thead>
                  <tr>
                    {/* Primeras 6 columnas visibles */}
                    {visibleColumns.map((column) => (
                      <th key={column} className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red whitespace-nowrap min-w-[12vw] bg-white">
                        {column}
                        {renderSearchInput(column)}
                      </th>
                    ))}
                    
                    {/* Columnas ocultas que aparecerán al hacer scroll */}
                    {hiddenColumns.map((column) => (
                      <th key={column} className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red whitespace-nowrap min-w-[12vw] bg-white">
                        {column}
                        {renderSearchInput(column)}
                      </th>
                    ))}
                    
                    {/* Columna de acciones fija */}
                    <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] w-[10vw] text-[1vw] text-UNA-Red  right-0 bg-white z-10 shadow-md">
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
                          {column === "AÑO" ? formatDate(report[column]) : report[column]}
                        </td>
                        ))}
                        
                        {/* Columnas ocultas que aparecerán al hacer scroll */}
                        {hiddenColumns.map((column) => (
                          <td key={`${index}-${column}`} className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw] bg-white">
                            {report[column]}
                          </td>
                        ))}
                        
                        {/* Columna de acciones fija */}
                        <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-[0.9vw]  right-0 bg-white z-10 shadow-md">
                          <div className="flex items-center flex-row justify-center w-full h-full gap-[0.5vw]">
                          <ShowPDF title={"PDF asociado al plan de estudio"} 
                              pdfUrl= {report["PDF_URL"]}
                            />
                            
                            
                            {/* Checkbox para seleccionar reporte */}
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedReports.includes(index)}
                                onChange={() => toggleReportSelection(index)}
                                className="w-[1vw] h-[1vw] cursor-pointer"
                                title="Seleccionar para descargar PDF"
                              />
                              <label 
                                className="ml-[0.3vw] text-[0.8vw] cursor-pointer" 
                                onClick={() => toggleReportSelection(index)}
                              >
                                PDF
                              </label>
                            </div>
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