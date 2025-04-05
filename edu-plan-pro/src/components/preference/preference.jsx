import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading";
import { useAtomValue } from 'jotai';
import { preference } from '../validatelogin/ValidateLogin.jsx'; 

const Preferences = () => {  // Changed from lowercase to uppercase
  // State Management
  const [preference, setPreference] = useState({
    font: 'Playfair Display SC',
    size_fonzt: 'Medium',
    headear_footer_color: 'Red',
    icon_size: 'Medium',
    theme: 'light',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [hasExistingPreference, setHasExistingPreference] = useState(false);
  const navigate = useNavigate();

  // Options for each preference
  const fontOptions = ["Times New Roman", "Playfair Display SC", "Cedarville Cursive"];
  const sizeFontOptions = ["Big", "Medium", "Small"];
  const headerFooterColorOptions = ["Red", "Green", "Yellow", "Dark Blue", "Blue"];
  const iconSizeOptions = ["Big", "Medium", "Small"];
  const themeOptions = ["dark", "light"];

  // Load existing preferences on component mount
  useEffect(() => {
    const loadPreferences = async () => {
      const url = "http://localhost:3001/preferences";
      const options = {
        method: "GET",
        credentials: "include",
      };

      try {
        setLoading(true);
        const response = await FetchValidate(url, options, navigate);

        if (!response) {
          console.error("Error fetching preferences");
          return;
        }

        if (response.data && response.data.length > 0) {
          setPreference(response.data[0]);
          setHasExistingPreference(true);
        }
      } catch (error) {
        console.error("Error loading preferences:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, [navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreference((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const savePreferences = async () => {
    const url = "http://localhost:3001/preferences";
    const method = hasExistingPreference ? "PATCH" : "POST";
    
    const options = {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preference),
    };

    try {
      setLoading(true);
      const response = await FetchValidate(url, options, navigate);

      if (!response) {
        console.error("Error saving preferences");
        setMessage("Error al guardar las preferencias");
        return;
      }

      setMessage("Preferencias guardadas correctamente");
      setHasExistingPreference(true);
    } catch (error) {
      console.error("Error saving preferences:", error);
      setMessage("Error al guardar las preferencias");
    } finally {
      setLoading(false);
    }
  };


  const deletePreferences = async () => {
    const url = "http://localhost:3001/preferences";
    const options = {
      method: "DELETE",
      credentials: "include",
    };

    try {
      setLoading(true);
      const response = await FetchValidate(url, options, navigate);

      if (!response) {
        console.error("Error deleting preferences");
        setMessage("Error al eliminar las preferencias");
        return;
      }

      setMessage("Preferencias eliminadas correctamente");
      setHasExistingPreference(false);
      setPreference({
        font: 'Playfair Display SC',
        size_font: 'Medium',
        headear_footer_color: 'Red',
        icon_size: 'Medium',
        theme: 'light',
      });
    } catch (error) {
      console.error("Error deleting preferences:", error);
      setMessage("Error al eliminar las preferencias");
    } finally {
      setLoading(false);
    }
  };

  return (
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
                    value={preference.font}
                    onChange={handleChange}
                    className="w-full p-[0.5vh] text-[0.9vw]"
                  >
                    {fontOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
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
                    value={preference.size_font}
                    onChange={handleChange}
                    className="w-full p-[0.5vh] text-[0.9vw]"
                  >
                    {sizeFontOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
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
                    name="headear_footer_color"
                    value={preference.headear_footer_color}
                    onChange={handleChange}
                    className="w-full p-[0.5vh] text-[0.9vw]"
                  >
                    {headerFooterColorOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
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
                    value={preference.icon_size}
                    onChange={handleChange}
                    className="w-full p-[0.5vh] text-[0.9vw]"
                  >
                    {iconSizeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
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
                    value={preference.theme}
                    onChange={handleChange}
                    className="w-full p-[0.5vh] text-[0.9vw]"
                  >
                    {themeOptions.map(option => (
                      <option key={option} value={option}>{option === 'dark' ? 'dark' : 'light'}</option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end mt-[2vh] gap-[1vw]">
            <button
              onClick={deletePreferences}
              className={`px-[1vw] py-[0.5vh] bg-red-600 text-white rounded-[0.3vh] hover:bg-red-700 text-[0.9vw] ${!hasExistingPreference ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!hasExistingPreference}
            >
              Eliminar
            </button>
            <button
              onClick={savePreferences}
              className="px-[1vw] py-[0.5vh] bg-UNA-Blue-Dark text-white rounded-[0.3vh] hover:bg-blue-900 text-[0.9vw]"
            >
              {hasExistingPreference ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </main>
  );
};

export default Preferences; 