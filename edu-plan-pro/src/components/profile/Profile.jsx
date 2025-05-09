import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading.jsx";
import { useAtom } from "jotai";
import { userAtom } from "../validatelogin/ValidateLogin.jsx";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";

const Profile = () => {
  const [user] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    nombre: "",
    apellidos: "",
    identificacion: "",
    rol: "",
    actualizadoPor: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.ID_USER) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await FetchValidate(
          "http://localhost:3001/searchuser",
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: user.ID_USER })
          },
          navigate
        );

        if (response?.data?.length) {
          const data = response.data[0];
          setProfileData({
            nombre: data.NOMBRE,
            apellidos: data.APELLIDOS,
            identificacion: data.IDENTIFICACION,
            rol: data.ROL,
            actualizadoPor: data["ACTUALIZADO POR"]
          });
        }
      } catch (err) {
        console.error("Error al cargar perfil:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen h-screen">
      <Header />
      <main>
        <div className="mt-[3vh] justify-start flex pr-[15vw] pl-[15vw]">
          <div className="bg-UNA-Blue-Dark w-full flex rounded-[0.5vh] items-center">
            <h1 className="ml-[1vw] my-[0.5vh] text-[2vw] text-white">
              Mi Perfil
            </h1>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full px-[15vw] mt-[2vh]">
          <div className="w-full bg-white shadow-md rounded-[0.5vh] p-[2vh]">
            <table className="w-full table-auto">
              <tbody>
                <tr>
                  <td className="border border-gray-400 px-[1vw] py-[1vh] text-[1vw] text-UNA-Red w-[20%]">
                    Nombre
                  </td>
                  <td className="border border-gray-400 px-[1vw] py-[1vh] bg-gray-100">
                    {profileData.nombre}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-[1vw] py-[1vh] text-[1vw] text-UNA-Red">
                    Apellidos
                  </td>
                  <td className="border border-gray-400 px-[1vw] py-[1vh] bg-gray-100">
                    {profileData.apellidos}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-[1vw] py-[1vh] text-[1vw] text-UNA-Red">
                    Identificación
                  </td>
                  <td className="border border-gray-400 px-[1vw] py-[1vh] bg-gray-100">
                    {profileData.identificacion}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-[1vw] py-[1vh] text-[1vw] text-UNA-Red">
                    Rol
                  </td>
                  <td className="border border-gray-400 px-[1vw] py-[1vh] bg-gray-100">
                    {profileData.rol}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {loading && <Loading />}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
