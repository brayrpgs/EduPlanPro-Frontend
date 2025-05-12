import React, { useState, useEffect, useCallback } from "react";
import DeleteModal from "../componentsgeneric/DeleteModal";
import SearchInput from "../search/SearchInput";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";
import MainSearch from "../search/MainSearch";
import Pagination from "../pagination/Pagination";
import Loading from "../componentsgeneric/Loading";
import { FetchValidate } from "../../utilities/FetchValidate";
import { useNavigate } from "react-router-dom";
import SchoolUpdate from "./SchoolUpdate";
import SchoolAdd from "./SchoolAdd";
import { useAtom } from "jotai";
import { userAtom } from "../validatelogin/ValidateLogin.jsx";

const SchoolTable = () => {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [searchTerms, setSearchTerms] = useState({ desc: "", faculty: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [mainFilter, setMainFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const hasPermission = user?.ROLE_NAME === "root" || user?.ROLE_NAME === "admin";

  const loadSchoolData = useCallback(async (page) => {
    setCurrentPage(page);
    const searchQuery = searchTerms
      ? `&search=${searchTerms["desc"]}&search2=${searchTerms["faculty"]}`
      : "&search=&search2=";

    const url = `http://localhost:3001/searchschool?name=search-page&numPage=${page}${searchQuery}`;
    const options = {
      method: "GET",
      credentials: "include",
    };

    try {
      setLoading(true);
      const response = await FetchValidate(url, options, navigate);
      if (!response) {
        console.error("Error in request");
        return;
      }
      setFilteredSchools(response.data.rows || []);
      setTotalItems(response.data.totalMatches || 0);
    } catch (error) {
      console.error("Error loading school data:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerms, navigate]);

  useEffect(() => {
    loadSchoolData(currentPage);
  }, [currentPage, loadSchoolData]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value, type = "main") => {
    if (type === "main") {
      if (nameFilter.trim() !== "") {
        setNameFilter("");
      }
      setSearchTerms((prevState) => ({ ...prevState, desc: value }));
    } else if (type === "desc") {
      if (mainFilter.trim() !== "") {
        setMainFilter("");
      }
      setSearchTerms((prevState) => ({ ...prevState, desc: value }));
    } else if (["faculty"].includes(type)) {
      setSearchTerms((prevState) => ({ ...prevState, [type]: value }));
    }
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerms({ desc: "", faculty: "" });
    setCurrentPage(1);
    setMainFilter("");
    setNameFilter("");
    setFacultyFilter("");
  };

  return (
    <main>
      <div className="mt-[3vh] justify-start flex pr-[15vw] pl-[15vw]">
        <div className="bg-UNA-Blue-Dark w-full max-w-screens flex rounded-[0.5vh] items-center">
          <h1 className="ml-[1vw] my-[0.5vh] text-[2vw] text-white">
            Administrar escuelas
          </h1>
          <div className="flex ml-auto justify-end mr-[1vw]">
            {hasPermission && (
              <SchoolAdd
                totalItems={totalItems}
                currentPage={currentPage}
                loadData={loadSchoolData}
                textToAdd="Agregar escuela"
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full pl-[15vw] pr-[15vw]">
        <div className="flex flex-row w-full items-center justify-end gap-[0.3vw]">
          <MainSearch
            placeholder="Ingrese el nombre de una escuela"
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
                  <div className="w-full flex flex-col" title="Filtrar por nombre">
                    <SearchInput
                      onSearch={(value) => handleSearch(value, "desc")}
                      filter={nameFilter}
                      setFilter={setNameFilter}
                      className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                    />
                  </div>
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red">
                  Facultad
                  <div className="w-full flex flex-col" title="Filtrar por Facultad">
                    <SearchInput
                      onSearch={(value) => handleSearch(value, "faculty")}
                      filter={facultyFilter}
                      setFilter={setFacultyFilter}
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
              {filteredSchools.length > 0 ? (
                filteredSchools.map((school) => (
                  <tr key={school.ID_SCHOOL}>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw]">
                      {school["NOMBRE ESCUELA"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw]">
                      {school["NOMBRE FACULTAD"]}
                    </td>
                    {hasPermission && (
                      <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-[0.9vw]">
                        <div className="flex items-center flex-row justify-center w-full h-full gap-[0.2vw]">
                          <SchoolUpdate
                            school={school}
                            loadData={loadSchoolData}
                            currentPage={currentPage}
                          />
                          <DeleteModal
                            deleteMethod={"PATCH"}
                            item={school}
                            itemName="NOMBRE ESCUELA"
                            fields={[
                              { field: "ID_SCHOOL", value: "id" },
                              { field: "NOMBRE ESCUELA", value: "desc" },
                            ]}
                            items={schools}
                            setItems={setSchools}
                            totalItems={totalItems}
                            currentPage={currentPage}
                            loadData={loadSchoolData}
                            destination="school"
                            componentName="escuela"
                            componentPrefix="la"
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-[1vw] py-[1vh] text-[0.9vw] text-center items-center pt-[3.5vh]"
                  >
                    No se encontraron escuelas registradas.
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

export default SchoolTable;
