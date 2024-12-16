import React, { useState, useEffect, useCallback } from "react";
import DeleteModal from "../componentsgeneric/DeleteModal";
import SearchInput from "../search/SearchInput";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";
import FacultyAdd from "./FacultyAdd";
import MainSearch from "../search/MainSearch";
import Pagination from "../pagination/Pagination";
import FacultyUpdate from "./FacultyUpdate";
import Loading from "../componentsgeneric/Loading";
import { FetchValidate } from "../../utilities/FetchValidate";
import { useNavigate } from "react-router-dom";

const FacultyTable = () => {
  const [faculties, setFaculties] = useState([]);
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [mainFilter, setMainFilter] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loadFacultyData = useCallback(
    async (page) => {
      setCurrentPage(page);
      const searchQuery = searchTerm ? `&search=${searchTerm}` : "&search=";

      const url = `http://localhost:3001/searchfaculty?name=search-page&numPage=${page}${searchQuery}`;

      const options = {
        method: "GET",
        credentials: "include",
      };

      try {
        setLoading(true);
        const response = await FetchValidate(url, options, navigate);

        if (!response) {
          console.error("Error en la solicitud");
          return;
        }

        setFilteredFaculty(response.data.rows || []);
        setTotalItems(response.data.totalMatches || 0);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, navigate]
  );

  useEffect(() => {
    loadFacultyData(currentPage);
  }, [currentPage, loadFacultyData]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value, type = "main") => {
    if (type === "main") {
      if (filter.trim() !== "") {
        setFilter("");
      }
    } else if (type === "filter") {
      if (mainFilter.trim() !== "") {
        setMainFilter("");
      }
    }

    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setCurrentPage(1);
    setMainFilter("");
    setFilter("");
  };

  return (
    <main>
      <div className="mt-[3vh] justify-start flex pr-[15vw] pl-[15vw]">
        <div className="bg-UNA-Blue-Dark w-full max-w-screens flex rounded-[0.5vh] items-center">
          <h1 className="ml-[1vw] my-[0.5vh] text-[2vw] text-white">
            Administrar facultades
          </h1>
          <div className="flex ml-auto justify-end mr-[1vw]">
            <FacultyAdd
              totalItems={totalItems}
              currentPage={currentPage}
              loadData={loadFacultyData}
              textToAdd={"Agregar facultad"}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full pl-[15vw] pr-[15vw]">
        <div className="flex flex-row w-full items-center justify-end gap-[0.3vw]">
          <MainSearch
            placeholder={"Ingrese el nombre de una facultad"}
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
                  Facultad
                  <div
                    className="w-full flex flex-col "
                    title="Filtrar por facultad."
                  >
                    <SearchInput
                      onSearch={(value) => handleSearch(value, "filter")}
                      filter={filter}
                      setFilter={setFilter}
                      className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                    />
                  </div>
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] w-[10vw] text-[1vw] text-UNA-Red">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculty.length > 0 ? (
                filteredFaculty.map((faculty) => (
                  <tr key={faculty.ID_FACULTY}>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw]">
                      {faculty["NOMBRE FACULTAD"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-[0.9vw]">
                      <div className="flex items-center flex-row justify-center w-full h-full gap-[0.2vw]">
                        <FacultyUpdate
                          faculty={faculty}
                          currentPage={currentPage}
                          loadData={loadFacultyData}
                        />

                        <DeleteModal
                          item={faculty}
                          itemName={"NOMBRE FACULTAD"}
                          fields={[
                            { field: "NOMBRE FACULTAD", value: "desc" },
                            { field: "ID_FACULTY", value: "id" },
                          ]}
                          items={faculties}
                          setItems={setFaculties}
                          totalItems={totalItems}
                          currentPage={currentPage}
                          loadData={loadFacultyData}
                          destination={"faculty"}
                          componentName={"facultad"}
                          componentPrefix={"la"}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={2}
                    className="px-[1vw] py-[1vh] text-[0.9vw] text-center items-center pt-[3.5vh]"
                  >
                    No se encontraron facultades registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="w-full h-[8vh] flex justify-center items-center">
          <Pagination
            totalItems={totalItems}
            itemsPerPage={"8"}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      {loading && <Loading />}
    </main>
  );
};

export default FacultyTable;
