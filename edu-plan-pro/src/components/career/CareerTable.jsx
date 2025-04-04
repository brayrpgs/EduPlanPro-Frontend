import React, { useState, useEffect, useCallback } from "react";
import DeleteModal from "../componentsgeneric/DeleteModal";
import SearchInput from "../search/SearchInput";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";
import CareerAdd from "./CareerAdd";
import MainSearch from "../search/MainSearch";
import Pagination from "../pagination/Pagination";
import CareerUpdate from "./CareerUpdate";
import Loading from "../componentsgeneric/Loading";
import { FetchValidate } from "../../utilities/FetchValidate";
import { useNavigate } from "react-router-dom";

const CareerTable = () => {
  const [careers, setCareers] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);
  const [searchTerms, setSearchTerms] = useState({ career: "", school: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [mainFilter, setMainFilter] = useState("");
  const [careerFilter, setCareerFilter] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loadCareerData = useCallback(
    async (page) => {
      setCurrentPage(page);
      const url = `http://localhost:3001/searchcarreer?name=search-page&numPage=${page}&data=${searchTerms.career}&data2=${searchTerms.school}&data3=&data4=`;

      const options = {
        method: "GET",
        credentials: "include",
      };

      try {
        setLoading(true);
        const response = await FetchValidate(url, options, navigate);
        if (!response) return;

        setFilteredCareers(response.data.rows || []);
        setTotalItems(response.data.totalMatches || 0);
      } catch (error) {
        console.error("Error al cargar datos de carreras:", error);
      } finally {
        setLoading(false);
      }
    },
    [searchTerms, navigate]
  );

  useEffect(() => {
    loadCareerData(currentPage);
  }, [currentPage, loadCareerData]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleSearch = (value, type = "main") => {
    if (type === "main") {
      setMainFilter(value);
      setSearchTerms((prev) => ({ ...prev, career: value }));
    } else if (type === "career") {
      setCareerFilter(value);
      setSearchTerms((prev) => ({ ...prev, career: value }));
    } else if (type === "school") {
      setSchoolFilter(value);
      setSearchTerms((prev) => ({ ...prev, school: value }));
    }

    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerms({ career: "", school: "" });
    setMainFilter("");
    setCareerFilter("");
    setSchoolFilter("");
    setCurrentPage(1);
  };

  return (
    <main>
      <div className="mt-[3vh] justify-start flex pr-[15vw] pl-[15vw]">
        <div className="bg-UNA-Blue-Dark w-full flex rounded-[0.5vh] items-center">
          <h1 className="ml-[1vw] my-[0.5vh] text-[2vw] text-white">
            Administrar carreras
          </h1>
          <div className="flex ml-auto justify-end mr-[1vw]">
            <CareerAdd
              totalItems={totalItems}
              currentPage={currentPage}
              loadData={loadCareerData}
              textToAdd={"Agregar carrera"}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full pl-[15vw] pr-[15vw]">
        <div className="flex flex-row w-full items-center justify-end gap-[0.3vw]">
          <MainSearch
            placeholder="Ingrese el nombre de una carrera"
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
                  Carrera
                  <div title="Filtrar por carrera">
                    <SearchInput
                      onSearch={(value) => handleSearch(value, "career")}
                      filter={careerFilter}
                      setFilter={setCareerFilter}
                      className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                    />
                  </div>
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red">
                  Escuela
                  <div title="Filtrar por escuela">
                    <SearchInput
                      onSearch={(value) => handleSearch(value, "school")}
                      filter={schoolFilter}
                      setFilter={setSchoolFilter}
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
              {filteredCareers.length > 0 ? (
                filteredCareers.map((career) => (
                  <tr key={career.ID_CAREER}>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center break-words max-w-[15vw]">
                      {career["NOMBRE DE CARRERA"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center break-words max-w-[15vw]">
                      {career["NOMBRE DE LA ESCUELA"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-[0.9vw]">
                      <div className="flex justify-center items-center gap-[0.2vw]">
                        <CareerUpdate
                          career={career}
                          currentPage={currentPage}
                          loadData={loadCareerData}
                        />
                        <DeleteModal
                          deleteMethod={"DELETE"}
                          item={career}
                          itemName={"NOMBRE DE CARRERA"}
                          fields={[
                            { field: "NOMBRE DE CARRERA", value: "desc" },
                            { field: "ID_CAREER", value: "id" },
                          ]}
                          items={careers}
                          setItems={setCareers}
                          totalItems={totalItems}
                          currentPage={currentPage}
                          loadData={loadCareerData}
                          destination={"carreer"}
                          componentName={"carrera"}
                          componentPrefix={"la"}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-[1vw] py-[1vh] text-[0.9vw] text-center pt-[3.5vh]"
                  >
                    No se encontraron carreras registradas.
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

export default CareerTable;
