import Swal from "sweetalert2";

const insertStyles = () => {
  const style = `
    <style>
      .btn-red {
        background-color: "#A31E32" !important;
        color: white !important;          
        border: none !important;          
        padding: 10px 20px !important;    
        border-radius: 5px !important;    
        font-size: 16px !important;      
      }
    </style>
  `;
  document.head.insertAdjacentHTML("beforeend", style);
};

// Llama a esta función para insertar los estilos cuando cargues la alerta
insertStyles();

export const SweetAlertSuccess = (message) => {

  Swal.fire({
    position: 'center',
    icon: 'success',
    iconColor:"#7CDA24",
    title: message,
    confirmButtonText: 'Aceptar',
    confirmButtonColor:"#A31E32",
    
  })
 };


export const SweetAlertError = (message) => {
  Swal.fire({
    position: 'center',
    icon: 'error',
    iconColor:"#A31E32",
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
 }

export const SweetAlertInfo = (message) => {
  Swal.fire({
    position: 'center',
    icon: 'info',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
 }

export const SweetAlertWarning = (message) => {
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
 }

export const SweetAlertQuestion = ( title, message, funtion, messageResponse) => {
  Swal.fire({
    title: title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      //ejecutar funcion
      funtion();

      SweetAlertSuccess(messageResponse);
    }
  })
  

}
export const SweetAlertDelete = (eliminarTexto, eliminarFuncion) => {
  Swal.fire({
    title: "Eliminar",
    text: eliminarTexto,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor:'#d33',
    cancelButtonColor: '#000000',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar'
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      // Ejecutar la función de eliminación
      eliminarFuncion();
    }
  });
}

export const SweetAlertData = (title, text) =>{
  Swal.fire({
    title: title,
    text: text,
    confirmButtonColor: '#3085d6',
  })
}


export const SweetAlertConfirm = (title, text, funcionAceptar, funcionCancelar) => {
  Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#52BE80',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      funcionAceptar();
    }else{
      funcionCancelar();
    }
  })
}

export const SweetAlertAccept = (title, text, funcionAceptar) => {
  Swal.fire({
    title: title,
    text: text,
    icon: 'success',
    confirmButtonColor: '#52BE80',
    confirmButtonText: 'Aceptar',
  }).then((result) => {
    if (result.isConfirmed) {
      funcionAceptar();
    }
  })
}

export const BotonCancelar = (message) => {
  Swal.fire({
    title: 'Cancelado',
    text: 'Acción cancelada',
    icon: 'info',
  iconColor:"#2b3843",
    confirmButtonColor: '#A31E32',
    confirmButtonText: 'Aceptar'

    });
  };

