import React, { useState, useEffect, useCallback } from "react";
import DeleteModal from "../componentsgeneric/DeleteModal";
import Pagination from "../pagination/Pagination";
import Loading from "../componentsgeneric/Loading";
import { FetchValidate } from "../../utilities/FetchValidate";
import { useNavigate } from "react-router-dom";
import { ShowPDF } from "../componentsgeneric/ShowPDF";
import CoursesProgramAdd from "./CoursesProgramAdd";
import MainSearch from "../search/MainSearch";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";
import SearchInput from "../search/SearchInput";
import CoursesProgramUpdate from "./CoursesProgramUpdate";

const CoursesProgramTable = () => {
  const [coursesProgram, setCoursesProgram] = useState([]);
  const [studyPlans, setStudyPlans] = useState([]);

  // To formate the dates of the data received
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toISOString().split("T")[0];
  };

  const cicles = {
    1: "Primer ciclo",
    2: "Segundo ciclo",
    V: "Verano",
  };

  const [filteredCoursesProgram, setFilteredCoursesProgram] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    data: "",
    data2: "",
    data3: "",
    data4: "",
    data5: "",
    data6: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [mainFilter, setMainFilter] = useState("");
  const [dataFilter, setDataFilter] = useState("");
  const [data2Filter, setData2Filter] = useState("");
  const [data3Filter, setData3Filter] = useState("");
  const [data4Filter, setData4Filter] = useState("");
  const [data5Filter, setData5Filter] = useState("");
  const [data6Filter, setData6Filter] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loadCoursesProgramData = useCallback(
    async (page) => {
      setCurrentPage(page);
      const searchQuery = searchTerms
        ? `&data=${searchTerms["data"]}&data2=${searchTerms["data2"]}&data3=${searchTerms["data3"]}&data4=${searchTerms["data4"]}&data5=${searchTerms["data5"]}&data6=${searchTerms["data6"]}`
        : "&data=&data2=&data3=&data4=&data5=&data6=";

      const url = `http://localhost:3001/searchcourseprogram?name=search-page${searchQuery}&numPage=${page}`;
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
        setFilteredCoursesProgram(response.data.rows || []);
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
    loadCoursesProgramData(currentPage);
  }, [loadCoursesProgramData, currentPage]);

  React.useEffect(() => {
    fetch("http://localhost:3001/studyplan", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === "200") {
          setStudyPlans(data.data);
        }
      })
      .catch((error) =>
        console.error("Error al cargar los planes de estudio:", error)
      );
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function checkOptions(fullString, partialString) {
    if (!fullString || !partialString) {
      return false;
    } else {
      fullString = normalizeString(fullString.toLocaleLowerCase().trim());
      partialString = normalizeString(partialString.toLocaleLowerCase().trim());

      if (!fullString.startsWith(partialString)) {
        return false;
      }

      let index = 0;

      for (let i = 0; i < partialString.length; i++) {
        index = fullString.indexOf(partialString[i], index);

        if (index === -1) {
          return false;
        }

        index++;
      }

      return true;
    }
  }

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
    } else if (["data2", "data3", "data5"].includes(type)) {
      setSearchTerms((prevState) => ({
        ...prevState,
        [`${type}`]: value,
      }));
    } else if (type === "data4") {
      const options = [
        { check: "Primer ciclo", value: 1 },
        { check: "Segundo ciclo", value: 2 },
        { check: "Verano", value: "V" }
      ];
    
      const matchedOption = options.find(option => checkOptions(option.check, value));
    
      const newData4 = matchedOption ? matchedOption.value : value;
    
      setSearchTerms((prevState) => ({
        ...prevState,
        ["data4"]: newData4,
      }));
    } else if (type === "data6") {
      const options = [
        { check: "Si", value: 1 },
        { check: "No", value: 0 },
      ];
    
      const matchedOption = options.find(option => checkOptions(option.check, value));
    
      const newData6 = matchedOption ? matchedOption.value : value;
    
      setSearchTerms((prevState) => ({
        ...prevState,
        ["data6"]: newData6,
      }));
    }

    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerms({
      data: "",
      data2: "",
      data3: "",
      data4: "",
      data5: "",
      data6: "",
    });
    setCurrentPage(1);
    setMainFilter("");
    setDataFilter("");
    setData2Filter("");
    setData3Filter("");
    setData4Filter("");
    setData5Filter("");
    setData6Filter("");
  };

  return (
    <main>
      <div className="mt-[3vh] justify-start flex pr-[15vw] pl-[15vw]">
        <div className="bg-UNA-Blue-Dark w-full max-w-screens flex rounded-[0.5vh] items-center">
          <h1 className="ml-[1vw] my-[0.5vh] text-[2vw] text-white">
            Administrar programas de curso
          </h1>
          <div className="flex ml-auto justify-end mr-[1vw]">
            <CoursesProgramAdd
              totalItems={totalItems}
              currentPage={currentPage}
              loadData={loadCoursesProgramData}
              textToAdd={"Agregar programa de curso"}
              studyPlans={studyPlans}
              formatDate={formatDate}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full pl-[15vw] pr-[15vw]">
        <div className="flex flex-row w-full items-center justify-end gap-[0.3vw]">
          <MainSearch
            placeholder={"Ingrese el nombre de un programa de curso"}
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
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red w-[7vw]">
                  Fecha
                  <SearchInput
                    onSearch={(value) => handleSearch(value, "data2")}
                    filter={data2Filter}
                    setFilter={setData2Filter}
                    className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                  />
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red w-[7vw]">
                  NRC
                  <SearchInput
                    onSearch={(value) => handleSearch(value, "data3")}
                    filter={data3Filter}
                    setFilter={setData3Filter}
                    className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                  />
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red w-[7vw]">
                  Ciclo
                  <SearchInput
                    onSearch={(value) => handleSearch(value, "data4")}
                    filter={data4Filter}
                    setFilter={setData4Filter}
                    className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                  />
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red w-[7vw]">
                  Créditos
                  <SearchInput
                    onSearch={(value) => handleSearch(value, "data5")}
                    filter={data5Filter}
                    setFilter={setData5Filter}
                    className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                  />
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red w-[7vw]">
                  Firma
                  <SearchInput
                    onSearch={(value) => handleSearch(value, "data6")}
                    filter={data6Filter}
                    setFilter={setData6Filter}
                    className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                  />
                </th>

                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] w-[10vw] text-[1vw] text-UNA-Red">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCoursesProgram.length > 0 ? (
                filteredCoursesProgram.map((courseProgram) => (
                  <tr key={courseProgram.ID_COURSE_PROGRAM}>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw]">
                      {courseProgram["NOMBRE DEL PROGRAMA"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400  text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[10vw]">
                      <input
                        type="text"
                        value={formatDate(courseProgram["FECHA"])}
                        readOnly
                        className="appearance-none focus:outline-none text-center text-[0.9vw] px-[1vw] py-[1.5vh] w-full h-[2vh] "
                      />
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw]">
                      {courseProgram["NRC"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw]">
                      {cicles[courseProgram["CICLO"]]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw]">
                      {courseProgram["CREDITOS"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw]">
                      {courseProgram["FIRMA"] === "1" ? "Si" : "No"}
                    </td>

                    <td className="border-[0.1vh]  border-gray-400 px-[1vw] py-[1vh] text-[0.9vw]">
                      <div className="flex items-center flex-row justify-center w-full h-full gap-[0.2vw]">
                      <CoursesProgramUpdate
                          courseProgram={courseProgram}
                          studyPlans={studyPlans}
                          formatDate={formatDate}
                          loadData={loadCoursesProgramData}
                          currentPage={currentPage}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-[1vw] py-[1vh] text-[0.9vw] text-center items-center pt-[3.5vh]"
                  >
                    No se encontraron programas de curso registrados.
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

export default CoursesProgramTable;
