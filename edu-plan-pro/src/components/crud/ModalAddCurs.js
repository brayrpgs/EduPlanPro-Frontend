import { useState, useEffect } from "react"
import ModalBase from "../modals/ModalBase"
import InputForm from "../form/InputForm"
import {SweetAlertSuccess} from "../../assets/js/sweetalert.js"

const ModalAddCurs = () => {
    const [showAlert, setShowAlert] =useState(false)

    useEffect(() => {
        if(showAlert){
            SweetAlertSuccess("Registro exitoso!")
        }

        setTimeout(()=> {
            setShowAlert(false)
         }, 3000)
    }, [ showAlert ])
    /* ejemplo de una alerta para el boton */
/*  ahi en el modalbase, le paso el nombre del modal, el id del mae y el nombre del boton para cerrarlo*/ 
    
  return (
    <ModalBase 
        title={"Crear un curso"}
        idModal={"modalAddCurs"}
        idBtnClose={"closeModalAddCurs"}    
    >


        {/* ejemplo utulizando un div y el otro llamando el formulario generico */}
          <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="name" placeholder="Nombre de curso..." />
          </div>

          <InputForm typeInput={"text"} nameInput={"name"} label={"Nombre"} placeholder={"nombre de curso..."} />   
          <InputForm typeInput={"number"} nameInput={"name"} label={"Año"} placeholder={"Digite el año del curso"} />  

<div className="d-flex justify-content-center">
        <button className="btn btn-success mt-3" onClick={()=>setShowAlert(true)} style={{maxWidth: "100px"}}>Guardar</button>

</div>

    </ModalBase>
  )
}

export default ModalAddCurs