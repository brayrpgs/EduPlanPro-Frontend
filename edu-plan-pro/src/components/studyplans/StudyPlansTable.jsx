import React, { useState, useEffect, useCallback } from "react";
import DeleteModal from "../componentsgeneric/DeleteModal";
import SearchInput from "../search/SearchInput";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";
import MainSearch from "../search/MainSearch";
import Pagination from "../pagination/Pagination";
import Loading from "../componentsgeneric/Loading";
import { FetchValidate } from "../../utilities/FetchValidate";
import { useNavigate } from "react-router-dom";
import StudyPlansAdd from "./StudyPlansAdd";
import StudyPlansUpdate from "./StudyPlansUpdate";
import { ShowPDF } from "../componentsgeneric/ShowPDF";

const StudyPlansTable = () => {
  const [studyPlans, setStudyPlans] = useState([]);

  // To formate the dates of the data received
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toISOString().split("T")[0];
  };

  const [filteredStudyPlans, setFilteredStudyPlans] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    data: "",
    data2: "",
    data3: "",
    data4: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [mainFilter, setMainFilter] = useState("");
  const [dataFilter, setDataFilter] = useState("");
  const [data2Filter, setData2Filter] = useState("");
  const [data3Filter, setData3Filter] = useState("");
  const [data4Filter, setData4Filter] = useState("");
  const [carrers, setCarreers] = React.useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    fetch("http://localhost:3001/carreer", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === "200") {
          setCarreers(data.data);
        }
      })
      .catch((error) => console.error("Error al cargar las carreras:", error));
  }, []);

  const loadStudyPlansData = useCallback(
    async (page) => {
      setCurrentPage(page);
      const searchQuery = searchTerms
        ? `&data=${searchTerms["data"]}&data2=${searchTerms["data2"]}&data3=${searchTerms["data3"]}&data4=${searchTerms["data4"]}`
        : "&data=&data2=&data3=&data4=";

      const url = `http://localhost:3001/searchstudyplan?name=search-page${searchQuery}&numPage=${page}`;
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
        console.log(response)
        setFilteredStudyPlans(response.data.rows || []);
        setTotalItems(response.data.totalMatches || 0);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [searchTerms, navigate]
  );

  useEffect(() => {
    loadStudyPlansData(currentPage);
  }, [currentPage, loadStudyPlansData]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value, type = "main") => {
    if (type === "main") {
      if (dataFilter.trim() !== "") {
        setDataFilter("");
      }
      setSearchTerms((prevState) => ({
        ...prevState,
        data: value,
      }));
    } else if (type === "data") {
      if (mainFilter.trim() !== "") {
        setMainFilter("");
      }
      setSearchTerms((prevState) => ({
        ...prevState,
        data: value,
      }));
    } else if (["data2", "data3", "data4"].includes(type)) {
      setSearchTerms((prevState) => ({
        ...prevState,
        [`${type}`]: value,
      }));
    }

    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerms({ data: "", data2: "", data3: "", data4: "" });
    setCurrentPage(1);
    setMainFilter("");
    setDataFilter("");
    setData2Filter("");
    setData3Filter("");
    setData4Filter("");
  };

  return (
    <main>
      <div className="mt-[3vh] justify-start flex pr-[15vw] pl-[15vw]">
        <div className="bg-UNA-Blue-Dark w-full max-w-screens flex rounded-[0.5vh] items-center">
          <h1 className="ml-[1vw] my-[0.5vh] text-[2vw] text-white">
            Administrar planes de estudio
          </h1>
          <div className="flex ml-auto justify-end mr-[1vw]">
            <StudyPlansAdd
              totalItems={totalItems}
              currentPage={currentPage}
              loadData={loadStudyPlansData}
              textToAdd={"Agregar plan de estudio"}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full pl-[15vw] pr-[15vw]">
        <div className="flex flex-row w-full items-center justify-end gap-[0.3vw]">
          <MainSearch
            placeholder={"Ingrese el nombre de un plan de estudio"}
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
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red w-[12vw]">
                  Nombre
                  <div
                    className="w-full flex flex-col "
                    title="Filtrar por nombre."
                  >
                    <SearchInput
                      onSearch={(value) => handleSearch(value, "data")}
                      filter={dataFilter}
                      setFilter={setDataFilter}
                      className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                    />
                  </div>
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red w-[9vw]">
                  Fecha inicial
                  <div
                    className="w-full flex flex-col "
                    title="Filtrar por fecha inicial."
                  >
                    <SearchInput
                      onSearch={(value) => handleSearch(value, "data2")}
                      filter={data2Filter}
                      setFilter={setData2Filter}
                      className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                    />
                  </div>
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red w-[10vw]">
                  Fecha máxima
                  <div
                    className="w-full flex flex-col "
                    title="Filtrar por fecha máxima."
                  >
                    <SearchInput
                      onSearch={(value) => handleSearch(value, "data3")}
                      filter={data3Filter}
                      setFilter={setData3Filter}
                      className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                    />
                  </div>
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red w-[20vw]">
                  Carrera
                  <div
                    className="w-full flex flex-col "
                    title="Filtrar por carreras."
                  >
                    <SearchInput
                      onSearch={(value) => handleSearch(value, "data4")}
                      filter={data4Filter}
                      setFilter={setData4Filter}
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
              {filteredStudyPlans.length > 0 ? (
                filteredStudyPlans.map((studyPlan) => (
                  <tr key={studyPlan.ID_STUDY_PLAN}>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw]">
                      {studyPlan["NOMBRE DEL PLAN DE ESTUDIO"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw]">
                      <input
                        type="text"
                        value={formatDate(studyPlan["FECHA INICIAL"])}
                        readOnly
                        className="appearance-none focus:outline-none text-center text-[0.9vw] px-[1vw] py-[1.5vh] w-full h-[2vh] "
                      />
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw]">
                      <input
                        type="text"
                        value={formatDate(studyPlan["FECHA MAXIMA"])}
                        readOnly
                        className="appearance-none focus:outline-none text-center text-[0.9vw] px-[1vw] py-[1.5vh] w-full h-[2vh] "
                      />
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw]">
                      {studyPlan["CARRERA"]}
                    </td>
                    
                    <td className="border-[0.1vh]  border-gray-400 px-[1vw] py-[1vh] text-[0.9vw]">
                      <div className="flex items-center flex-row justify-center w-full h-full gap-[0.2vw]">
                        <StudyPlansUpdate
                          studyPlan={studyPlan}
                          loadData={loadStudyPlansData}
                          currentPage={currentPage}
                        />

                        <DeleteModal
                          deleteMethod={"PATCH"}
                          item={studyPlan}
                          itemName={"NOMBRE DEL PLAN DE ESTUDIO"}
                          fields={[
                            { field: "ID_STUDY_PLAN", value: "ID_STUDY_PLAN" },
                            {
                              field: "NOMBRE DEL PLAN DE ESTUDIO",
                              value: "DSC_NAME",
                            },
                            { field: "FECHA INICIAL", value: "DAT_INIT" },
                            { field: "FECHA MAXIMA", value: "DAT_MAX" },
                            {
                              field: "ID_CAREER",
                              value: "ID_CAREER",
                              defaultValue:
                                carrers.find(
                                  (career) =>
                                    career["NOMBRE DE LA CARRERA"] === studyPlan["CARRERA"]
                                )?.ID_CAREER || "",
                            },
                            { field: "PDF", value: "PDF_URL" },
                            { field: "STATE", value: ""},
                          ]}
                          items={studyPlans}
                          setItems={setStudyPlans}
                          totalItems={totalItems}
                          currentPage={currentPage}
                          loadData={loadStudyPlansData}
                          destination={"studyplan"}
                          componentName={"plan de estudio"}
                          componentPrefix={"el"}
                        />

                        <ShowPDF title={"PDF asociado al plan de estudio"} 
                          pdfUrl= {studyPlan["PDF"]}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-[1vw] py-[1vh] text-[0.9vw] text-center items-center pt-[3.5vh]"
                  >
                    No se encontraron planes de estudio registrados.
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

export default StudyPlansTable;
