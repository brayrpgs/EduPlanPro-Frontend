import React, { useState, useEffect } from "react";
import DeleteModal from "../modaldelete/DeleteModal";
import DeleteModal2 from "../modaldelete/DeleteModal";
import SearchInput from "../search/SearchInput";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";
import AddIcon from "../icons/ActionIcons/AddIcon";
import FacultyModalAdd from "./FacultyModalAdd";
import UpdateFaculty from "./UpdateFaculty";
import MainSearch from "../search/MainSearch";
import Pagination from "../pagination/Pagination";

const FacultyTable = () => {
  const [faculties, setFaculties] = useState([]);
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const loadFacultyData = async (page) => {
    const searchQuery = searchTerm ? `&search=${searchTerm}` : "&search=";
    const response = await fetch(
      `http://localhost:3001/searchfaculty?name=search-page&numPage=${page}${searchQuery}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      console.error("Error en la solicitud");
      return;
    }

    const jsonResponse = await response.json();
    setFilteredFaculty(jsonResponse.data.rows || []);
    setTotalItems(jsonResponse.data.totalMatches || 0);
  };

  useEffect(() => {
    loadFacultyData(currentPage);
  }, [currentPage, searchTerm]);

  const handleAddFaculty = () => {
    loadFacultyData(currentPage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <main>
      <h1 className="text-[2vw] mt-[2.5vh] justify-center flex">Facultades</h1>

      <div className="flex flex-col justify-center items-center w-full pl-[15vw] pr-[15vw]">
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
                      onSearch={(value) => handleSearch(value)}
                      className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                    />
                  </div>
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] w-[10vw] text-[1vw] text-UNA-Red">
                  Acciones
                  <div className="w-full flex flex-col ">
                    <SearchInput
                      disabled={true}
                      className="bg-transparent w-full outline-none border-b-[0.2vh] border-solid border-UNA-Red"
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculty.length > 0 ? (
                filteredFaculty.map((faculty) => (
                  <tr key={faculty.ID_FACULTY}>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-[0.9vw] text-center items-center ">
                      {faculty["NOMBRE FACULTAD"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-[0.9vw]">
                      <div className="flex items-center justify-center w-full h-full">
                        <DeleteModal
                          item={faculty}
                          itemName={"NOMBRE FACULTAD"}
                          fields={[
                            {field: "NOMBRE FACULTAD", value: "desc"},
                            {field: "ID_FACULTY", value: "id"},]}
                          items={faculties}
                          setItems={setFaculties}
                          totalItems={totalItems}
                          currentPage={currentPage}
                          loadData={loadFacultyData}
                          destination={"faculty"}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={2}
                    className="text-center items-center justify-center pt-[1vh] text-[0.9vw]"
                  >
                    No se encontraron facultades registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <FacultyModalAdd />
        <Pagination
          totalItems={totalItems}
          itemsPerPage={"8"}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
};

export default FacultyTable;
