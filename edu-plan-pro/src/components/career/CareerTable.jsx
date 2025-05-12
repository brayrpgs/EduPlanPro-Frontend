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
import { useAtom } from "jotai";
import { userAtom } from "../validatelogin/ValidateLogin";

const CareerTable = () => {
  const [careers, setCareers] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);
  const [searchTerms, setSearchTerms] = useState({ data: "", data2: "", data3: "", data4: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [mainFilter, setMainFilter] = useState("");
  const [careerFilter, setCareerFilter] = useState("");
  const [data2Filter, setData2Filter] = useState("");
  const [data3Filter, setData3Filter] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const hasPermission = user?.ROLE_NAME?.toLowerCase() === "admin" || user?.ROLE_NAME?.toLowerCase() === "root";

  const loadCareerData = useCallback(
    async (page) => {
      setCurrentPage(page);
      const searchQuery = `&data=${searchTerms.data}&data2=${searchTerms.data2}&data3=${searchTerms.data3}&data4=${searchTerms.data4}`;
      const url = `http://localhost:3001/searchcarreer?name=search-page&numPage=${page}${searchQuery}`;

      try {
        setLoading(true);
        const response = await FetchValidate(url, { method: "GET", credentials: "include" }, navigate);
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
      if (careerFilter.trim() !== "") setCareerFilter("");
      setSearchTerms((prev) => ({ ...prev, data: value }));
    } else if (type === "data") {
      if (mainFilter.trim() !== "") setMainFilter("");
      setSearchTerms((prev) => ({ ...prev, data: value }));
    } else if (["data2", "data3"].includes(type)) {
      setSearchTerms((prev) => ({ ...prev, [type]: value }));
    }
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerms({ data: "", data2: "", data3: "", data4: "" });
    setMainFilter("");
    setCareerFilter("");
    setData2Filter("");
    setData3Filter("");
    setCurrentPage(1);
  };

  return (
    <main>
      <div className="mt-[3vh] justify-start flex pr-[15vw] pl-[15vw]">
        <div className="bg-UNA-Blue-Dark w-full flex rounded-[0.5vh] items-center">
          <h1 className="ml-[1vw] my-[0.5vh] text-[2vw] text-white">
            Administrar carreras
          </h1>
          {hasPermission && (
            <div className="flex ml-auto justify-end mr-[1vw]">
              <CareerAdd
                totalItems={totalItems}
                currentPage={currentPage}
                loadData={loadCareerData}
                textToAdd={"Agregar carrera"}
              />
            </div>
          )}
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
                  <SearchInput
                    onSearch={(value) => handleSearch(value, "data")}
                    filter={careerFilter}
                    setFilter={setCareerFilter}
                    className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                  />
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red">
                  Código
                  <SearchInput
                    onSearch={(value) => handleSearch(value, "data2")}
                    filter={data2Filter}
                    setFilter={setData2Filter}
                    className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                  />
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red">
                  Escuela
                  <SearchInput
                    onSearch={(value) => handleSearch(value, "data3")}
                    filter={data3Filter}
                    setFilter={setData3Filter}
                    className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                  />
                </th>
                {hasPermission && (
                  <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] w-[10vw] text-[1vw] text-UNA-Red">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredCareers.length > 0 ? (
                filteredCareers.map((career) => (
                  <tr key={career.ID_CAREER}>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center break-words max-w-[15vw]">
                      {career["NOMBRE DE CARRERA"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center break-words max-w-[10vw]">
                      {career["CODIGO DE CARRERA"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center break-words max-w-[15vw]">
                      {career["NOMBRE DE LA ESCUELA"]}
                    </td>
                    {hasPermission && (
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
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={hasPermission ? 4 : 3}
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
