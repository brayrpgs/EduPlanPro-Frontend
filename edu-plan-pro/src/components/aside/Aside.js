import React from 'react';
import accountCircle from '../images/account_circle.svg';

const Aside = () => { 
  return (
    <aside className="d-flex flex-column bg-light p-3" style={{ height: '100vh', width: '250px', position: 'fixed', right: 0 }}>
        <div className="mb-4"> {/* Aquí se agrega el margen inferior */}
            <a href="#" className="nav-link active">
                <img src={accountCircle} alt="Profile" />
            </a>
            <h2 className="mb-1 fs-6"  style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>
                Carlos Orellana</h2>
        </div>

        <ul className="nav flex-column">
            <li className="nav-item mb-3"> 
                <a href="#" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>Mi perfil</a>
            </li>
            <li className="nav-item mb-3">
                <a href="#" style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>Cambiar Clave</a>
            </li>
            <li className="nav-item mb-3">
                <a href="#"  style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>Preferencias</a>
            </li>
            <li className="nav-item mb-3">
                <a href="#"  style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>Salir</a>
            </li>
        </ul>
    </aside>
  );
}

export default Aside;
