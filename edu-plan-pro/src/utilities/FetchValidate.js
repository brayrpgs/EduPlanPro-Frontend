export const FetchValidate = async (url, options, navigate) => {

  // Validar que el servidor este respondiendo, en caso que no redirigir a una pagina de error
  try {
    const session = "http://localhost:3001/session";
    const checkBackend = await fetch(session, {
      method: "GET",
      credentials: "include",
    });
    if (!checkBackend.ok) {
      throw new Error("El servidor no está disponible");
    }
  } catch (error) {
    navigate("/serverError");
    return null;
  }

  // Si el servidor esta respondiendo, realizar el fetch

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }

    return await response.json();

  } catch (error) {

    console.error("Error en la solicitud fetch:", error);
    throw error;
  }
};
