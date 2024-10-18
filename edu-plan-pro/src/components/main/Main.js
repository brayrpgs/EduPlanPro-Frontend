/* import Aside from '../aside/Aside';
import Footer from '../footer/Footer';
import Header from '../header/Header';  */
import MainTable from '../maintable/MainTable';
import Layout from "../Layout/Layout";
import { MdAdd } from "react-icons/md";
import ModalAddCurs from "../crud/ModalAddCurs";

function Main() {
  return (
    <Layout>


    
      <h2 className='text-center mt-3'>Programa de cursos</h2>

      {/*inicio Ejemplo de uso modales reutilizables */}
      <div className='d-flex justify-content-between mx-5'>
          <h2>Administrar cursos</h2>
                                                                             {/*apuntar al modal y poder abrirlo + MdAdd es un icono de react icons*/}
          <button className='btn btn-dark mt-3' style={{maxWidth:"100px"}} data-bs-toggle="modal" data-bs-target="#modalAddCurs"><MdAdd />  Curso</button>
      </div>
      <ModalAddCurs />
       {/* fin Ejemplo de uso modales reutilizables */}
      
      <MainTable />
    </Layout>
  
  );
}

export default Main;
