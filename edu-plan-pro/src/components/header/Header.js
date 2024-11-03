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

  const handleSchoolClick = () => {
    navigate('/school');
  };

  const handleFacultyClick = () => {
    navigate('/faculty');
  };

  const handleTeacherClick = () => {
    navigate('/teacher');
  };

  const handleUserClick = () => {
    navigate('/user');
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
        <nav className="nav-links">
          <button 
            onClick={handleSchoolClick} 
            className="nav-link"
          >
            Escuelas
          </button>
          <button 
            onClick={handleFacultyClick} 
            className="nav-link"
          >
            Facultades
          </button>
          <button 
            onClick={handleTeacherClick} 
            className="nav-link"
          >
            Profesores
          </button>
          <button 
            onClick={handleUserClick} 
            className="nav-link"
          >
            Usuarios
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;