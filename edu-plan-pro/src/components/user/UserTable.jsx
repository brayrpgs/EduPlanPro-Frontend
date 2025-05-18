import React, { useState, useEffect, useCallback } from "react";
import DeleteModal from "../componentsgeneric/DeleteModal";
import SearchInput from "../search/SearchInput";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";
import MainSearch from "../search/MainSearch";
import Pagination from "../pagination/Pagination";
import Loading from "../componentsgeneric/Loading";
import { FetchValidate } from "../../utilities/FetchValidate";
import { useNavigate } from "react-router-dom";
import UserAdd from "./UserAdd";
import UserUpdate from "./UserUpdate";
import { useAtom } from "jotai";
import { userAtom } from "../validatelogin/ValidateLogin";

const UsersTable = () => {
  const [Users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    NOMBRE: "",
    APELLIDOS: "",
    IDENTIFICACION: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [mainFilter, setMainFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [lastNameFilter, setLastNameFilter] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const hasPermission = user?.ROLE_NAME?.toLowerCase() === "admin" || user?.ROLE_NAME?.toLowerCase() === "root";

  const loadUsersData = useCallback(async (page) => {
    setCurrentPage(page);
    const searchQuery = `&nameUser=${searchTerms.NOMBRE}&secName=${searchTerms.APELLIDOS}&idCard=${searchTerms.IDENTIFICACION}`;
    const url = `http://localhost:3001/searchuser?name=search-page&numPage=${page}${searchQuery}`;
    const options = {
      method: "GET",
      credentials: "include",
    };

    try {
      setLoading(true);
      const response = await FetchValidate(url, options, navigate);
      if (!response) return;
      setFilteredUsers(response.data.rows || []);
      setTotalItems(response.data.totalMatches || 0);
    } catch (error) {
      console.error("Error loading users data:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerms, navigate]);

  useEffect(() => {
    loadUsersData(currentPage);
  }, [currentPage, loadUsersData]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleSearch = (value, type = "main") => {
    if (type === "main") {
      if (nameFilter.trim() !== "") setNameFilter("");
      setSearchTerms((prev) => ({ ...prev, NOMBRE: value }));
    } else if (type === "NOMBRE") {
      if (mainFilter.trim() !== "") setMainFilter("");
      setSearchTerms((prev) => ({ ...prev, NOMBRE: value }));
    } else if (["APELLIDOS", "IDENTIFICACION", "ROL"].includes(type)) {
      setSearchTerms((prev) => ({ ...prev, [type]: value }));
    }
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerms({ NOMBRE: "", APELLIDOS: "", IDENTIFICACION: "", ROL: "" });
    setMainFilter("");
    setNameFilter("");
    setLastNameFilter("");
    setIdFilter("");
    setRoleFilter("");
    setCurrentPage(1);
  };

  return (
    <main>
      <div className="mt-[3vh] justify-start flex pr-[15vw] pl-[15vw]">
        <div className="bg-UNA-Blue-Dark w-full max-w-screens flex rounded-[0.5vh] items-center">
          <h1 className="ml-[1vw] my-[0.5vh] text-[2vw] text-white">Administrar usuarios</h1>
          {hasPermission && (
            <div className="flex ml-auto justify-end mr-[1vw]">
              <UserAdd
                totalItems={totalItems}
                currentPage={currentPage}
                loadData={loadUsersData}
                textToAdd="Agregar usuario"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full pl-[15vw] pr-[15vw]">
        <div className="flex flex-row w-full items-center justify-end gap-[0.3vw]">
          <MainSearch
            placeholder="Ingrese el nombre de un usuario"
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
                  <SearchInput
                    onSearch={(value) => handleSearch(value, "NOMBRE")}
                    filter={nameFilter}
                    setFilter={setNameFilter}
                    className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                  />
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red">
                  Apellidos
                  <SearchInput
                    onSearch={(value) => handleSearch(value, "APELLIDOS")}
                    filter={lastNameFilter}
                    setFilter={setLastNameFilter}
                    className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                  />
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red">
                  Identificación
                  <SearchInput
                    onSearch={(value) => handleSearch(value, "IDENTIFICACION")}
                    filter={idFilter}
                    setFilter={setIdFilter}
                    className="bg-transparent text-black w-full outline-none border-b-[0.2vh] text-[0.9vw] border-solid border-UNA-Red"
                  />
                </th>
                <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red">
                  Rol
                </th>
                {hasPermission && (
                  <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] w-[10vw] text-[1vw] text-UNA-Red">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.ID_USER}>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center break-words max-w-[15vw]">
                      {user["NOMBRE"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center break-words max-w-[15vw]">
                      {user["APELLIDOS"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center break-words max-w-[15vw]">
                      {user["IDENTIFICACION"]}
                    </td>
                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center break-words max-w-[15vw]">
                      {user["ROL"]}
                    </td>
                    {hasPermission && (
                      <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-[0.9vw]">
                        <div className="flex items-center flex-row justify-center w-full h-full gap-[0.2vw]">
                          <UserUpdate
                            user={user}
                            loadData={loadUsersData}
                            currentPage={currentPage}
                          />
                          <DeleteModal
                            deleteMethod="DELETE"
                            item={user}
                            itemName="NOMBRE"
                            fields={[{ field: "ID_USER", value: "id" }]}
                            items={Users}
                            setItems={setUsers}
                            totalItems={totalItems}
                            currentPage={currentPage}
                            loadData={loadUsersData}
                            destination="user"
                            componentName="usuario"
                            componentPrefix="el"
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={hasPermission ? 5 : 4} className="px-[1vw] py-[1vh] text-[0.9vw] text-center pt-[3.5vh]">
                    No se encontraron usuarios registrados.
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

export default UsersTable;
