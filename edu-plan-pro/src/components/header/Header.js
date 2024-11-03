import React from 'react';
import { useNavigate } from 'react-router-dom'; 

import './Header.css';

import logo from '../icons/HeaderIcons/logo transparente.svg';

const Header = () => {
  const navigate = useNavigate();
  
  const handleLogoClick = () => {
    navigate('/coursesplan',{
      replace: true,
      state: {
        logged: true  
      }

    }); 
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <img
            src={logo}
            alt="Logo"
            className="logo"
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }} 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;