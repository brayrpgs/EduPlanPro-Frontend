import React, { useState, useEffect, useCallback } from "react";
import DeleteModal from "../componentsgeneric/DeleteModal";
import SearchInput from "../search/SearchInput";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";
import MainSearch from "../search/MainSearch";
import Pagination from "../pagination/Pagination";
import Loading from "../componentsgeneric/Loading";
import { FetchValidate } from "../../utilities/FetchValidate";
import { useNavigate } from "react-router-dom";
import TeacherUpdate from "./TeacherUpdate";
import TeacherAdd from "./TeacherAdd";
import { useAtom } from "jotai";
import { userAtom } from "../validatelogin/ValidateLogin.jsx";

const TeacherTable = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeacher, setFilteredTeacher] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    nameTeach: "",
    secName: "",
    idCard: "",
    email: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [mainFilter, setMainFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [secNameFilter, setSecNameFilter] = useState("");
  const [idCardFilter, setIdCardFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const hasPermission = user?.ROLE_NAME?.toLowerCase() === "admin" || user?.ROLE_NAME?.toLowerCase() === "root";

  const loadTeacherData = useCallback(
    async (page) => {
      setCurrentPage(page);
      const searchQuery = `&nameTeach=${searchTerms.nameTeach}&secName=${searchTerms.secName}&idCard=${searchTerms.idCard}&email=${searchTerms.email}`;

      const url = `http://localhost:3001/searchteacher?name=search-page&numPage=${page}${searchQuery}`;
      const options = {
        method: "GET",
        credentials: "include",
      };

      try {
        setLoading(true);
        const response = await FetchValidate(url, options, navigate);
        if (!response) return;
        setFilteredTeacher(response.data.rows || []);
        setTotalItems(response.data.totalMatches || 0);
      } catch (error) {
        console.error("Error al cargar profesores:", error);
      } finally {
        setLoading(false);
      }
    },
    [searchTerms, navigate]
  );

  useEffect(() => {
    loadTeacherData(currentPage);
  }, [currentPage, loadTeacherData]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleSearch = (value, type = "main") => {
    if (type === "main") {
      if (nameFilter.trim() !== "") setNameFilter("");
      setSearchTerms((prev) => ({ ...prev, nameTeach: value }));
    } else if (type === "nameTeach") {
      if (mainFilter.trim() !== "") setMainFilter("");
      setSearchTerms((prev) => ({ ...prev, nameTeach: value }));
    } else if (["secName", "idCard", "email"].includes(type)) {
      setSearchTerms((prev) => ({ ...prev, [type]: value }));
    }

    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerms({ nameTeach: "", secName: "", idCard: "", email: "" });
    setMainFilter("");
    setNameFilter("");
    setSecNameFilter("");
    setIdCardFilter("");
    setEmailFilter("");
    setCurrentPage(1);
  };

  return (
    <main>
      <div className="mt-[3vh] justify-start flex pr-[15vw] pl-[15vw]">
        <div className="bg-UNA-Blue-Dark w-full max-w-screens flex rounded-[0.5vh] items-center">
          <h1 className="ml-[1vw] my-[0.5vh] text-[2vw] text-white">Administrar profesores</h1>
          {hasPermission && (
            <div className="flex ml-auto justify-end mr-[1vw]">
              <TeacherAdd
                totalItems={totalItems}
                currentPage={currentPage}
                loadData={loadTeacherData}
                textToAdd="Agregar profesor"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full pl-[15vw] pr-[15vw]">
        <div className="flex flex-row w-full items-center justify-end gap-[0.3vw]">
          <MainSearch
            placeholder="Ingrese el nombre de un profesor"
            onSearch={(value) => handleSearch(value, "main")}
            mainFilter={mainFilter}
            setMainFilter={setMainFilter}
          />
          <div
            title="Limpiar filtros."
            className="flex h-[3.8vh] items-center cursor-pointer hover:scale-110"
            onClick={handleClearFilters}
          >
            <FilterOffIcon />
          </div>
        </div>

        <div className="flex justify-center items-center mt-0 w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red">
                  Nombre
                  <div title="Filtrar por nombre">
                    <SearchInput
                      onSearch={(value) => handleSearch(value, "nameTeach")}
                      filter={nameFilter}
                      setFilter={setNameFilter}
                      className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                    />
                  </div>
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red">
                  Apellidos
                  <div title="Filtrar por apellidos">
                    <SearchInput
                      onSearch={(value) => handleSearch(value, "secName")}
                      filter={secNameFilter}
                      setFilter={setSecNameFilter}
                      className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                    />
                  </div>
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red">
                  Cédula
                  <div title="Filtrar por cédula">
                    <SearchInput
                      onSearch={(value) => handleSearch(value, "idCard")}
                      filter={idCardFilter}
                      setFilter={setIdCardFilter}
                      className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                    />
                  </div>
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red">
                  Correo electrónico
                  <div title="Filtrar por correo">
                    <SearchInput
                      onSearch={(value) => handleSearch(value, "email")}
                      filter={emailFilter}
                      setFilter={setEmailFilter}
                      className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                    />
                  </div>
                </th>
                {hasPermission && (
                  <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] w-[10vw] text-[1vw] text-UNA-Red">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredTeacher.length > 0 ? (
                filteredTeacher.map((teacher) => (
                  <tr key={teacher.ID_TEACHER}>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center break-words max-w-[15vw]">
                      {teacher["NOMBRE"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center break-words max-w-[15vw]">
                      {teacher["APELLIDOS"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center break-words max-w-[15vw]">
                      {teacher["IDENTIFICACION"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center break-words max-w-[15vw]">
                      {teacher["CORREO"]}
                    </td>
                    {hasPermission && (
                      <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-[0.9vw]">
                        <div className="flex items-center flex-row justify-center w-full h-full gap-[0.2vw]">
                          <TeacherUpdate
                            teacher={teacher}
                            loadData={loadTeacherData}
                            currentPage={currentPage}
                          />
                          <DeleteModal
                            deleteMethod={"PATCH"}
                            item={teacher}
                            itemName={"NOMBRE"}
                            fields={[
                              { field: "ID_TEACHER", value: "id" },
                              { field: "NOMBRE", value: "name" },
                              { field: "APELLIDOS", value: "secName" },
                              { field: "IDENTIFICACION", value: "idcard" },
                              { field: "CORREO", value: "email" },
                            ]}
                            items={teachers}
                            setItems={setTeachers}
                            totalItems={totalItems}
                            currentPage={currentPage}
                            loadData={loadTeacherData}
                            destination={"teacher"}
                            componentName={"profesor"}
                            componentPrefix={"el"}
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={hasPermission ? 5 : 4}
                    className="px-[1vw] py-[1vh] text-[0.9vw] text-center pt-[3.5vh]"
                  >
                    No se encontraron profesores registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="w-full h-[8vh] flex justify-center items-center">
          <Pagination
            totalItems={totalItems}
            itemsPerPage="8"
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      {loading && <Loading />}
    </main>
  );
};

export default TeacherTable;
