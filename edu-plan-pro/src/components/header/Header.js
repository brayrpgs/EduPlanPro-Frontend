import React, { useState } from 'react';
import './Header.css';
import logo from '../images/LOGO.jpg';

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
    
    </header>
  );
};

export default Header;
