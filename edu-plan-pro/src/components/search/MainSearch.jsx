'use client'

import React, { useState } from 'react';

export function MainSearch() {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  const inputStyle = {
    padding: '10px 40px 10px 20px', // espacio a la derecha para la "X"
    outline: 'none',
    flexGrow: 1,
    zIndex: 2, // asegurar que el input esté por encima
    position: 'relative', // necesario para el posicionamiento del "X"
    borderTopLeftRadius: '25px', // Borde redondeado a la izquierda
    borderBottomLeftRadius: '25px', // Borde redondeado a la izquierda
    borderTopRightRadius: '0', // Sin redondeado a la derecha
    borderBottomRightRadius: '0',
  };

  const clearButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    position: 'absolute',
    right: '50px', // espacio para la "X"
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 3, // asegurar que la "X" esté por encima
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '25px', // Bordes redondeados
    padding: '1px',
    maxWidth: '600px',
    margin: 'auto',
    position: 'relative',
  };

  const separatorStyle = {
    width: '2px',
    backgroundColor: '#ccc',
    height: '25px',
    position: 'absolute',
    right: '50px', // espacio para el ícono de búsqueda
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
  };

  const searchIconStyle = {
    marginLeft: '10px',
    cursor: 'pointer',
    zIndex: 2,
  };

  return (
    <div style={containerStyle}>
      <input
        type="text"
        placeholder="Buscar"
        value={searchText}
        onChange={handleInputChange}
        style={inputStyle}
      />
      {searchText && (
        <button
          onClick={handleClearSearch}
          style={clearButtonStyle}
          title="Borrar búsqueda"
        >
          ✖
        </button>
      )}
      <div style={separatorStyle}></div> {/* Barra vertical */}
      <div style={searchIconStyle} title="Buscar" onClick={() => console.log('Buscando:', searchText)}>
        🔍 {/* Puedes reemplazar este carácter con un ícono SVG o una imagen si lo deseas */}
      </div>
    </div>
  );
}
