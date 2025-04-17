import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading";
import { useAtom } from "jotai";
import Header from "../header/Header.jsx";
import { preference } from "../validatelogin/ValidateLogin.jsx";
import Footer from "../footer/Footer.jsx";

const Preferences = () => {
  // Default values
  const defaultPreferences = {
    font: "Playfair Display SC",
    size_font: "Mediano",
    header_footer_color: "Rojo",
    icon_size: "Mediano",
    theme: "Claro",
  };
  const [prefs, setPrefs] = useAtom(preference);
  const [preference2, setPreference] = useState(defaultPreferences);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [hasExistingPreference, setHasExistingPreference] = useState(false);
  const navigate = useNavigate();

  const fontOptions = ["Times New Roman", "Playfair Display SC", "Cedarville Cursive"];
  const sizeFontOptions = ["Grande", "Mediano", "Pequeño"];
  const headerFooterColorOptions = ["Rojo", "Verde", "Amarillo", "Azul oscuro", "Azul claro"];
  const iconSizeOptions = ["Grande", "Mediano", "Pequeño"];
  const themeOptions = ["Oscuro", "Claro"];

  // Sync with atom value when it changes
  useEffect(() => {
    const fetchPreferences = async () => {
      setLoading(true);
      try {
        const response = await FetchValidate("http://localhost:3001/preferences", {
          method: "GET",
          credentials: "include",
        }, navigate);

        if (response?.data?.length > 0) {
          const userPrefs = response.data[0].PREFERENCIAS;
          setPreference(userPrefs);
          setPrefs(userPrefs);
          setHasExistingPreference(true);
        } else {
          setPreference(defaultPreferences);
          setHasExistingPreference(false);
        }
      } catch (error) {
        console.error("Error al cargar preferencias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [navigate, setPrefs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreference((prev) => ({ ...prev, [name]: value }));
  };

  const formatPreferences = () => ({
    PREFERENCES: {
      ...defaultPreferences,
      ...preference2,
    },
  });

  const savePreferences = async () => {
    const url = "http://localhost:3001/preferences";
    const method = hasExistingPreference ? "PATCH" : "POST";

    try {
      setLoading(true);
      const response = await FetchValidate(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formatPreferences()),
      }, navigate);

      if (!response) throw new Error("Error en la solicitud");

      setMessage(hasExistingPreference ? "Preferencias actualizadas correctamente" : "Preferencias creadas correctamente");
      setPrefs(preference2);
      setHasExistingPreference(true);
      window.location.reload();
    } catch (error) {
      console.error("Error al guardar preferencias:", error);
      setMessage("Error al guardar las preferencias");
    } finally {
      setLoading(false);
    }
  };

  const deletePreferences = async () => {
    try {
      setLoading(true);
      const response = await FetchValidate("http://localhost:3001/preferences", {
        method: "DELETE",
        credentials: "include",
      }, navigate);

      if (!response) throw new Error("Error al eliminar");

      setMessage("Preferencias eliminadas correctamente");
      setHasExistingPreference(false);
      setPreference(defaultPreferences);
      setPrefs(defaultPreferences);
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar preferencias:", error);
      setMessage("Error al eliminar las preferencias");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen h-screen">
      <Header />
      <main>
        <div className="mt-[3vh] justify-start flex pr-[15vw] pl-[15vw]">
          <div className="bg-UNA-Blue-Dark w-full max-w-screens flex rounded-[0.5vh] items-center">
            <h1 className="ml-[1vw] my-[0.5vh] text-[2vw] text-white">
              Preferencias
            </h1>
          </div>
        </div>
  
        <div className="flex flex-col justify-center items-center w-full pl-[15vw] pr-[15vw] mt-[2vh]">
          <div className="w-full bg-white shadow-md rounded-[0.5vh] p-[2vh]">
            {message && (
              <div className="mb-[2vh] p-[1vh] bg-blue-100 text-blue-800 rounded-[0.3vh]">
                {message}
              </div>
            )}
  
            <table className="w-full table-auto">
              <tbody>
                <tr>
                  <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-[1vw] text-UNA-Red w-[20%]">
                    Tipo de Fuente
                  </td>
                  <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh]">
                    <select
                      name="font"
                      value={preference2.font || defaultPreferences.font}
                      onChange={handleChange}
                      className="w-full p-[0.5vh] text-[0.9vw]"
                    >
                      {fontOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-[1vw] text-UNA-Red">
                    Tamaño de Fuente
                  </td>
                  <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh]">
                    <select
                      name="size_font"
                      value={preference2.size_font || defaultPreferences.size_font}
                      onChange={handleChange}
                      className="w-full p-[0.5vh] text-[0.9vw]"
                    >
                      {sizeFontOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-[1vw] text-UNA-Red">
                    Color de Encabezado/Pie
                  </td>
                  <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh]">
                    <select
                      name="header_footer_color"
                      value={
                        preference2.header_footer_color ||
                        defaultPreferences.header_footer_color
                      }
                      onChange={handleChange}
                      className="w-full p-[0.5vh] text-[0.9vw]"
                    >
                      {headerFooterColorOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-[1vw] text-UNA-Red">
                    Tamaño de Íconos
                  </td>
                  <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh]">
                    <select
                      name="icon_size"
                      value={preference2.icon_size || defaultPreferences.icon_size}
                      onChange={handleChange}
                      className="w-full p-[0.5vh] text-[0.9vw]"
                    >
                      {iconSizeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-[1vw] text-UNA-Red">
                    Tema
                  </td>
                  <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh]">
                    <select
                      name="theme"
                      value={preference2.theme || defaultPreferences.theme}
                      onChange={handleChange}
                      className="w-full p-[0.5vh] text-[0.9vw]"
                    >
                      {themeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
  
            <div className="flex justify-end mt-[2vh] gap-[1vw]">
              <button
                onClick={deletePreferences}
                className={`px-[1vw] py-[0.5vh] bg-red-600 text-white rounded-[0.3vh] hover:bg-red-700 text-[0.9vw] ${
                  !hasExistingPreference ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!hasExistingPreference}
              >
                Eliminar
              </button>
              <button
                onClick={savePreferences}
                className="px-[1vw] py-[0.5vh] bg-UNA-Blue-Dark text-white rounded-[0.3vh] hover:bg-blue-900 text-[0.9vw]"
              >
                {hasExistingPreference ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </div>
        </div>
        {loading && <Loading />}
      </main>
      <Footer />
    </div>
  );
  
};

export default Preferences;
