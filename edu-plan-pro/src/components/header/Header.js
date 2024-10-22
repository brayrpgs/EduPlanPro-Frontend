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

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleCoursePlanClick = () => {
    navigate('/coursesplan',{
      replace: true,
      state: {
        logged: true  
      }

    });
  };
  const handleSchoolClick = () => {
    navigate('/school',{
      replace: true,
      state: {
        logged: true  
      }

    });
  };

  const handleFacultyClick = () => {
    navigate('/faculty',{
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
        <nav className="nav-links">
          <button 
            onClick={handleLoginClick} 
            className="nav-link"
          >
            Login
          </button>
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
            onClick={handleCoursePlanClick} 
            className="nav-link"
          >
            Planes De Estudio
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;