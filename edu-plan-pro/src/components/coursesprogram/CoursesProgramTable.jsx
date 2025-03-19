import React, { useState, useEffect, useCallback } from "react";
import DeleteModal from "../componentsgeneric/DeleteModal";
import Pagination from "../pagination/Pagination";
import Loading from "../componentsgeneric/Loading";
import { FetchValidate } from "../../utilities/FetchValidate";
import { useNavigate } from "react-router-dom";
import { ShowPDF } from "../componentsgeneric/ShowPDF";
import CoursesProgramAdd from "./CoursesProgramAdd";

const CoursesProgramTable = () => {
  const [coursesProgram, setCoursesProgram] = useState([]);
  const [studyPlans, setStudyPlans] = useState([]);
  // To formate the dates of the data received
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.getFullYear();
  };

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loadCoursesProgramData = useCallback(async () => {
    const url = "http://localhost:3001/courseprogram";
    const options = {
      method: "GET",
      credentials: "include",
    };

    try {
      setLoading(true);
      const response = await FetchValidate(url, options, navigate);
      console.log(response);
      if (!response) {
        console.error("Error en la solicitud");
        return;
      }

      setCoursesProgram(response.data || []);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadCoursesProgramData();
    
  }, [loadCoursesProgramData]);

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
          console.log(data.data)
        }
      })
      .catch((error) =>
        console.error("Error al cargar los planes de estudio:", error)
      );
  }, []);

  /*
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
        console.log(response);
        if (!response) {
          console.error("Error en la solicitud");
          return;
        }

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
  */

  return (
    <main>
      <div className="mt-[3vh] justify-start flex pr-[15vw] pl-[15vw]">
        <div className="bg-UNA-Blue-Dark w-full max-w-screens flex rounded-[0.5vh] items-center">
          <h1 className="ml-[1vw] my-[0.5vh] text-[2vw] text-white">
            Administrar programas de curso
          </h1>
          <div className="flex ml-auto justify-end mr-[1vw]">
          <CoursesProgramAdd
              loadData={loadCoursesProgramData}
              textToAdd={"Agregar plan de estudio"}
              studyPlans={studyPlans}
              formatDate={formatDate}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full pl-[15vw] pr-[15vw]">
        <div className="flex flex-row w-full items-center justify-end gap-[0.3vw]">
          <div className="flex h-[3.8vh] items-center cursor-pointer hover:scale-110"></div>
        </div>
        <div className="flex justify-center items-center mt-0 w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red w-[12vw]">
                  Nombre
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red w-[22vw]">
                  Plan de estudio
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red w-[7vw]">
                  Año
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red w-[7vw]">
                  NRC
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red w-[7vw]">
                  Ciclo
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red w-[7vw]">
                  Créditos
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red w-[7vw]">
                  Firma
                </th>

                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] w-[10vw] text-[1vw] text-UNA-Red">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {coursesProgram.length > 0 ? (
                coursesProgram.map((courseProgram) => (
                  <tr key={courseProgram.ID_COURSE_PROGRAM}>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw]">
                      {courseProgram["NOMBRE DEL PROGRAMA"]}
                    </td>

                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[20vw]">
                      {studyPlans.find(value => value.ID_STUDY_PLAN === courseProgram["ID_STUDY_PLAN"])?.DSC_NAME || ""}
                    </td>
                    <td className="border-[0.1vh] border-gray-400  text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[10vw]">
                      <input
                        type="text"
                        value={formatDate(courseProgram["AÑO"])}
                        readOnly
                        className="appearance-none focus:outline-none text-center text-[0.9vw] px-[1vw] py-[1.5vh] w-full h-[2vh] "
                      />
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw]">
                      {courseProgram["NRC"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw]">
                      {courseProgram["CICLO"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw]">
                      {courseProgram["NUMERO DE CREDITOS"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw]">
                      {courseProgram["FIRMA DIGITAL"] === "1" ? "Si": "No"}
                    </td>

                    <td className="border-[0.1vh]  border-gray-400 px-[1vw] py-[1vh] text-[0.9vw]">
                      <div className="flex items-center flex-row justify-center w-full h-full gap-[0.2vw]"></div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-[1vw] py-[1vh] text-[0.9vw] text-center items-center pt-[3.5vh]"
                  >
                    No se encontraron planes de estudio registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {loading && <Loading />}
    </main>
  );
};

export default CoursesProgramTable;
