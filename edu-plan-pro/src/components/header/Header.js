import React, { useState } from 'react';
import './Header.css';
import logo from '../images/LOGO.jpg';
import menu_header from '../images/menu_header.svg';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="icons-container">
          <i className="fas fa-search"></i>
          <i className="fas fa-bars"></i>
        </div>
      </div>
      
      {/* Implementación de Carlos para mostrar el aside */}
      <div className='menu-header-container'>
        <img src={menu_header} alt="menuAside" />
      </div>

    </header>
  );
};

export default Header;
