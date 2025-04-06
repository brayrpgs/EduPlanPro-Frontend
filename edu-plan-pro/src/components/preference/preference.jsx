import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading";
import { useAtomValue } from 'jotai';
import { preference as preferenceAtom } from '../validatelogin/ValidateLogin.jsx'; 

const Preferences = () => {
  // Valores predeterminados específicos
  const defaultPreferences = {
    font: "Playfair Display SC",
    size_font: "Medium",
    header_footer_color: "Red",
    icon_size: "Medium",
    theme: "light"
  };

  // State Management
  const [preference, setPreference] = useState(defaultPreferences);
  const preferenceValue = useAtomValue(preferenceAtom);
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


  
  // Sync with atom value when it changes
  useEffect(() => {
    if (preferenceValue) {
      setPreference(preferenceValue);
    }
  }, [preferenceValue]);

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
          // Extract the preferences from the PREFERENCIAS object
          const userPreferences = response.data[0].PREFERENCIAS;
          setPreference(userPreferences);
          setHasExistingPreference(true);
        } else {
          // Si no hay preferencias existentes, establecer las predeterminadas
          setPreference(defaultPreferences);
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

  const formatPreferences = () => {
    return {
      "PREFERENCES": {
        "font": preference.font || defaultPreferences.font,
        "size_font": preference.size_font || defaultPreferences.size_font,
        "header_footer_color": preference.header_footer_color || defaultPreferences.header_footer_color,
        "icon_size": preference.icon_size || defaultPreferences.icon_size,
        "theme": preference.theme || defaultPreferences.theme
      }
    };
  };

  // Create new preferences with POST
  const createPreferences = async () => {
    // Forzar el uso de los valores predeterminados si es necesario
    if (!preference.font && !preference.size_font && !preference.header_footer_color && 
        !preference.icon_size && !preference.theme) {
      setPreference(defaultPreferences);
    }
    
    const formattedData = formatPreferences();
    console.log("Creating new preferences:", formattedData);
    const url = "http://localhost:3001/preferences";
    
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    };
  
    try {
      setLoading(true);
      console.log("POST request options:", options);
      const response = await FetchValidate(url, options, navigate);
      console.log("POST response:", response);
  
      if (!response) {
        console.error("Error creating preferences");
        setMessage("Error al crear las preferencias");
        return;
      }
  
      setMessage("Preferencias creadas correctamente");
      setHasExistingPreference(true);
    } catch (error) {
      console.error("Error creating preferences:", error);
      setMessage("Error al crear las preferencias");
    } finally {
      setLoading(false);
    }
  };

  // Update existing preferences with PATCH
  const updatePreferences = async () => {
    const formattedData = formatPreferences();
    console.log("Updating existing preferences:", formattedData);
    const url = "http://localhost:3001/preferences";
    
    const options = {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    };
  
    try {
      setLoading(true);
      console.log("PATCH request options:", options);
      const response = await FetchValidate(url, options, navigate);
      console.log("PATCH response:", response);
  
      if (!response) {
        console.error("Error updating preferences");
        setMessage("Error al actualizar las preferencias");
        return;
      }
  
      setMessage("Preferencias actualizadas correctamente");
    } catch (error) {
      console.error("Error updating preferences:", error);
      setMessage("Error al actualizar las preferencias");
    } finally {
      setLoading(false);
    }
  };

  // Decide whether to create or update preferences
  const savePreferences = () => {
    if (hasExistingPreference) {
      updatePreferences();
    } else {
      createPreferences();
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
      setPreference(defaultPreferences);
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
                    value={preference.font || defaultPreferences.font}
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
                    value={preference.size_font || defaultPreferences.size_font}
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
                    name="header_footer_color"
                    value={preference.header_footer_color || defaultPreferences.header_footer_color}
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
                    value={preference.icon_size || defaultPreferences.icon_size}
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
                    value={preference.theme || defaultPreferences.theme}
                    onChange={handleChange}
                    className="w-full p-[0.5vh] text-[0.9vw]"
                  >
                    {themeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
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