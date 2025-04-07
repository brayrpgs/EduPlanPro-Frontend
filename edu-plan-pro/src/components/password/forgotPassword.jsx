import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";

const ForgotPassword = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const [securityQuestions, setSecurityQuestions] = useState({
    question1: "",
    question2: "",
    question3: ""
  });
  
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    newPasswordConfirmation: "",
    ID_USER: ""
  });

  function closeActions() {
    setIsOpen(false);
    setSecurityQuestions({
      question1: "",
      question2: "",
      question3: ""
    });
    navigate("/login");
  }

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setSecurityQuestions({
      ...securityQuestions,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
      ID_USER: userId // Always include the user ID
    });
  };

  function validateQuestions() {
    if (!securityQuestions.question1 || !securityQuestions.question2 || !securityQuestions.question3) {
      Swal.fire({
        icon: "error",
        iconColor: "#A31E32",
        title: "Campos incompletos",
        text: "Por favor responde todas las preguntas de seguridad.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#A31E32",
      });
      return false;
    }
    return true;
  }

  function validatePasswords() {
    if (!passwordData.newPassword || !passwordData.newPasswordConfirmation) {
      Swal.fire({
        icon: "error",
        iconColor: "#A31E32",
        title: "Campos incompletos",
        text: "Ambos campos de contraseña deben estar completos.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#A31E32",
      });
      return false;
    }
    
    if (passwordData.newPassword !== passwordData.newPasswordConfirmation) {
      Swal.fire({
        icon: "error",
        iconColor: "#A31E32",
        title: "Contraseñas no coinciden",
        text: "Las contraseñas ingresadas no coinciden. Por favor inténtalo de nuevo.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#A31E32",
      });
      return false;
    }
    
    return true;
  }

  const handleVerifyQuestions = async () => {
    const url = "http://localhost:3001/forgotpassword";

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(securityQuestions),
      credentials: "include",
    };

    if (validateQuestions()) {
      try {
        setLoading(true);
        const response = await FetchValidate(url, options, navigate);

        if (!response) {
          console.error("Error en la solicitud");
          return;
        }

        if (response.code === "200") {
          setUserId(response.message[0].ID_USER);
          setIsPasswordChangeOpen(true);
          setIsOpen(false);
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#a31e32",
            title: "Respuestas incorrectas",
            text: "Las respuestas proporcionadas no coinciden con nuestros registros.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A31E32",
          });
        }
      } catch (error) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error al verificar",
          text: "Intenta de nuevo más tarde.",
          confirmButtonColor: "#A31E32",
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePasswordUpdate = async () => {
    const url = "http://localhost:3001/changepassword";

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwordData),
      credentials: "include",
    };

    if (validatePasswords()) {
      try {
        setLoading(true);
        const response = await FetchValidate(url, options, navigate);

        if (!response) {
          console.error("Error en la solicitud");
          return;
        }

        if (response.code === "200") {
          Swal.fire({
            icon: "success",
            iconColor: "#7cda24",
            title: "Contraseña actualizada",
            text: "Tu contraseña ha sido actualizada correctamente.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A31E32",
          }).then(() => {
            setIsPasswordChangeOpen(false);
            closeActions();
            setPasswordData({
              newPassword: "",
              newPasswordConfirmation: "",
              ID_USER: ""
            });
          });
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#a31e32",
            title: "Error al actualizar",
            text: "No se pudo actualizar la contraseña. Por favor inténtalo de nuevo.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A31E32",
          }).then(() => {
            closeActions();
          });
        }
      } catch (error) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error al actualizar",
          text: "Intenta de nuevo más tarde.",
          confirmButtonColor: "#A31E32",
        }).then(() => {
          closeActions();
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      
      {/* First Modal - Security Questions */}
      <div
        className={`${!isOpen && "hidden"
          } bg-gray-600/50 min-h-screen w-full z-40 flex fixed top-0 right-0 left-0 backdrop-blur-[0.3vh]`}
        onClick={() => closeActions()}
      ></div>

      <div
        className={`${isOpen
            ? "w-[35vw] min-h-[30vh] overflow-hidden bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-start border-[-1vh] border-gray-400 rounded-[1vh] transition-[width] duration-300"
            : "w-[15%]"
          }`}
      >
        {isOpen && (
          <div className="w-full flex flex-col justify-center items-center ">
            <div className="bg-UNA-Red w-full h-[7vh] flex top-0 fixed border-white z-50 rounded-t-[1vh] text-start items-center">
              <h1 className="text-[3vh] ml-[1vw] text-white">Verificación de identidad</h1>
              <div className="w-[5vw] right-0 h-full absolute flex text-center justify-center items-center">
                <button
                  className="flex w-[60%] h-[60%] bg-UNA-Pink-Light rounded-[0.5vh] items-center justify-center"
                  onClick={() => closeActions()}
                >
                  <div className="flex w-[75%] h-[75%] ">
                    <CancelActionIcon />
                  </div>
                </button>
              </div>
            </div>
            <div className="w-full max-w-full mt-[7vh] mb-[7vh] flex flex-col items-start relative">
              <label className="text-left ml-[1vw] mt-[3vh] font-bold text-[1.2vw]" htmlFor="question1">
                Primer nombre
              </label>
              <input
                className="w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none border-[0.1vh]"
                autoComplete="off"
                spellCheck="false"
                placeholder="Ingresa tu primer nombre"
                value={securityQuestions.question1}
                onChange={handleQuestionChange}
                name="question1"
                id="question1"
                type="text"
              />

              <label className="text-left ml-[1vw] mt-[2vh] font-bold text-[1.2vw]" htmlFor="question2">
                Apellidos
              </label>
              <input
                className="w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none border-[0.1vh]"
                autoComplete="off"
                spellCheck="false"
                placeholder="Ingresa tus apellidos"
                value={securityQuestions.question2}
                onChange={handleQuestionChange}
                name="question2"
                id="question2"
                type="text"
              />

              <label className="text-left ml-[1vw] mt-[2vh] font-bold text-[1.2vw]" htmlFor="question3">
                Número de identificación
              </label>
              <input
                className="w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none border-[0.1vh]"
                autoComplete="off"
                spellCheck="false"
                placeholder="Ingresa tu número de identificación"
                value={securityQuestions.question3}
                onChange={handleQuestionChange}
                name="question3"
                id="question3"
                type="text"
              />
            </div>

            {loading && (
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-60">
                <Loading />
              </div>
            )}

            <div className="w-full h-[7vh] flex bottom-0 fixed border-white z-50 text-center justify-center items-center">
              <button
                className="border-[0.1vh] bg-UNA-Red text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[1vw] mr-[0.1vw]"
                onClick={() => handleVerifyQuestions()}
              >
                Verificar
              </button>
              <button
                className="border-[0.1vh] bg-UNA-Blue-Dark text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[0.1vw] mr-[1vw]"
                onClick={() => closeActions()}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Second Modal - Password Change */}
      <div
        className={`${!isPasswordChangeOpen && "hidden"
          } bg-gray-600/50 min-h-screen w-full z-40 flex fixed top-0 right-0 left-0 backdrop-blur-[0.3vh]`}
        onClick={() => setIsPasswordChangeOpen(false)}
      ></div>

      <div
        className={`${isPasswordChangeOpen
            ? "w-[35vw] min-h-[30vh] overflow-hidden bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-start border-[-1vh] border-gray-400 rounded-[1vh] transition-[width] duration-300"
            : "w-[15%]"
          }`}
      >
        {isPasswordChangeOpen && (
          <div className="w-full flex flex-col justify-center items-center ">
            <div className="bg-UNA-Red w-full h-[7vh] flex top-0 fixed border-white z-50 rounded-t-[1vh] text-start items-center">
              <h1 className="text-[3vh] ml-[1vw] text-white">Cambiar contraseña</h1>
              <div className="w-[5vw] right-0 h-full absolute flex text-center justify-center items-center">
                <button
                  className="flex w-[60%] h-[60%] bg-UNA-Pink-Light rounded-[0.5vh] items-center justify-center"
                  onClick={() => setIsPasswordChangeOpen(false)}
                >
                  <div className="flex w-[75%] h-[75%] ">
                    <CancelActionIcon />
                  </div>
                </button>
              </div>
            </div>
            <div className="w-full max-w-full mt-[7vh] mb-[7vh] flex flex-col items-start relative">
              <label className="text-left ml-[1vw] mt-[3vh] font-bold text-[1.2vw]" htmlFor="newPassword">
                Nueva contraseña
              </label>
              <input
                className="w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none border-[0.1vh]"
                autoComplete="off"
                spellCheck="false"
                placeholder="Ingresa tu nueva contraseña"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                name="newPassword"
                id="newPassword"
                type="password"
              />

              <label className="text-left ml-[1vw] mt-[2vh] font-bold text-[1.2vw]" htmlFor="newPasswordConfirmation">
                Confirmar contraseña
              </label>
              <input
                className="w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none border-[0.1vh]"
                autoComplete="off"
                spellCheck="false"
                placeholder="Confirma tu nueva contraseña"
                value={passwordData.newPasswordConfirmation}
                onChange={handlePasswordChange}
                name="newPasswordConfirmation"
                id="newPasswordConfirmation"
                type="password"
              />
            </div>

            {loading && (
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-60">
                <Loading />
              </div>
            )}

            <div className="w-full h-[7vh] flex bottom-0 fixed border-white z-50 text-center justify-center items-center">
              <button
                className="border-[0.1vh] bg-UNA-Red text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[1vw] mr-[0.1vw]"
                onClick={() => handlePasswordUpdate()}
              >
                Actualizar
              </button>
              <button
                className="border-[0.1vh] bg-UNA-Blue-Dark text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[0.1vw] mr-[1vw]"
                onClick={() => setIsPasswordChangeOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;