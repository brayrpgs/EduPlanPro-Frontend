import React, { useEffect, useState } from 'react';

const FacultiesComponent = () => {
  const [faculties, setFaculties] = useState([]);  // Estado para almacenar las facultades
  const [loading, setLoading] = useState(true);    // Estado para manejar la carga
  const [error, setError] = useState(null);        // Estado para manejar errores

  // Función que obtiene las facultades
  const getAllFaculties = async () => {
    try {
      const response = await fetch(`http://localhost:3001/faculty`, {
        method: "GET",
        credentials: 'include',
      });
      const data = await response.json();
      return data.data; // Aquí asumimos que los datos se encuentran en `data.data`
    } catch (err) {
      console.error(err.message);
      throw err; // Lanza el error para que pueda manejarse en el uso de la función
    }
  };

  // Efecto para realizar la consulta cuando el componente se monta
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const facultiesData = await getAllFaculties();
        setFaculties(facultiesData); // Guardar los datos en el estado
      } catch (err) {
        setError('Error al cargar las facultades');
      } finally {
        setLoading(false); // Detener la carga
      }
    };

    fetchFaculties();
  }, []); // Ejecutar solo una vez al montar el componente

  // Si está cargando, mostrar un mensaje de carga
  if (loading) {
    return <div>Cargando facultades...</div>;
  }

  // Si ocurrió un error, mostrar el mensaje de error
  if (error) {
    return <div>{error}</div>;
  }

  // Renderizar las facultades si se cargaron correctamente
  return (
    <div>
      <h1>Facultades</h1>
      <ul>
        {faculties.map((faculty, index) => (
          <li key={index}>{faculty["NOMBRE FACULTAD"]}</li>
        ))}
      </ul>
    </div>
  );
};

export default FacultiesComponent;
